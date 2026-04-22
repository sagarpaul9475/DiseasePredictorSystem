import { Button } from "@mui/material";
import servicesImg from "../img/services-img.svg";
import diseasePredImg from "../img/diseasepredictor.svg";
import { useGlobalContext } from "./context";

const Services = () => {
  const { setLoginButtonClicked } = useGlobalContext();

  return (
    <>
      {/* Services Section */}
      <div
        id="services"
        className="w-full flex flex-col items-center justify-center"
      >
        <div className="services-container pt-20 md:pt-0 flex flex-col md:flex-row items-center justify-center gap-6">

          {/* Image */}
          <div className="img-wrapper w-96 lg:w-1/2 flex pt-2">
            <img
              src={servicesImg}
              alt="services"
              className="block w-full"
            />
          </div>

          {/* Text */}
          <div className="hero flex flex-col justify-center w-5/6 md:w-1/2">
            <div className="hero-text px-2 sm:px-10 md:px-0 text-2xl md:text-4xl font-semibold">
              Access Quality Healthcare Assistance Anytime, Anywhere
            </div>

            <div className="hero-stanza lg:text-lg mt-4 text-gray-600">
              Medware provides you with your go-to healthcare services at the
              ease of your device from any location!
            </div>
          </div>
        </div>

        {/* Disease Predictor Section */}
        <div className="disease-predictor flex flex-col md:flex-row items-center justify-center gap-6 mt-10">

          {/* Image */}
          <div className="img-wrapper-predictor w-full sm:w-4/5 md:w-1/2">
            <img
              src={diseasePredImg}
              alt="disease predictor"
              className="block w-full"
            />
          </div>

          {/* Text */}
          <div className="w-4/5 md:w-1/2">
            <div className="flex flex-col justify-center md:pl-6 gap-4">

              <div className="hero-text text-3xl lg:text-6xl font-semibold">
                Feeling low?
              </div>

              <div className="hero-stanza lg:text-xl text-gray-600">
                Use our built-in Disease Predictor and get recommended medical
                assistance based on your symptoms.
              </div>

              <div className="hero-btn-container flex gap-3 items-center mt-4">

                <Button
                  variant="outlined"
                  color="secondary"
                  className="hover:scale-105 md:w-60 md:h-16 transition"
                  onClick={() => {
                    setLoginButtonClicked(true);
                  }}
                >
                  Disease Predictor
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  className="hover:scale-105 md:w-60 md:h-16 transition"
                  onClick={() => {
                    setLoginButtonClicked(true);
                  }}
                >
                  Contact Doctor
                </Button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Services;