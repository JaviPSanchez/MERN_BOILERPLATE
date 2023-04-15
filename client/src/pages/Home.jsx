import PropertyCity from "../components/PropertyCity";
import PropertyLove from "../components/PropertyLove";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PropertyType from "../components/PropertyType";
import Modal from "../components/Modal";

const Home = () => {
  return (
    <div>
      <Modal />
      <Navbar />
      <Header type={"list"} />
      <div className="flex flex-col items-center justify-between">
        <PropertyCity />
        <PropertyType />
        <PropertyLove />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
