import React, { useEffect, useState } from "react";
import PatientForm from "./PatientForm";
import PatientProfile from "./PatientProfile";
import { useGlobalContext } from "./context";

const Dashboard = () => {
  const { handleInputChange, formData, handleFormSubmit, data, fetchData } =
    useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        await fetchData();
      } catch (error) {
        console.error(error);
        setErrorMessage(
          "We could not load your dashboard. Please sign in again or retry in a moment."
        );
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [fetchData]);

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-12">
      <section className="mx-auto w-11/12 max-w-7xl">
        <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-8 text-white shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-100">
            Personal health dashboard
          </p>
          <h1 className="mt-3 text-3xl font-bold md:text-5xl">
            Track your profile, vitals, and care plan in one place.
          </h1>
          <p className="mt-4 max-w-3xl text-base text-emerald-50 md:text-lg">
            Keep your medical profile updated to make predictions and doctor
            recommendations more useful. This tool supports awareness and is not
            a replacement for professional diagnosis.
          </p>
        </div>

        {isLoading ? (
          <div className="rounded-2xl bg-white p-8 text-center text-slate-600 shadow">
            Loading your dashboard...
          </div>
        ) : errorMessage ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
            {errorMessage}
          </div>
        ) : (
          <>
            <PatientForm
              profileData={formData}
              handleInputChange={handleInputChange}
              handleFormSubmit={handleFormSubmit}
              patientData={data}
            />
            <PatientProfile responseData={data} />
          </>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
