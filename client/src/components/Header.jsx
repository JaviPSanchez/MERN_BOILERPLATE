import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { useState, useEffect } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Global";
import { useContext, useRef } from "react";
import { SearchContext } from "../context/SearchContext";
// import { addDays } from "date-fns";

const Header = ({ type }) => {
  const navigate = useNavigate();
  //Actualizaremos :  onChange={(e) => setDestination(e.target.value)}
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      // endDate: addDays(new Date(), 7),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const refOptions = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        openOptions &&
        refOptions.current &&
        !refOptions.current.contains(e.target)
      ) {
        setOpenOptions(!openOptions);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.addEventListener("click", checkIfClickedOutside);
    };
  }, [openOptions]);

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleOption = (name, operation) => {
    //We take the previous state (adult: 1, children: 0, room: 1)
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { search, dispatch } = useContext(SearchContext);

  // console.log(destination);
  // console.log(dates);
  // console.log(options);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    // Pasamos en el state tambien, destination, date y options
    navigate("/hotels", {
      state: { destination, dates, options },
    });
  };

  return (
    <div
      className={
        type === "list" ? "bg-hero-pattern bg-cover bg-bottom" : "bg-primary"
      }
    >
      <div
        className={
          type === "list"
            ? "h-screen bg-primary bg-opacity-80 text-white flex justify-center items-center relative z-10 p-10"
            : "bg-primary bg-opacity-80 text-white flex justify-center relative z-10 p-10"
        }
      >
        <div
          className={
            type === "list"
              ? "w-full max-w-5xl mt-5 mb-28"
              : "w-full max-w-5xl mt-5 mb-0"
          }
        >
          <div
            className={
              type === "list"
                ? "flex mb-20 gap-20 items-center justify-center"
                : "flex my-20 gap-20 items-center justify-center"
            }
          >
            <div className="flex items-center gap-2 border-2 border-solid border-white p-3 rounded-3xl">
              <FontAwesomeIcon icon={faBed} />
              <span>Stays</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faPlane} />
              <span>Flights</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCar} />
              <span>Car rentals</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faBed} />
              <span>Attractions</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faTaxi} />
              <span>Airport taxis</span>
            </div>
          </div>
          {type && type === "list" ? (
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-3xl font-bold">
                A lifetime of discounts? It's Genius.
              </h1>
              <p className="py-4">
                Get rewarded for your travels - unlock instant savings of 10% or
                more with a free jabooking account
              </p>
              {search ? (
                <button className="bg-primaryLight text-white p-4">
                  Sign in / Register
                </button>
              ) : null}

              {/* SEARCH COMPONENT */}

              <div className="w-full max-w-5xl h-14 flex items-center justify-around p-2 -bottom-[25px] bg-white border-2 border-solid border-yellow rounded-md shadow-lg shadow-amber-500/30">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faBed} className="text-stone-400" />
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    className="border-none outline-0 text-black"
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <div ref={refOne} className="flex items-center gap-2 relative">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="text-stone-400"
                  />
                  <input
                    readOnly
                    onClick={() => setOpen((open) => !open)}
                    className="text-stone-400 cursor-pointer"
                    value={`${format(
                      dates[0].startDate,
                      "MM/dd/yyyy"
                    )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                  />
                  {open && (
                    <DateRange
                      onChange={(item) => setDates([item.selection])}
                      showMonthArrow={true}
                      className="absolute top-10 z-2 shadow-xl"
                      editableDateInputs={true}
                      moveRangeOnFirstSelection={false}
                      ranges={dates}
                      minDate={new Date()}
                    />
                  )}
                </div>

                <div
                  className="flex items-center gap-2 relative"
                  ref={refOptions}
                >
                  <FontAwesomeIcon icon={faPerson} className="text-stone-400" />
                  <span
                    onClick={() => setOpenOptions(!openOptions)}
                    className="text-stone-400"
                  >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                  {openOptions && (
                    <div className="absolute z-2 top-10 bg-white text-stone-600 rounded-md shadow-md">
                      <div className="w-[200px] flex justify-between m-4">
                        <span className="optionText">Adult</span>
                        <div className="flex align-center gap-2.5 text-m text-black">
                          <button
                            disabled={options.adult <= 1}
                            className="w-[30px] h-[30px] border-2 border-solid border-[#0071c2]"
                            onClick={() => handleOption("adult", "d")}
                          >
                            -
                          </button>
                          <span className={styles.optionCounterNumber}>
                            {options.adult}
                          </span>
                          <button
                            className={styles.optionCounterButton}
                            onClick={() => handleOption("adult", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="w-[200px] flex justify-between m-4">
                        <span className="optionText">Children</span>
                        <div className="flex align-center gap-2.5 text-m text-black">
                          <button
                            disabled={options.children <= 0}
                            className={styles.optionCounterButton}
                            onClick={() => handleOption("children", "d")}
                          >
                            -
                          </button>
                          <span className={styles.optionCounterNumber}>
                            {options.children}
                          </span>
                          <button
                            className={styles.optionCounterButton}
                            onClick={() => handleOption("children", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="w-[200px] flex justify-between m-4">
                        <span className="optionText">Room</span>
                        <div className="flex align-center gap-2.5 text-m text-black">
                          <button
                            disabled={options.room <= 1}
                            className={styles.optionCounterButton}
                            onClick={() => handleOption("room", "d")}
                          >
                            -
                          </button>
                          <span className={styles.optionCounterNumber}>
                            {options.room}
                          </span>
                          <button
                            className={styles.optionCounterButton}
                            onClick={() => handleOption("room", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex align-center gap-2.5">
                  <button
                    className="bg-primaryLight text-white px-4 py-3  hover:scale-105 transition-all rounded-xl "
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
