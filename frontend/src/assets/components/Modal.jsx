import { useGlobalContext } from "./context";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import ModalImg from "../img/modal.svg";
const Modal = () => {
    const { registrationToggle, loginButtonClicked, responseCall } = useGlobalContext();
if (loginButtonClicked) {
return (
<>
{responseCall && (
<div className="fixed responseCall top-0 flex flex-col items-center justify-center w-screen h-screen bg-gray-900/50 z-30">
<div>
<div className="rounded-full h-20 w-24 animate-bounce bg-teal-700 mb-5"></div>
</div>
<div className="w-28 h-2 bg-teal-700 rounded-lg"></div>
</div>
)}
<div className=" fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900/50 z-30">
<div className="flex justify-center items-center w-80 h-fit bg-white rounded-lg p-5 gap-5">
<figure className="hidden xl:block w-80 z-20">
<img src={ModalImg} alt="Modal" className="w-full" />
</figure>
{registrationToggle ? <RegisterForm /> : <LoginForm />}
</div>
</div>
</>
);
}
return null;
};
export default Modal;