import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Modal from "./Modal";
import { useState } from "react";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, dispatch } = useContext(AuthContext);

  const handleOnClose = () => setShowModal(false);

  const handleLogOut = async () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <div className="bg-transparent flex justify-center h-16 p-10 absolute z-40 w-full">
        <div className="w-full max-w-5xl text-white flex items-center justify-between">
          <Link
            to="/"
            className="font-medium hover:cursor-pointer hover:scale-110 transition-all"
          >
            <span>checking.com</span>
          </Link>
          <div className="navItems">
            {!user ? (
              <>
                <button className="ml-5 px-4 py-3 bg-white text-black rounded-xl hover:scale-105 transition-all font-bold">
                  Register
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="ml-5 px-4 py-3 bg-white text-black rounded-xl hover:scale-105 transition-all font-bold"
                >
                  Login
                </button>
              </>
            ) : (
              <button
                onClick={handleLogOut}
                className="ml-5 px-4 py-3 bg-white text-black rounded-xl hover:scale-105 transition-all font-bold"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
      <Modal onClose={handleOnClose} visible={showModal} />
    </>
  );
};

export default Navbar;
