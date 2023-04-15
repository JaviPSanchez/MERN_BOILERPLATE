import Axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { user, loading, error, dispatch } = useContext(AuthContext);

  console.log(user); //null

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // ACTION

    dispatch({ type: "LOGIN_START" });
    try {
      console.log(credentials); // {username: 'admin', password: 'Test1234@'}
      const res = await Axios.post("/auth/login", credentials);
      console.log(res.data.details); //undefined
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      console.log(err.response.data);
    }
  };

  return (
    <div className="fixed flex items-center justify-center">
      <div className="max-w-sm flex flex-col gap-5 items-center w-full relative">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="h-10 p-5 w-full rounded-md border-2 border-stone-400"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="h-10 p-5 w-full rounded-md border-2 border-stone-400"
        />
        <button
          disabled={loading}
          onClick={handleClick}
          className="w-full border-none px-10 py-5 bg-[#0071c2] text-white font-bold cursor-pointer rounded-md disabled:bg-[#0071c28c] disabled:cursor-not-allowed"
        >
          Login
        </button>
        {error ? (
          <span className="absolute -bottom-[100px] bg-red-200 p-6 w-1/2 text-center border-2 border-[red] font-bold">
            {error.message}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default Login;
