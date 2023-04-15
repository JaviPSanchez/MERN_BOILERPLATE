import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useState } from "react";
import { roomInputs } from "../assets/data/formSource";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const NewRoom = ({ title, inputs }) => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch("/hotels");

  console.log(data);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    //To return an Object we use the .map method
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    console.log(roomNumbers);

    console.log(hotelId);

    try {
      await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers });
    } catch (err) {
      console.log(err);
    }
    navigate("/rooms");
  };

  console.log(info);
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="bg-white drop-shadow-md rounded-xl mt-12 h-full pt-6 px-6">
          <div className="flex justify-between items-center bg-primary text-white p-4 text-3xl rounded-xl mb-4 h-[6rem]">
            <h2 className="ml-4">{title}</h2>
            <Link to="/rooms">
              <span className="bg-tertiary rounded-full h-[4rem] w-[4rem] flex justify-center items-center hover:scale-110 transition-all">
                <ChevronLeftIcon fontSize="large" className="fill-white" />
              </span>
            </Link>
          </div>

          <form className="flex flex-col justify-center items-center">
            {roomInputs.map((input) => (
              <div className="flex flex-col w-1/3" key={input.id}>
                <label className="p-2">{input.label}</label>
                <input
                  id={input.id}
                  type={input.type}
                  placeholder={input.placeholder}
                  onChange={handleChange}
                  className="p-4 border-2 bg-greyLight2 rounded-lg"
                />
              </div>
            ))}
            <div className="flex flex-col w-1/3">
              <label className="p-2">Rooms</label>
              <textarea
                onChange={(e) => setRooms(e.target.value)}
                placeholder="give comma between room numbers."
              />
            </div>
            <div className="flex flex-col w-1/3">
              <label className="p-2">Choose a hotel</label>
              <select
                className="p-4 border-2 bg-greyLight2 rounded-lg"
                id="hotelId"
                onChange={(e) => setHotelId(e.target.value)}
              >
                {loading
                  ? "loading"
                  : data &&
                    data.map((hotel) => (
                      <option key={hotel._id} value={hotel._id}>
                        {hotel.name}
                      </option>
                    ))}
              </select>
            </div>
            <button
              className="w-1/6 p-6 mt-8 rounded-xl bg-primary text-white text-xl font-bold hover:scale-105 transform-all"
              onClick={handleClick}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
