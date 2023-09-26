import Doctors from "../DoctorCorner/Doctors";
import FrequentQuestion from "../Faq/FrequentQuestion";
import Slider from "../Slider/Slider";
import Services from "../services/Services";


const Home = () => {
  return (
    <div className="mt-6 2xl:container mx-auto">
      <Slider  />
      <Doctors />
        <Services/>
      <FrequentQuestion />
    </div>
  );
};

export default Home;