from Accounts.models import Predicted_Diseases, symptoms_diseases
from Accounts.serializers import PredictionSerializer
from django.shortcuts import render
import pandas as pd
import numpy as np
from django_pandas.io import read_frame
from imblearn.over_sampling import RandomOverSampler
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from rest_framework.decorators import api_view
from rest_framework.response import Response
import csv
from django.db import transaction
import os
import pickle
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes

# Create your views here.
def insert_patient_data(request):
    data = os.path.join(os.path.dirname(
        os.path.realpath(__file__)), 'Training.csv')
    with open(data, 'r') as file:
        reader = csv.reader(file)
        next(reader)  # Skip the header row
        with transaction.atomic():
            for row in reader:
                # Map the values from the CSV row to the model fields
                # Exclude the last column
                symptom_values = [int(value) for value in row[:-1]]
                prognosis = row[-1]
                # Create a new instance of the model
                field_names = [field.name for field in symptoms_diseases._meta.fields]
                field_names = [name for name in field_names if name != 'id' and name != 'prognosis']
                field_values = dict(zip(field_names, symptom_values))
                instance = symptoms_diseases.objects.create(
                    prognosis=prognosis, **field_values)
                # Save the instance to the database
                instance.save()
            return render(request, 'index.html')

def scale_dataset(dataframe, oversample=False):
    X = dataframe[dataframe.columns[:-1]].values
    y = dataframe[dataframe.columns[-1]].values
    scaler = StandardScaler()
    X = scaler.fit_transform(X)
    if oversample:
        ros = RandomOverSampler()
        X, y = ros.fit_resample(X, y)
    data = np.hstack((X, np.reshape(y, (-1, 1))))
    return data, X, y
svm_model = None
def train(request):
    global svm_model
    data = pd.DataFrame.from_records(
        symptoms_diseases.objects.all().values()).drop('id', axis=1)
    train, X, Y = scale_dataset(data, oversample=True)
    svm_model = SVC(probability=True)
    svm_model = svm_model.fit(X, Y)
    with open('model.pkl', 'wb') as f:
        pickle.dump(svm_model, f)
    return render(request, 'index.html')
@api_view(['GET'])
@permission_classes([AllowAny])
def predict(request, symptoms=''):
    try:
        with open('model.pkl', 'rb') as f:
            svm_model = pickle.load(f)

        # Convert string → array
        x = np.asarray(list(symptoms), dtype=np.int_)

        # DEBUG (important)
        print("Input length:", len(x))
        print("Model expects:", svm_model.n_features_in_)

        # Reshape properly
        x_ = x.reshape(1, -1)

        # Prediction
        Y_ = svm_model.predict(x_)
        probas = svm_model.predict_proba(x_)

        top5_indices = np.argsort(probas, axis=1)[:, -5:]
        top5_values = np.take_along_axis(probas, top5_indices, axis=1)
        top5_labels = svm_model.classes_[top5_indices]

        pd_list = top5_labels[0][::-1].tolist()
        predicted_disease = pd_list[0]

        consultdoctor = "other"  # default

        pd_prob = top5_values[0][::-1].astype(float).tolist()

        Predicted_Diseases.objects.all().delete()
        Predicted_Diseases(
            diseases=pd_list,
            diseases_prob=pd_prob,
            consult_doctor=consultdoctor
        ).save()

        data = Predicted_Diseases.objects.all()
        serializer = PredictionSerializer(data, many=True)

        return Response(serializer.data)

    except Exception as e:
        print("ERROR:", str(e))
        return Response({"error": str(e)}, status=500)