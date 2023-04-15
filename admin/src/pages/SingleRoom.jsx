import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import { useLocation, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import GridPhotos from "../components/GridPhotos";
import { madrid } from "../assets/images/index";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

const Single = () => {
  const location = useLocation();
  const pathPrimary = location.pathname.split("/")[1];
  const pathId = location.pathname.split("/")[2];
  const [rooms, setRooms] = useState("");

  const { data, loading, error } = useFetch(`/${pathPrimary}/${pathId}`);

  useEffect(() => {
    setRooms(data.roomNumbers);
  }, [data]);

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />

        <div className="bg-white drop-shadow-md rounded-xl mt-12 h-full overflow-auto">
          <div className="sticky z-10 top-0 flex justify-between items-center bg-primary text-white p-4 text-3xl drop-shadow-xl mb-4 h-[6rem]">
            <h2 className="ml-4">Information</h2>
            <Link to="/rooms">
              <span className="bg-tertiary rounded-full h-[4rem] w-[4rem] flex justify-center items-center hover:scale-110 transition-all">
                <ChevronLeftIcon fontSize="large" className="fill-white" />
              </span>
            </Link>
          </div>

          <div className="flex flex-col ">
            <div className="flex flex-row ">
              <div className="flex flex-col justify-center items-center w-full h-full mx-4">
                <div className="relative w-full h-full border-2 rounded-xl overflow-hidden drop-shadow-md">
                  <div className="flex flex-col justify-center items-center bg-greyLight2 bg-opacity-90 p-4">
                    {loading ? (
                      <Oval
                        color="#003580"
                        secondaryColor="#eeeeee"
                        width={60}
                        height={60}
                      />
                    ) : (
                      <img
                        src={madrid}
                        alt="error"
                        className="w-full h-[20rem] object-cover rounded-lg drop-shadow-xl"
                      />
                    )}
                    <span
                      onClick={() => console.log("Click")}
                      className="absolute bg-tertiary top-0 right-0 p-8 m-2 rounded-xl text-4xl font-bold z-0 hover:cursor-pointer hover:scale-105 transition-all"
                    >
                      Edit
                    </span>
                    {loading ? (
                      <Oval
                        color="#003580"
                        secondaryColor="#eeeeee"
                        width={60}
                        height={60}
                      />
                    ) : (
                      <div className="flex flex-col w-full p-4 bg-white drop-shadow-xl m-4 rounded-xl text-center">
                        <div className="flex flex-row justify-between items-center p-4 border-2 rounded-xl my-2">
                          <span className="text-2xl mr-4 font-bold">
                            Title:
                          </span>
                          <span className="text-2xl mr-4 font-bold">
                            {data.title}
                          </span>
                        </div>
                        <div className="flex flex-row justify-between items-center p-4 border-2 rounded-xl my-2">
                          <span className="text-2xl mr-4 font-bold">
                            Description:
                          </span>
                          <span className="text-2xl mr-4 font-bold">
                            {data.desc}
                          </span>
                        </div>
                        <div className="flex flex-row justify-between items-center p-4 border-2 rounded-xl my-2">
                          <span className="text-2xl mr-4 font-bold">
                            Price:
                          </span>
                          <span className="text-2xl mr-4 font-bold">
                            {data.price}
                          </span>
                        </div>
                        <div className="flex flex-row justify-between items-center p-4 border-2 rounded-xl my-2">
                          <span className="text-2xl mr-4 font-bold">
                            Max People:
                          </span>

                          <span className="text-2xl mr-4 font-bold">
                            {data.maxPeople}
                          </span>
                        </div>
                        <div className="flex flex-row justify-between items-center p-4 border-2 rounded-xl my-2">
                          <span className="text-2xl mr-4 font-bold">
                            Room Info:
                          </span>
                          <span className="text-2xl mr-4 font-bold">
                            {!rooms
                              ? "No Rooms"
                              : rooms.map((item, id) => {
                                  const { number, unavailableDates, _id } =
                                    item;
                                  return (
                                    <li
                                      key={id}
                                      className="flex flex-col border-2 rounded-xl my-2"
                                    >
                                      <ul className="p-2">
                                        Room Number: {number}
                                      </ul>
                                      <ul className="p-2">Room ID: {_id}</ul>
                                      Booked dates:
                                      {unavailableDates.length === 0 ? (
                                        <ul className="p-2 bg-pink-200">
                                          Not yet
                                        </ul>
                                      ) : (
                                        <ul className="p-2 bg-green-200">
                                          {unavailableDates}
                                        </ul>
                                      )}
                                    </li>
                                  );
                                })}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="p-6 mx-4 my-8 drop-shadow-md rounded-xl bg-greyLight2">
              {loading ? "Loading..." : <GridPhotos photos={data.photos} />}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
