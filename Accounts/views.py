# Create your views here.
from django.db import connection
from django.shortcuts import render
# Create your views here.
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import DoctorProfileSerializer, PatientSerializer, UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status, generics
from .validations import custom_validation, validate_email, validate_password, validate_username
from .models import DoctorProfile, AppUser
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
    ##
    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)
class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    ##
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
def check_email(request):
    email = request.GET.get('email')
    if email:
        email_exists = AppUser.objects.filter(email=email).exists()
        response_data = {'email_exists': email_exists}
        return JsonResponse(response_data)
    else:
        response_data = {'error': 'Email parameter is missing'}
        return JsonResponse(response_data, status=400)
class PatientProfile(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    def get(self, request):
        profile = request.user.profile
        if not profile:
            return Response({'error': 'User does not have a profile'}, status=status.HTTP_404_NOT_FOUND)
        serializer = PatientSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def put(self, request):
        serializer = PatientSerializer(
            request.user.profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DoctorProfileListAPIView(generics.ListAPIView):
    serializer_class = DoctorProfileSerializer
    def get_queryset(self):
        speciality = self.kwargs.get('sp', '')
        if speciality == 'All':
            queryset = DoctorProfile.objects.all()
        else:
            queryset = DoctorProfile.objects.filter(speciality_iexact=speciality)
        queryset = queryset.order_by('?')[:12]
        return queryset
def insert_data(request):
    query = """
        INSERT INTO "Accounts_doctorprofile" (name, speciality, gender, experience, contact)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
    """
    values = [
    # Family Medicine
    ('Dr. John Smith', 'Family Medicine', 'male', 15, '123 Main St, Cityville', '555-1234'),
    ('Dr. Emma Thompson', 'Family Medicine', 'female', 12, '456 Elm St, Townsville', '555-5678'),
    ('Dr. David Wilson', 'Family Medicine', 'male', 10, '789 Oak St, Villagetown', '555-9012'),
    ('Dr. Lily Rodriguez', 'Family Medicine', 'female', 8, '321 Pine St, Hamletville', '555-3456'),
        # Internal Medicine
    ('Dr. Emily Johnson', 'Internal Medicine', 'female', 20, '123 Main St, Cityville', '555-1234'),
    ('Dr. Benjamin Davis', 'Internal Medicine', 'male', 18, '456 Elm St, Townsville', '555-5678'),
    ('Dr. Sophia Thompson', 'Internal Medicine', 'female', 22, '789 Oak St, Villagetown', '555-9012'),
    ('Dr. Daniel Wilson', 'Internal Medicine', 'male', 16, '321 Pine St, Hamletville', '555-3456'),
    # Pediatrician
    ('Dr. Michael Johnson', 'Pediatrician', 'male', 18, '123 Main St, Cityville', '555-1234'),
    ('Dr. Abigail Smith', 'Pediatrician', 'female', 15, '456 Elm St, Townsville', '555-5678'),
    ('Dr. Ethan Davis', 'Pediatrician', 'male', 10, '789 Oak St, Villagetown', '555-9012'),
    ('Dr. Isabella Wilson', 'Pediatrician', 'female', 12, '321 Pine St, Hamletville', '555-3456'),
    # Obstetricians/gynecologist (OBGYNs)
    ('Dr. Olivia Davis', 'Gynecologist', 'female', 25, '123 Main St, Cityville', '555-1234'),
    ('Dr. Liam Johnson', 'Gynecologist', 'male', 22, '456 Elm St, Townsville', '555-5678'),
    ('Dr. Ava Brown', 'Gynecologist', 'female', 20, '789 Oak St, Villagetown', '555-9012'),
    ('Dr. Noah Thompson', 'Gynecologist', 'male', 18, '321 Maple St, Hamletville', '555-3456'),
    # Cardiologist
    ('Dr. Benjamin Smith', 'Cardiologist', 'male', 22, '123 Main St, Cityville', '555-1234'),
    ('Dr. Charlotte Johnson', 'Cardiologist', 'female', 20, '456 Elm St, Townsville', '555-5678'),
    ('Dr. Samuel Brown', 'Cardiologist', 'male', 18, '789 Oak St, Villagetown', '555-9012'),
    ('Dr. Grace Thompson', 'Cardiologist', 'female', 16, '321 Maple St, Hamletville', '555-3456'),
    # Oncologist
    ('Dr. William Wilson', 'Oncologist', 'male', 30, '123 Main St, Cityville', '555-1234'),
    ('Dr. Sophia Johnson', 'Oncologist', 'female', 28, '456 Elm St, Townsville', '555-5678'),
    ('Dr. Alexander Brown', 'Oncologist', 'male', 25, '789 Oak St, Villagetown', '555-9012'),
    ('Dr. Mia Thompson', 'Oncologist', 'female', 22, '321 Maple St, Hamletville', '555-3456'),
    # Gastroenterologist
    ('Dr. Olivia Smith', 'Gastroenterologist', 'female', 25, '123 Main St, Cityville', '555-1234'),
        ('Dr. Liam Johnson', 'Gastroenterologist', 'male', 22, '456 Elm St, Townsville', '555-5678'),
    ('Dr. Ava Brown', 'Gastroenterologist', 'female', 20, '789 Oak St, Villagetown', '555-9012'),
    ('Dr. Noah Thompson', 'Gastroenterologist', 'male', 18, '321 Maple St, Hamletville', '555-3456'),
    # Pulmonologist
    ('Dr. Benjamin Wilson', 'Pulmonologist', 'male', 20, '123 Main St, Cityville', '555-1234'),
    ('Dr. Charlotte Johnson', 'Pulmonologist', 'female', 18, '456 Elm St, Townsville', '555-5678'),
    ('Dr. Samuel Brown', 'Pulmonologist', 'male', 16, '789 Oak St, Villagetown', '555-9012'),
    ('Dr. Grace Thompson', 'Pulmonologist', 'female', 14, '321 Maple St, Hamletville', '555-3456'),
    # Infectious Disease
    ('Dr. William Smith', 'Infectious Disease', 'male', 18, '123 Main St, Cityville', '555-1234'),
    ('Dr. Sophia Johnson', 'Infectious Disease', 'female', 16, '456 Elm St, Townsville', '555-5678'),
    ('Dr. Alexander Brown', 'Infectious Disease', 'male', 14, '789 Oak St, Villagetown', '555-9012'),
    ('Dr. Mia Thompson', 'Infectious Disease', 'female', 12, '321 Maple St, Hamletville', '555-3456'),
    # Nephrologist
    ('Dr. Olivia Smith', 'Nephrologist', 'female', 25, '123 Main St, Cityville', '555-1234'),
    ('Dr. Liam Johnson', 'Nephrologist', 'male', 22, '456 Elm St, Townsville', '555-5678'),
    ('Dr. Ava Brown', 'Nephrologist', 'female', 20, '789 Oak St, Villagetown', '555-9012'),
    ('Dr. Noah Thompson', 'Nephrologist', 'male', 18, '321 Maple St, Hamletville', '555-3456'),
    # Endocrinologist
    ('Dr. Benjamin Wilson', 'Endocrinologist', 'male', 20, '123 Main St, Cityville', '555-1234'),
    ('Dr. Charlotte Johnson', 'Endocrinologist', 'female', 18, '456 Elm St, Townsville', '555-5678'),
    ('Dr. Samuel Brown', 'Endocrinologist', 'male', 16, '789 Oak St, Villagetown', '555-9012'),
    ('Dr. Grace Thompson', 'Endocrinologist', 'female', 14, '321 Maple St, Hamletville', '555-3456'),
    # Ophthalmologist
    ('Dr. William Smith', 'Ophthalmologist', 'male', 18, '123 Main St, Cityville', '555-1234'),
    ('Dr. Sophia Johnson', 'Ophthalmologist', 'female', 16, '456 Elm St, Townsville', '555-5678'),
    ('Dr. Alexander Brown', 'Ophthalmologist', 'male', 14, '789 Oak St, Villagetown', '555-9012'),
    ('Dr. Mia Thompson', 'Ophthalmologist', 'female', 12, '321 Maple St, Hamletville', '555-3456'),
    # Otolaryngologist
    ('Dr. Olivia Smith', 'Otolaryngologist', 'female', 25, '123 Main St, Cityville', '555-1234'),
    ('Dr. Liam Johnson', 'Otolaryngologist', 'male', 22, '456 Elm St, Townsville', '555-5678'),
    ('Dr. Ava Brown', 'Otolaryngologist', 'female', 20, '789 Oak St, Villagetown', '555-9012'),
    ('Dr. Noah Thompson', 'Otolaryngologist', 'male', 18, '321 Maple St, Hamletville', '555-3456'),
    # Dermatologist
    ('Dr. Benjamin Wilson', 'Dermatologist', 'male', 20, '123 Main St, Cityville', '555-1234'),
    ('Dr. Charlotte Johnson', 'Dermatologist', 'female', 18, '456 Elm St, Townsville', '555-5678'),
    ('Dr. Samuel Brown', 'Dermatologist', 'male', 16, '789 Oak St, Villagetown', '555-9012'),
    ('Dr. Grace Thompson', 'Dermatologist', 'female', 14, '321 Maple St, Hamletville', '555-3456'),
    # Psychiatrist
    ('Dr. William Smith', 'Psychiatrist', 'male', 18, '123 Main St, Cityville', '555-1234'),
    ('Dr. Sophia Johnson', 'Psychiatrist', 'female', 16, '456 Elm St, Townsville', '555-5678'),
    ('Dr. Alexander Brown', 'Psychiatrist', 'male', 14, '789 Oak St, Villagetown', '555-9012'),
    ('Dr. Mia Thompson', 'Psychiatrist', 'female', 12, '321 Maple St, Hamletville', '555-3456'),
    # Neurologist
    ('Dr. Olivia Smith', 'Neurologist', 'female', 25, '123 Main St, Cityville', '555-1234'),
    ('Dr. Liam Johnson', 'Neurologist', 'male', 22, '456 Elm St, Townsville', '555-5678'),
    ('Dr. Ava Brown', 'Neurologist', 'female', 20, '789 Oak St, Villagetown', '555-9012'),
    ('Dr. Noah Thompson', 'Neurologist', 'male', 18, '321 Maple St, Hamletville', '555-3456'),
    # Radiologist
    ('Dr. Benjamin Wilson', 'Radiologist', 'male', 20, '123 Main St, Cityville', '555-1234'),
    ('Dr. Charlotte Johnson', 'Radiologist', 'female', 18, '456 Elm St, Townsville', '555-5678'),
    ('Dr. Samuel Brown', 'Radiologist', 'male', 16, '789 Oak St, Villagetown', '555-9012'),
    ('Dr. Grace Thompson', 'Radiologist', 'female', 14, '321 Maple St, Hamletville', '555-3456'),
    # Anesthesiologist
    ('Dr. William Smith', 'Anesthesiologist', 'male', 18, '123 Main St, Cityville', '555-1234'),
    ('Dr. Sophia Johnson', 'Anesthesiologist', 'female', 16, '456 Elm St, Townsville', '555-5678'),
    ('Dr. Alexander Brown', 'Anesthesiologist', 'male', 14, '789 Oak St, Villagetown', '555-9012'),
    ('Dr. Mia Thompson', 'Anesthesiologist', 'female', 12, '321 Maple St, Hamletville', '555-3456'),
    # Surgeon
    ('Dr. Olivia Smith', 'Surgeon', 'female', 25, '123 Main Street, Cityville', '555-1234'),
    ('Dr. Liam Johnson', 'Surgeon', 'male', 22, '456 Elm Street, Townsville', '555-5678'),
    ('Dr. Ava Brown', 'Surgeon', 'female', 20, '789 Oak Street, Villagetown', '555-9012'),
    ('Dr. Noah Thompson', 'Surgeon', 'male', 18, '321 Maple Street, Hamletville', '555-3456'),
    # Physician Executive
    ('Dr. Benjamin Wilson', 'Physician Executive', 'male', 20, '123 Main Street, Cityville', '555-1234'),
    ('Dr. Charlotte Johnson', 'Physician Executive', 'female', 18, '456 Elm Street, Townsville', '555-5678'),
    ('Dr. Samuel Brown', 'Physician Executive', 'male', 16, '789 Oak Street, Villagetown', '555-9012'),
    ('Dr. Grace Thompson', 'Physician Executive', 'female', 14, '321 Maple Street, Hamletville', '555-3456')
]
    with connection.cursor() as cursor:
        cursor.executemany(query, values)
        return render(request, 'index.html')
def check_admin(request):
    email = request.GET.get('email')
    if email:
        try:
            user = AppUser.objects.get(email=email)  # Retrieve the user based on the email
            is_superuser = user.is_superuser  # Access the is_superuser attribute
            response_data = {'email_exists': True, 'is_superuser': is_superuser}
            return JsonResponse(response_data)
        except AppUser.DoesNotExist:
            response_data = {'email_exists': False, 'is_superuser': False}
            return JsonResponse(response_data)
    else:
        response_data = {'error': 'Email parameter is missing'}
        return JsonResponse(response_data, status=400)

@ensure_csrf_cookie
def csrf(request):
    return JsonResponse({"message": "CSRF cookie set"})