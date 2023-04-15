import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { noAvatar } from "../assets/images/index";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex bg-primary w-full rounded-xl drop-shadow-xl">
      <div className="w-full h-full flex justify-between p-5">
        <div className="h-full w-1/6 flex justify-center items-center bg-tertiary rounded-lg overflow-hidden">
          <input
            className="h-full w-full p-2"
            type="text"
            placeholder="Search..."
          />
          <SearchOutlinedIcon
            className="mx-4 hover:cursor-pointer"
            fontSize="large"
          />
        </div>
        <div className="flex flex-row w-2/12 justify-end items-center">
          <div className="relative mr-6">
            <NotificationsNoneOutlinedIcon
              fontSize="large"
              sx={{ color: "white" }}
            />
            <span className="absolute -top-3 -right-4 bg-red-400 text-2xl font-bold rounded-full w-[20px] h-[20px] text-center">
              1
            </span>
          </div>
          <div className="user">
            <img
              src={user.img || noAvatar}
              alt="error"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
