import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ListByCity from "./pages/ListByCity";
import SingleHotel from "./pages/SingleHotel";
import Login from "./pages/Login";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Modal from "./components/Modal";
import { ListByProperty } from "./pages/ListByProperty";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    // if (!user) {
    //   return <Modal />;
    // }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hotels"
          element={
            <ProtectedRoute>
              <ListByCity />
            </ProtectedRoute>
          }
        />
        <Route
          path="/list"
          element={
            <ProtectedRoute>
              <ListByProperty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hotels/:id"
          element={
            <ProtectedRoute>
              <SingleHotel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
