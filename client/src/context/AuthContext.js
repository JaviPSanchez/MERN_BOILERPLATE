import { useReducer, createContext, useEffect } from "react";

// INITIAL STATE

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

// CREATE CONTEXT PROVIDER

export const AuthContext = createContext(INITIAL_STATE);

// ACTIONS

const AuthReducer = (state, action) => {
  console.log(action); //{type: 'LOGIN_START'}
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return null;
  }
};

// WRAPPER

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // Queremos que el user quede almacenado en la localstorage

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  const value = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    dispatch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
