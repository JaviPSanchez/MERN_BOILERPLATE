import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="w-full flex flex-row h-full">
      <div className="w-1/2 flex flex-col justify-center items-center mr-4 bg-white rounded-3xl overflow-hidden drop-shadow-xl">
        <div className="flex flex-col justify-center items-center w-1/3">
          <label className="py-4 w-full text-2xl text-black">username:</label>
          <input
            autoComplete="new-password"
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="w-full p-6 border-2 rounded-xl"
          />
        </div>
        <div className="flex flex-col justify-center items-center w-1/3">
          <label className="py-4 w-full text-2xl text-black">password:</label>
          <input
            autoComplete="new-password"
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="w-full p-6 border-2 rounded-xl"
          />
        </div>
        <div className="flex flex-col justify-center items-center w-1/3">
          <button
            disabled={loading}
            onClick={handleClick}
            className="bg-primary w-full text-white text-3xl font-bold p-6 mt-8 rounded-xl"
          >
            Login
          </button>
        </div>
        <div className="flex flex-col justify-center items-center w-1/3 relative mt-12">
          {error && (
            <span className="w-full p-6 border-2 rounded-xl mt-12 absolute text-center text-red-700 text-xl bg-red-200 border-2 border-red-700">
              {error.message}
            </span>
          )}
        </div>
      </div>
      <div className="w-1/2 bg-login-pattern bg-cover rounded-3xl overflow-hidden drop-shadow-xl">
        <div className="h-full bg-primary bg-opacity-60 flex justify-center items-center">
          <h1 className="text-white text-6xl font-bold">BackOffice</h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
