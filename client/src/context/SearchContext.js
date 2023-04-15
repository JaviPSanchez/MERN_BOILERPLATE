import { createContext, useReducer } from "react";

// INITIAL STATE

const INITIAL_STATE = {
  city: undefined,
  propertyType: undefined,
  dates: [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

// CREATE CONTEXT PROVIDER

export const SearchContext = createContext(INITIAL_STATE);

// ACCIONES

const SearchReducer = (state, action) => {
  console.log("state:", state);
  console.log("action:", action);
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

// WRAPPER

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  // INFORMATION WE WANT TO ACCESS:

  const value = {
    city: state.city,
    propertyType: state.propertyType,
    dates: state.dates,
    options: state.options,
    dispatch,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
