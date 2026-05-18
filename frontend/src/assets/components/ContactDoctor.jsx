import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import DoctorProfile from "./DoctorProfile";
import SkeletonLoader from "./SkeletonLoader";
import { Autocomplete, TextField } from "@mui/material";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const docOptions = [
  "All",
  "Family Medicine",
  "Internal Medicine",
  "Pediatrician",
  "Gynecologist",
  "Cardiologist",
  "Oncologist",
  "Gastroenterologist",
  "Pulmonologist",
  "Infectious Disease",
  "Nephrologist",
  "Endocrinologist",
  "Ophthalmologist",
  "Otolaryngologist",
  "Dermatologist",
  "Psychiatrist",
  "Neurologist",
  "Radiologist",
  "Anesthesiologist",
  "Surgeon",
  "Physician Executive",
];

const ContactDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [speciality, setSpeciality] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const doctorType = useRef("All");

  const fetchDoctors = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.get(
        `${API_BASE_URL}/doctor/${encodeURIComponent(doctorType.current)}/`,
        { withCredentials: true }
      );
      setDoctors(response.data);
    } catch (error) {
      console.error(error);
      setDoctors([]);
      setErrorMessage(
        "We could not load the doctor directory right now. Please retry after checking that the backend is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDocChange = () => {
    if (!speciality || !docOptions.includes(speciality)) {
      setErrorMessage("Please select a valid speciality from the list.");
      return;
    }

    doctorType.current = speciality;
    fetchDoctors();
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-12">
      <section className="mx-auto flex w-11/12 max-w-7xl flex-col items-center gap-8">
        <div className="w-full overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-cyan-700 to-emerald-600 p-8 text-white shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100">
            Doctor directory
          </p>
          <h1 className="mt-3 text-3xl font-bold md:text-5xl">
            Find the right specialist for your symptoms.
          </h1>
          <p className="mt-4 max-w-3xl text-base text-cyan-50 md:text-lg">
            Browse trusted specialist categories, compare experience, and call a
            doctor directly from the card.
          </p>
        </div>

        <div className="w-full rounded-2xl bg-white p-4 shadow-lg md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-center">
            <Autocomplete
              options={docOptions}
              value={speciality}
              onChange={(e, newValue) => {
                setSpeciality(newValue || "All");
              }}
              className="searchbox w-full bg-white md:w-3/5"
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  color="primary"
                  label="Select a speciality"
                />
              )}
            />
            <button
              onClick={handleDocChange}
              className="h-12 rounded-xl bg-blue-600 px-8 text-base font-semibold text-white transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              Search
            </button>
          </div>

          {errorMessage ? (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              {errorMessage}
            </div>
          ) : null}
        </div>

        <div className="w-full">
          {isLoading ? (
            <SkeletonLoader />
          ) : doctors.length ? (
            <DoctorProfile doctors={doctors} />
          ) : (
            <div className="rounded-2xl bg-white p-8 text-center text-slate-600 shadow">
              No doctors found for this speciality yet. Try another category.
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ContactDoctor;
