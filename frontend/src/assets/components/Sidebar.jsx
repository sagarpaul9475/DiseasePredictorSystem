import React from "react";
import record from "../img/record.svg";
import profile from "../img/profile.svg";
import settings from "../img/settings.svg";
import consumption from "../img/cons.svg";

const Sidebar = ({
  setRecord,
  setLogModal,
  setProfileModal,
  setConsumptionModal,
}) => {

  const handleRecord = () => {
    setRecord(true);
  };

  const handleLogModal = () => {
    setLogModal(true);
  };

  const handleProfileModal = () => {
    setProfileModal(true);
  };

  const handleConsumptionModal = () => {
    setConsumptionModal(true);
  };

  return (
    <div className="flex sm:flex-col justify-center items-center gap-4 p-2 bg-white shadow-md rounded-lg">

      {/* Profile */}
      <button
        onClick={handleProfileModal}
        className="w-10 h-10 p-1 hover:scale-90 hover:cursor-pointer transition"
      >
        <img src={profile} alt="profile" className="w-full" />
      </button>

      {/* Record */}
      <button
        onClick={handleRecord}
        className="w-10 h-10 p-1 hover:scale-90 hover:cursor-pointer transition"
      >
        <img src={record} alt="record" className="w-full" />
      </button>

      {/* Settings / Log */}
      <button
        onClick={handleLogModal}
        className="w-10 h-10 p-1.5 hover:scale-90 hover:cursor-pointer transition"
      >
        <img src={settings} alt="settings" className="w-full" />
      </button>

      {/* Consumption */}
      <button
        onClick={handleConsumptionModal}
        className="w-9 h-9 p-1 hover:scale-90 hover:cursor-pointer transition"
      >
        <img src={consumption} alt="consumption" className="w-full" />
      </button>

    </div>
  );
};

export default Sidebar;