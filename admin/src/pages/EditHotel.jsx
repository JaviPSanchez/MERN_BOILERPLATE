import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../assets/data/formSource";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { noImage } from "../assets/images";
import { useNavigate, Link, useLocation } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const NewHotel = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const location = useLocation();
  const pathId = location.pathname.split("/")[3];
  console.log(info);
  console.log(files);

  const { data, loading, error } = useFetch("/rooms");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dcjrxf9cd/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const updateHotel = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.put(`/hotels/${pathId}`, updateHotel);
      navigate("/hotels");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="bg-white drop-shadow-md rounded-xl mt-12 h-full overflow-auto">
          <div className="sticky z-10 top-0 flex justify-between items-center bg-primary text-white p-4 text-3xl drop-shadow-xl mb-4 h-[6rem]">
            <h2 className="ml-4">{title}</h2>
            <Link to="/hotels">
              <span className="bg-tertiary rounded-full h-[4rem] w-[4rem] flex justify-center items-center hover:scale-110 transition-all">
                <ChevronLeftIcon fontSize="large" className="fill-white" />
              </span>
            </Link>
          </div>

          <form className="flex flex-col justify-center items-center">
            <div className="flex flex-col w-1/3 p-6 justify-center items-center">
              <img
                className="w-40 h-40 object-cover rounded-lg"
                src={files ? URL.createObjectURL(files[0]) : noImage}
                alt="NoImage"
              />

              <div className="flex flex-row items-center justify-center w-full">
                <label
                  className="text-white text-center w-1/2 m-4 px-6 py-4 rounded-lg bg-primary hover:cursor-pointer hover:scale-105 transition-all"
                  htmlFor="file"
                >
                  Load image:
                  <DriveFolderUploadOutlinedIcon
                    fontSize="large"
                    className="fill-white ml-2"
                  />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  className="hidden"
                />
              </div>
            </div>

            {hotelInputs.map((input) => (
              <div className="flex flex-col w-1/3" key={input.id}>
                <label className="p-2">{input.label}</label>
                <input
                  id={input.id}
                  onChange={handleChange}
                  type={input.type}
                  placeholder={input.placeholder}
                  className="p-4 border-2 bg-greyLight2 rounded-lg"
                />
              </div>
            ))}

            <div className="flex flex-col w-1/3">
              <label className="p-2">Featured</label>
              <select
                className="p-4 border-2 bg-greyLight2 rounded-lg"
                id="featured"
                onChange={handleChange}
              >
                <option
                  disabled
                  hidden
                  className="p-4 border-2 bg-greyLight2 rounded-lg"
                  value="none"
                  selected
                >
                  Choose Option
                </option>
                <option
                  className="p-4 border-2 bg-greyLight2 rounded-lg"
                  value={false}
                >
                  No
                </option>
                <option
                  className="p-4 border-2 bg-greyLight2 rounded-lg"
                  value={true}
                >
                  Yes
                </option>
              </select>
            </div>

            <div className="flex flex-col w-1/3">
              <label className="p-2">Rooms</label>
              <select
                className="p-4 border-2 bg-greyLight2 rounded-lg"
                id="rooms"
                multiple
                onChange={handleSelect}
              >
                {loading
                  ? "loading"
                  : data &&
                    data.map((room) => (
                      <option
                        className="p-4 border-2 bg-greyLight2 rounded-lg"
                        key={room._id}
                        value={room._id}
                      >
                        {room.title}
                      </option>
                    ))}
              </select>
            </div>
            <button
              className="w-1/6 p-6 my-8 rounded-xl bg-primary text-white text-xl font-bold hover:scale-105 transform-all"
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

export default NewHotel;
