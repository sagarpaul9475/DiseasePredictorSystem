import React, { useState, useContext, useEffect, useRef } from "react"
import axios from "axios";
const AppContext = React.createContext();
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
const client = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials:true
});
const AppProvider = ({ children }) => {
const options = [
"Itching",
"Skin rash",
"Shivering",
"Chills",
"Joint pain",
"Stomach pain",
"Acidity",
"Ulcers on tongue",
"Muscle wasting",
"Vomiting",
"Burning micturition",
"Spotting urination",
"Fatigue",
"Weight gain",
"Anxiety",
"Cold hands and feets",
"Mood swings",
"Weight loss",
"Restlessness",
"Lethargy",
"Patches in throat",
"Irregular sugar level",
"Cough",
"High fever",
"Sunken eyes",
"Breathlessness",
"Sweating",
"Dehydration",
"Indigestion",
"Headache",
"Yellowish skin",
"Dark urine",
"Nausea",
"Loss of appetite",
"Pain behind the eyes",
"Back pain",
"Constipation",
"Abdominal pain",
"Diarrhea",
"Mild fever",
"Yellow urine",
"Yellowing of eyes",
"Acute liver failure",
"Fluid overload",
"Swelling of stomach",
"Swelled lymph nodes",
"Malaise",
"Blurred and distorted vision",
"Phlegm",
"Throat irritation",
"Redness of eyes",
"Sinus pressure",
"Runny nose",
"Congestion",
"Chest pain",
"Weakness in limbs",
"Fast heart rate",
"Pain during bowel movements",
"Pain in anal region",
"Bloody stool",
"Irritation in anus",
"Neck pain",
"Dizziness",
"Cramps",
"Bruising",
"Obesity",
"Swollen legs",
"Swollen blood vessels",
"Puffy face and eyes",
"Enlarged thyroid",
"Brittle nails",
"Swollen extremeties",
"Excessive hunger",
"Extra-marital contacts",
"Drying and tingling lips",
"Slurred speech",
"Knee pain",
"Hip joint pain",
"Muscle weakness",
"Stiff neck",
"Swelling joints",
"Movement stiffness",
"Spinning movements",
"Loss of balance",
"Unsteadiness",
"Weakness of one body side",
"Loss of smell",
"Bladder discomfort",
"Foul smell of urine",
"Continuous feel of urine",
"Passage of gases",
"Internal itching",
"Toxic look",
"Depression",
"Irritability",
"Muscle pain",
"Altered sensorium",
"Red spots over body",
"Belly pain",
"Abnormal menstruation",
"Dischromic patches",
"Watering from eyes",
"Increased appetite",
"Polyuria",
"Family history",
"Mucoid sputum",
"Rusty sputum",
"Lack of concentration",
"Visual disturbances",
"Receiving blood transfusion",
"Receiving unsterile injections",
"Coma",
"Stomach bleeding",
"Distention of abdomen",
"History of alcohol consumption",
"Blood in sputum",
"Prominent veins on calf",
"Palpitations",
"Painful walking",
"Pus-filled pimples",
"Blackheads",
"Scarring",
"Skin peeling",
"Silver-like dusting",
"Small dents in nails",
"Inflammatory nails",
"Blister",
"Red sore around nose",
"Yellow crust oozing",
];
const [currentUser, setCurrentUser] = useState();
const [responseCall, setResponseCall] = useState(false);
const [registrationToggle, setRegistrationToggle] = useState(false);
const email = useRef("");
const username = useRef("");
const password = useRef("");
const error = useRef("");
const [age, setAge] = useState("");
const [medicalhistory, setMedicalHistory] = useState([]);
const [sex, setSex] = useState("");
const [loginButtonClicked, setLoginButtonClicked] = useState(false);
const url = "http://localhost:8000/patient";
const [data, setData] = useState({});
const [formData, setFormData] = useState({
bp_log: { date: [], high: [], low: [] },
blood_glucose: { date: [], before: [], after: [] },
});
useEffect(() => {
  const checkUser = async () => {
    try {
      await client.get("/csrf/");
      await client.get("/user", { withCredentials: true });
      setCurrentUser(true);
    } catch {
      setCurrentUser(false);
    }
  };

  checkUser();
}, []);
function update_form_btn() {
if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
setRegistrationToggle(false);
setLoginButtonClicked(true);
} else {
      document.getElementById("form_btn").innerHTML = "Log in";
setRegistrationToggle(true);
setLoginButtonClicked(true);
}
}
function closeModal() {
setLoginButtonClicked(false);
}
async function submitRegistration(e) {
if (e) {
      e.preventDefault();
}
setResponseCall(true);
await client.get("/csrf/");

client.post("/register", {
email: email.current,
username: username.current,
password: password.current,
})
.then(async function () {
await client.get("/csrf/");
        client
.post("/login", {
email: email.current,
password: password.current,
},{withCredentials:true})
.then(function () {
setCurrentUser(true);
setResponseCall(false);
});
});
}
async function submitLogin(e) {
  if (e) e.preventDefault();

  setResponseCall(true);

  try {
    // 🔥 Step 1: get CSRF token
    await client.get("/csrf/");

    // 🔥 Step 2: login
    await client.post("/login", {
      email: email.current,
      password: password.current,
    },{
      withCredentials:true
    });

    setCurrentUser(true);
    error.current = "";
  } catch {
    error.current = "Wrong email or password";
  }

  setResponseCall(false);
}
function submitLogout() {
    client.post("/logout", { withCredentials: true }).then(function(){
        setCurrentUser(false);
    });
// document.getElementById("signIndiv").hidden = false;
}
const handleInputChange = (event) => {
const { name, value } = event.target;
if (name === "medical_history" || name === "current_med") {
const arrValue = value.split(","); // Split the string value
setFormData((prevData) => ({
...prevData,
[name]: arrValue,
}));
} else {
setFormData((prevData) => ({
...prevData,
[name]: value,
}));
}
};
const handleDashboardChange = (event) => {
const { name, value } = event.target;
if (name === "medical_history" || name === "current_med") {
const arrValue = value.split(","); // Split the string value
setData((prevData) => ({
...prevData,
[name]: arrValue,
}));
} else {
setData((prevData) => ({
...prevData,
[name]: value,
}));
}
};
const handleFormSubmit = async (event) => {
    event.preventDefault();
try {
setFormData((prevData) => ({
...prevData,
new_patient: false,
}));
await client.put("/patient", formData, {
withCredentials: true,
});
await fetchData();
} catch (error) {
      console.log(error);
}
};
const handleDashboardSubmit = async (event) => {
    event.preventDefault();
    try {
await client.put("/patient", data, {
withCredentials: true,
});
await fetchData();
} catch (error) {
      console.log(error);
}
};
const fetchData = async () => {
try {
await client.get("/csrf/");
const response = await client.get("/patient");
setData(response.data);
      console.log(response.data);
} catch (error) {
      console.log(error);
}
};
return (
<AppContext.Provider
      value={{
        update_form_btn,
        submitRegistration,
        submitLogin,
        submitLogout,
        currentUser,
        setCurrentUser,
        registrationToggle,
        setRegistrationToggle,
        email,
        username,
        password,
        age,
                setAge,
        medicalhistory,
        setMedicalHistory,
        sex,
        setSex,
        loginButtonClicked,
        setLoginButtonClicked,
        closeModal,
        options,
        handleInputChange,
        formData,
        setFormData,
        handleFormSubmit,
        url,
        data,
        setData,
        fetchData,
        handleDashboardSubmit,
        handleDashboardChange,
        error,
        responseCall,
        setResponseCall,
}}
>
{children}
</AppContext.Provider>
);
};
export const useGlobalContext = () => {
// console.log(useContext(AppContext));
return useContext(AppContext);
};
export { AppContext, AppProvider };