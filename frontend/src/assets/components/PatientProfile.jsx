import Calendar from "./Calendar";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import Record from "./Record";
import BP_chart from "./BP_chart";
import LogModal from "./LogModal";
import BP_Log from "./BP_Log";
import ProfileModal from "./ProfileModal";
import GlucoseLevel from "./GlucoseLevel";
import Sugar_chart from "./SugarChart";
import Personal from "./Personal";
import MedicalHistory from "./MedicalHistory";
import ConsumptionModal from "./ConsumptionModal";
const PatientProfile = ({ responseData }) => {
const [record, setRecord] = useState(false);
const [logModal, setLogModal] = useState(false);
const [profileModal, setProfileModal] = useState(false);
const [consumptionModal, setConsumptionModal] = useState(false);
const { first_name, height, weight, last_name } = responseData;
const bloodGlucoseData = responseData.blood_glucose || { date: [], before: [], after: [] };
const bpLogData = responseData.bp_log || { date: [], high: [], low: [] };
const [bmi, setBmi] = useState(0);
const [bmiColor, setBmiColor] = useState("");
useEffect(() => {
// Calculate BMI
const calculateBMI = () => {
const heightInMeters = Number(height) / 100; // Convert height to meters
const weightInKg = Number(weight);
if (!heightInMeters || !weightInKg) {
setBmi(0);
setBmiColor("bg-gray-400");
return;
}
const bmiValue = weightInKg / (heightInMeters * heightInMeters); // BMI formula
setBmi(bmiValue);
// Set BMI color
if (bmiValue < 18.5) {
setBmiColor("bg-purple-400");
} else if (bmiValue >= 18.5 && bmiValue < 24.9) {
setBmiColor("bg-blue-400");
} else if (bmiValue >= 24.9 && bmiValue < 29.9) {
setBmiColor("bg-orange-400");
} else {
setBmiColor("bg-red-500");
}
};
calculateBMI();
}, [height, weight]);
if (responseData.new_patient) {
return null;
}
return (
<div className="profile flex justify-center flex-col items-center">
{Object.keys(responseData).length > 0 ? (
<>
<div className="w-full flex flex-wrap justify-center items-center">
<div className="w-5/6 rounded-2xl bg-white p-3 shadow-lg sm:w-auto">
<Sidebar
                setRecord={setRecord}
                setLogModal={setLogModal}
                setProfileModal={setProfileModal}
                setConsumptionModal={setConsumptionModal}
/>
</div>
<div className="sm:h-screen md:fit-content w-5/6 sm:w-4/5 md:w-3/5 lg:w-2/5 p-4">
<div className="md:pt-6 h-40 w-full p-1 justify-between flex items-center rounded-md bg-gray-100">
<div className="w-full md:w-1/2  md:block text-center">
<p>Hi, {first_name + " " + last_name}</p>
<p>Check your</p>
<p>Health!</p>
</div>
<div className="flex items-center justify-between w-full md:w-1/2">
<p className="text-lg md:text-xl font-semibold">
BMI
</p>
<div
                    className={`bmi w-12 h-10 md:w-16 md:h-12 rounded-md flex items-center justify-center text-white font-bold ${bmiColor}`}
>
{bmi.toFixed(1)}
</div>
</div>
</div>
<div className="charts-container w-full rounded-md flex flex-wrap justify-center items-center mt-4 gap-4">
<div className="w-full sm:w-47 rounded-md ">
<BP_chart chartData={bpLogData} />
</div>
<div className="w-full  sm:w-47 rounded-md">
<Sugar_chart chartData={bloodGlucoseData} />
</div>
</div>
<div className=" my-2 w-full sm:h-96 md:h-1/2 rounded-md flex flex-wrap justify-center items-center gap-4">
<Personal responseData={responseData} />
</div>
</div>
<div className="sm:w-full lg:px-0 lg:w-1/2 gap-2 p-4 flex flex-col justify-center items-center">
<div className="w-full flex flex-wrap lg:flex-nowrap justify-center items-center gap-4">
<div className="flex w-5/6 sm:w-3/5 md:w-1/2 border-2 border-gray-300 rounded-md p-4">
<Calendar />
</div>
<div className="w-5/6 bg-gray-50 mt-2 sm:mt-0 sm:w-1/2 md:w-1/3 lg:w-1/2 h-96 rounded-md p-4">
<MedicalHistory data={responseData.medical_history} />
</div>
</div>
<div className="lg:h-full justify-center w-full flex flex-wrap lg:flex-nowrap items-center gap-4 mt-4">
<div className="w-5/6 h-96 md:w-1/2 lg:h-full rounded-md p-4 bg-gray-50">
<h2 className="font-semibold text-lg md:text-2xl mb-2">
                    Glucose
</h2>
<div className="grow bg-gray-50 ">
<GlucoseLevel responseData={responseData} />
</div>
</div>
<div className="w-5/6  h-96 md:w-1/2 lg:h-full rounded-md p-4 bg-gray-50">
<h2 className="font-semibold text-lg md:text-2xl mb-2">
                    Blood Pressure
</h2>
<div className="grow bg-gray-50">
<BP_Log responseData={responseData} />
</div>
</div>
</div>
</div>
</div>
<Record setRecord={setRecord} record={record} />
<LogModal setLogModal={setLogModal} logModal={logModal} />
<ProfileModal
            setProfileModal={setProfileModal}
            profileModal={profileModal}
/>
<ConsumptionModal
            consumptionModal={consumptionModal}
            setConsumptionModal={setConsumptionModal}
/>
</>
) : (
<p>Loading...</p>
)}
</div>
);
};
export default PatientProfile;