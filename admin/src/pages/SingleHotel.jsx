import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Chart from "../components/Chart";
import { useLocation, Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import GridPhotos from "../components/GridPhotos";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Oval } from "react-loader-spinner";

const Single = () => {
  const location = useLocation();
  const pathPrimary = location.pathname.split("/")[1];
  const pathId = location.pathname.split("/")[2];

  const navigate = useNavigate();

  const { data, loading, error } = useFetch(`/${pathPrimary}/find/${pathId}`);

  console.log(data.photos);

  const handleClick = () => {
    navigate(`/hotels/edit/${pathId}`);
  };

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />

        <div className="bg-white drop-shadow-md rounded-xl mt-12 h-full overflow-auto">
          <div className="sticky z-10 top-0 flex justify-between items-center bg-primary text-white p-4 text-3xl drop-shadow-xl mb-4 h-[6rem]">
            <h2 className="ml-4 ">Information</h2>
            <Link to="/hotels">
              <span className="bg-tertiary rounded-full h-[4rem] w-[4rem] flex justify-center items-center hover:scale-110 transition-all">
                <ChevronLeftIcon fontSize="large" className="fill-white" />
              </span>
            </Link>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row w-full ">
              <div className="flex flex-col justify-center items-center w-1/3 mx-4">
                <div className="relative w-full border-2 rounded-xl overflow-hidden drop-shadow-md">
                  <div className="h-full w-full flex flex-col justify-center items-center bg-greyLight2 bg-opacity-90 p-4">
                    {loading ? (
                      <Oval
                        color="#003580"
                        secondaryColor="#eeeeee"
                        width={60}
                        height={60}
                      />
                    ) : (
                      <img
                        src={data.photos}
                        alt="error"
                        className="w-full h-[20rem] object-cover rounded-t-xl drop-shadow-xl"
                      />
                    )}
                    <span
                      onClick={handleClick}
                      className="absolute bg-red-200 top-0 right-0 p-4 text-2xl font-bold z-0 hover:cursor-pointer hover:bg-red-400 transition-all"
                    >
                      Edit
                    </span>
                    <div className="flex flex-col w-full p-4 bg-white drop-shadow-xl mx-4 rounded-b-xl text-center">
                      <h1 className="text-5xl font-bold">{data.username}</h1>
                      <div className="flex flex-row justify-between items-center py-4">
                        <span className="text-2xl mr-4 font-bold">Name:</span>
                        <span className="text-2xl mr-4 font-bold">
                          {data.name}
                        </span>
                      </div>
                      <div className="flex flex-row justify-between items-center py-4">
                        <span className="text-2xl mr-4 font-bold">Title:</span>
                        <span className="text-2xl mr-4 font-bold">
                          {data.title}
                        </span>
                      </div>
                      <div className="flex flex-row justify-between items-center py-4">
                        <span className="text-2xl mr-4 font-bold">
                          Distance:
                        </span>
                        <span className="text-2xl mr-4 font-bold">
                          {data.distance}
                        </span>
                      </div>
                      <div className="flex flex-row justify-between items-center py-4">
                        <span className="text-2xl mr-4 font-bold">
                          Address:
                        </span>
                        {data.address ? (
                          <span className="text-2xl mr-4 font-bold">
                            {data.address}
                          </span>
                        ) : (
                          <span className="text-2xl mr-4 font-bold">
                            No Data
                          </span>
                        )}
                      </div>
                      <div className="flex flex-row justify-between items-center py-4">
                        <span className="text-2xl mr-4 font-bold">
                          Feature:
                        </span>
                        {data.featured === true ? (
                          <span className="text-2xl mr-4 font-bold">Yes</span>
                        ) : (
                          <span className="text-2xl mr-4 font-bold">No</span>
                        )}
                      </div>

                      <div className="flex flex-row justify-between items-center py-4">
                        <span className="text-2xl mr-4 font-bold">City:</span>
                        <span className="text-2xl mr-4 font-bold">
                          {data.city}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-2/3 p-10 border-2 drop-shadow-md rounded-xl bg-greyLight2 mx-4">
                <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
              </div>
            </div>
            <div className="p-6 mx-4 my-8 drop-shadow-md rounded-xl bg-greyLight2">
              <span className="text-2xl mr-4 font-bold">Photos:</span>
              {loading ? (
                <Oval
                  color="#003580"
                  secondaryColor="#eeeeee"
                  width={60}
                  height={60}
                />
              ) : (
                <GridPhotos photos={data.photos} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
