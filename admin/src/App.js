import Home from "./pages/Home";
import Login from "./pages/Login";
import List from "./pages/List";
import SingleUser from "./pages/SingleUser";
import SingleHotel from "./pages/SingleHotel";
import SingleRoom from "./pages/SingleRoom";
import NewUser from "./pages/NewUser";
import NewHotel from "./pages/NewHotel";
import NewRoom from "./pages/NewRoom";
import EditUser from "./pages/EditUser";
import EditHotel from "./pages/EditHotel";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { userInputs } from "./assets/data/formSource";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import {
  hotelColumns,
  userColumns,
  roomColumns,
} from "./assets/data/datatablesource";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }
    //If there is admin return children
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="users">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List columns={userColumns} listType={"users"} />
                </ProtectedRoute>
              }
            />
            <Route
              path=":userId"
              element={
                <ProtectedRoute>
                  <SingleUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <NewUser inputs={userInputs} title="Add New User" />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit/:id"
              element={
                <ProtectedRoute>
                  <EditUser inputs={userInputs} title="Edit User" />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="hotels">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List columns={hotelColumns} listType={"hotels"} />
                  {/* <List listType={"hotels"} /> */}
                </ProtectedRoute>
              }
            />
            <Route
              path=":hotelId"
              element={
                <ProtectedRoute>
                  <SingleHotel />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <NewHotel inputs={userInputs} title="Add New Hotel" />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit/:id"
              element={
                <ProtectedRoute>
                  <EditHotel inputs={userInputs} title="Edit Hotel" />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="rooms">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List columns={roomColumns} listType={"rooms"} />
                </ProtectedRoute>
              }
            />
            <Route
              path=":roomId"
              element={
                <ProtectedRoute>
                  <SingleRoom />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <NewRoom inputs={userInputs} title="Add New Room" />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
