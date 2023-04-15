import styles from "../styles/Global";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";
import Reserve from "../components/Reserve";
import { Oval } from "react-loader-spinner";
import room1 from "../assets/images/room1.jpg";
import room2 from "../assets/images/room2.jpg";
import room3 from "../assets/images/room3.jpg";
import room4 from "../assets/images/room4.jpg";
import room5 from "../assets/images/room5.jpg";
import room6 from "../assets/images/room6.jpg";

const images = [
  { id: 0, src: room1 },
  { id: 1, src: room2 },
  { id: 2, src: room3 },
  { id: 3, src: room4 },
  { id: 4, src: room5 },
  { id: 5, src: room6 },
];

const SingleHotel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  //API CALLS
  const { data, loading, error, reFetch } = useFetch(`/hotels/find/${id}`);
  console.log(data);
  const { city, dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOnClickOutside = (e) => {
    if (e.target.id === "container") setOpen(false);
  };

  const handleOpen = (i) => {
    console.log(i);
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <Navbar />
      <Header />
      {loading ? (
        <Oval />
      ) : (
        <div className="relative flex flex-col items-center mt-5">
          {open && (
            <div
              id="container"
              onClick={handleOnClickOutside}
              className="fixed z-50 inset-0 flex justify-between items-center backdrop-blur-sm bg-black bg-opacity-80"
            >
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="absolute top-5 right-5 text-5xl text-greyLight cursor-pointer"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="mx-10 text-5xl text-greyLight cursor-pointer"
                onClick={() => handleMove("l")}
              />
              <div className="w-fit h-2/3 flex justify-center items-center">
                <img
                  className="h-full"
                  src={images[slideNumber].src}
                  alt="NoImage"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="mx-10 text-5xl text-greyLight cursor-pointer"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="relative w-full max-w-5xl flex flex-col gap-2 p-4">
            <button
              className="absolute top-5 right-5 border-none p-2.5 bg-primaryLight text-white font-bold rounded-md cursor-pointer"
              onClick={handleClick}
            >
              Reserve or Book Now!
            </button>
            <h1 className="text-2xl font-bold mt-5">{data.title}</h1>
            <div className="flex items-center gap-2 text-xl">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="text-primaryLight text-bold">
              Excellent location - {data.distance}m from center
            </span>
            <span className="text-green font-medium">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="grid grid-rows-4 grid-cols-4 w-full gap-4">
              {data.photos && (
                <div className="row-span-4 col-span-3">
                  <img className="w-full h-full" src={data.photos} alt="No" />
                </div>
              )}
              {images.map((item) => (
                <div className="row-span-2" key={item.id}>
                  <img
                    onClick={() => handleOpen(item.id)}
                    src={item.src}
                    alt="not found"
                    className="w-full h-full cursor-pointer hover:scale-105 transition-all"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between gap-10 mt-10">
              <div className="flex flex-col gap-10 flex-1 bg-greyLight p-5 [&>h1]:text-md [&>h1]:text-grey [&>span]:text-sm [&>button]:border-none [&>button]:p-5 [&>button]:bg-primaryLight [&>button]:text-white [&>button]:cursor-pointer [&>button]:rounded-xl">
                {days ? <h1>Perfect for a {days}-night stay!</h1> : null}
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                {days ? (
                  <h2>
                    <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                    nights)
                  </h2>
                ) : null}
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
      {openModal ? <Reserve setOpen={setOpenModal} hotelId={id} /> : null}
    </div>
  );
};

export default SingleHotel;
