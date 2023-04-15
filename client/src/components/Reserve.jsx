import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import useFetch from "../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  // console.log(setOpen, hotelId);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext); //It is a range

  console.log(data);

  //We need the days in the middle:
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime()); // getTime --> Timestamps (easier to compare dates)
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  console.log(alldates);

  //Check if rooms are available
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    //If it´s true it is not available so we do not want to return isFound
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    console.log(checked);
    console.log(value);
    setSelectedRooms(
      checked
        ? [...selectedRooms, value] //take the previous rooms and add one more id
        : selectedRooms.filter((item) => item !== value) // Déjame los valores diferentes del value
    );
  };

  console.log(selectedRooms);

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-[#0000006A]">
      <div className="bg-white p-10 relative z-6">
        <FontAwesomeIcon
          size="2x"
          icon={faCircleXmark}
          className="absolute top-0 right-0 cursor-pointer p-4"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div
            className="flex items-center justify-between gap-10 p-10"
            key={item._id}
          >
            <div className="flex flex-col gap-2">
              <div className="font-medium">{item.title}</div>
              <div className="font-light">{item.desc}</div>
              <div className="text-xs">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="font-medium">{item.price}</div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-stone-400 ">
              {item.roomNumbers.map((roomNumber) => (
                <div className="flex flex-col">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={handleClick}
          className="border-none px-2 py-4 bg-[#0071c2] text-white font-bold cursor-pointer rounded w-full mt-5"
        >
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
