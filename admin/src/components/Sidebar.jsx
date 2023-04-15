import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";

const Sidebar = () => {
  const { dispatch } = useContext(AuthContext);

  const handleLogOut = async () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="flex flex-col w-1/6 mr-8 h-full bg-primary rounded-xl drop-shadow-xl bg-sidebar-pattern overflow-hidden relative">
      <div className="h-full bg-primary bg-opacity-80">
        <div className="p-6 text-center">
          <Link to="/">
            <span className="text-white font-bold text-5xl">BackOffice</span>
          </Link>
        </div>

        <div className="text-white">
          <ul className="">
            <p className="my-8 text-3xl ml-8">MAIN</p>
            <Link to="/">
              <li className="mb-8 text-2xl hover:bg-tertiary px-8 py-4 w-full">
                <DashboardIcon className="mr-6" />
                <span>Dashboard</span>
              </li>
            </Link>
            <p className="my-8 text-3xl ml-8">LISTS</p>
            <Link to="/users">
              <li className="mb-8 text-2xl hover:bg-secondary px-8 py-4 w-full">
                <PersonOutlineIcon className="mr-6" />
                <span>Users</span>
              </li>
            </Link>
            <Link to="/hotels">
              <li className="mb-8 text-2xl hover:bg-secondary px-8 py-4 w-full">
                <StoreIcon className="mr-6" />
                <span>Hotels</span>
              </li>
            </Link>
            <Link to="/rooms">
              <li className="text-2xl hover:bg-secondary px-8 py-4 w-full">
                <CreditCardIcon className="mr-6" />
                <span>Rooms</span>
              </li>
            </Link>

            <Link to="/login">
              <li className="w-1/2 absolute bottom-10 left-1/2 -translate-x-1/2 bg-tertiary px-6 py-4 text-2xl rounded-xl hover:scale-105 transition-all">
                <ExitToAppIcon className="mr-6" />
                <span onClick={handleLogOut}>Logout</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
