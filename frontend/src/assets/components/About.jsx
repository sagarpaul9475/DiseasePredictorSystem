import patternImg from "../img/pattern.svg";
const About = () => {
return (
<div
      id="about"
      className="w-full flex justify-center mt-10
    "
>
<div className="about-container flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20">
<div className="hero flex flex-col justify-center  md:items-start gap-5">
<div className="hero-text text-3xl text-center md:text-left">
            About Medware
</div>
<div className="hero-stanza  lg:text-lg flex items-center text-center md:text-left">
            Your one-stop healthcare provider. Our innovative mobile app and website connect you with top doctors, offer personalized health insights, and provide convenient healthcare services. With Medware, you can easily book appointments, access your medical records, and receive timely health updates. Our AI-powered symptom checker
            and disease predictor offer personalized insights into your health.
            Convenient doctor consultations and a range of healthcare services
            are just a click away. Experience the difference in healthcare
            and advanced technologies with Medware.
</div>
</div>
<div className="img-wrapper w-80 mb-5 md:w-1/3 ">
<img src={patternImg} alt="hero-image" className="block" />
</div>
</div>
</div>
);
};
export default About;