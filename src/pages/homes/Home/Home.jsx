import Doctors from "../DoctorCorner/Doctors";
import FrequentQuestion from "../Faq/FrequentQuestion";
import Slider from "../Slider/Slider";


const Home = () => {
  return (
    <div className="mt-20 md:container mx-auto">
      <h1>This is home</h1>
      <Slider/>
      <Doctors/>
      <FrequentQuestion/>
    </div>
  );
};

export default Home;