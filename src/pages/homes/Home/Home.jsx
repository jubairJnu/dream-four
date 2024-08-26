
import Slider from "../Slider/Slider";
import Services from "../services/Services";

import Doctors from "../DoctorCorner/Doctors";

const Home = () => {
  return (
    <div className="mt-6 2xl:container mx-auto">
      <Slider />

      <Doctors />

      <Services />
    </div>
  );
};

export default Home;
