import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useState } from "react";
import axios from "axios";
import { noImage } from "../assets/images";
import { useNavigate, Link, useLocation } from "react-router-dom";

const NewUser = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  console.log(info);

  const navigate = useNavigate();
  const location = useLocation();

  const pathId = location.pathname.split("/")[3];

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const updateUser = {
        ...info,
        pathId,
      };

      await axios.put(`/users/${pathId}`, updateUser);
      navigate("/users");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="bg-white drop-shadow-md rounded-xl mt-12 h-full pt-6 px-6">
          <div className="flex justify-between items-center bg-primary text-white p-4 text-3xl rounded-xl mb-4 h-[6rem]">
            <h2 className="ml-4">{title}</h2>
            <Link to="/users">
              <span className="bg-tertiary rounded-full h-[4rem] w-[4rem] flex justify-center items-center hover:scale-110 transition-all">
                <ChevronLeftIcon fontSize="large" className="fill-white" />
              </span>
            </Link>
          </div>

          <form className="flex flex-col justify-center items-center">
            <div className="flex flex-col w-1/3 p-2 justify-center items-center">
              <img
                className="w-40 h-40 object-cover rounded-lg"
                src={file ? URL.createObjectURL(file) : noImage}
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
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                />
              </div>
            </div>

            {inputs.map((input) => (
              <div className="flex flex-col w-1/3" key={input.id}>
                <label className="p-2">{input.label}</label>
                <input
                  autoComplete="new-password"
                  onChange={handleChange}
                  type={input.type}
                  placeholder={input.placeholder}
                  id={input.id}
                  className="p-4 border-2 bg-greyLight2 rounded-lg"
                />
              </div>
            ))}

            <div className="flex flex-col w-1/3">
              <label className="p-2">Admin</label>
              <select
                className="p-4 border-2 bg-greyLight2 rounded-lg"
                id="isAdmin"
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

export default NewUser;
