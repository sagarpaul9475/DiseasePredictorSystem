import { useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import SymptomSearch from "./searchSymptoms";
import { useGlobalContext } from "./context";
import cancelIcon from "../img/cross icon.svg";
import axios from "axios";
import Prediction from "../components/Prediction";
import dpImg from "../img/dp-image.svg";

const DpWindow = () => {
  const { options } = useGlobalContext();

  const index = useRef(null);
  const allSymptomsString = useRef("");

  const [symptoms, setSymptoms] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [copySymptoms, setCopySymptoms] = useState([]);
  const [allSymptoms, setAllSymptoms] = useState(
    Array(options.length).fill("0")
  );
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  const isDuplicate = (symptom) => symptoms.includes(symptom);

  const addSymptom = (symptom) => {
    if (!symptom) return;
    if (!isDuplicate(symptom)) {
      setSymptoms((prev) => [...prev, symptom]);
    }
  };

  const handleAddSymptom = () => {
    if (selectedSymptom && !isDuplicate(selectedSymptom)) {
      index.current = options.indexOf(selectedSymptom);
      addSymptom(selectedSymptom);
      setSelectedSymptom(null);
    } else if (isDuplicate(selectedSymptom)) {
      alert("This symptom has already been added!");
    } else {
      alert("Choose a valid symptom");
    }
  };

  const removeSymptom = (symptom) => {
    setSymptoms((prev) => prev.filter((s) => s !== symptom));

    const symptomIndex = options.indexOf(symptom);

    setAllSymptoms((prev) => {
      const updated = [...prev];
      updated[symptomIndex] = "0";
      return updated;
    });

    if (symptoms.length === 1) {
      setPrediction(null);
    }
  };

  const clearSymptoms = () => {
    setSymptoms([]);
    setAllSymptoms(Array(options.length).fill("0"));
    setPrediction(null);
  };

  const handleClick = () => {
    if (symptoms.length !== 0) {
      setCopySymptoms(allSymptoms);
    }
  };

  // Update binary symptom array
  useEffect(() => {
    if (index.current !== null) {
      setAllSymptoms((prev) => {
        const updated = [...prev];
        updated[index.current] = "1";
        return updated;
      });
    }
  }, [symptoms]);

  // API call
  useEffect(() => {
    if (copySymptoms.length === 0) return;

    allSymptomsString.current = allSymptoms.join("");

    axios
      .get(`http://127.0.0.1:8000/prediction/${allSymptomsString.current}`)
      .then((response) => {
        if (symptoms.length !== 0) {
          setPrediction(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [copySymptoms]);

  return (
    <div className="dpWindow w-full flex items-center flex-col justify-center gap-6">

      {/* Search */}
      <div className="bttns-container flex w-2/3 xl:w-1/2 justify-center">
        <SymptomSearch
          handleAddSymptom={handleAddSymptom}
          selectedSymptom={selectedSymptom}
          setSelectedSymptom={setSelectedSymptom}
        />
      </div>

      {/* Main Section */}
      <div className="symptoms w-5/6 flex flex-col md:flex-row justify-center gap-10">

        {/* Symptoms */}
        <div className="w-full md:w-4/5 lg:w-1/2 overflow-y-auto">
          <div className="w-full flex flex-col gap-4">
            <h2 className="text-xl lg:text-2xl xl:text-3xl">
              Your Symptoms
            </h2>

            <div className="flex flex-wrap bg-green-50 p-2 rounded">
              {symptoms.length === 0 ? (
                <div className="text-gray-500 italic">
                  Add your first symptom
                </div>
              ) : (
                symptoms.map((symptom) => (
                  <div
                    key={symptom}
                    className="p-2 m-1.5 flex items-center gap-2 bg-white rounded shadow"
                  >
                    <div>{symptom}</div>
                    <button onClick={() => removeSymptom(symptom)}>
                      <img src={cancelIcon} alt="remove" className="h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClick}
              >
                Predict
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={clearSymptoms}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>

        {/* Prediction */}
        <div className="w-full md:w-4/5 lg:w-1/3 p-2">
          <h2 className="text-xl lg:text-2xl xl:text-3xl">
            Prediction
          </h2>

          {prediction ? (
            <Prediction prediction={prediction} />
          ) : (
            <div className="w-full h-40 bg-sky-50 mt-2 rounded flex items-center justify-center text-gray-500">
              No prediction
            </div>
          )}
        </div>
      </div>

      {/* About Section */}
      <section className="w-full flex flex-col md:flex-row items-center justify-center px-6 gap-6">
        <div className="flex flex-col md:w-1/2 gap-4">
          <div className="text-3xl lg:text-4xl font-semibold">
            About our Disease Predictor
          </div>

          <div className="text-base lg:text-lg text-gray-600">
            Introducing our advanced disease predictor, built using
            machine learning and trained on extensive medical data.
            It provides accurate predictions and helps you take
            proactive healthcare decisions.
          </div>
        </div>

        <div className="w-1/2 flex justify-center">
          <img src={dpImg} alt="predictor" className="w-4/5" />
        </div>
      </section>
    </div>
  );
};

export default DpWindow;