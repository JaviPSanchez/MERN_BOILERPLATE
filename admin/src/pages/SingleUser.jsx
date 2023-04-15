import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Chart from "../components/Chart";
import List from "../components/Table";
import { useLocation, Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const SingleUser = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathPrimary = location.pathname.split("/")[1];
  const pathId = location.pathname.split("/")[2];

  const { data, loading, error } = useFetch(`/${pathPrimary}/${pathId}`);
  console.log(data);

  const handleClick = () => {
    navigate(`/users/edit/${pathId}`);
  };

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="bg-white drop-shadow-md rounded-xl mt-12 h-full overflow-auto">
          <div className="sticky z-10 top-0 flex justify-between items-center bg-primary text-white p-4 text-3xl drop-shadow-xl mb-4 h-[6rem]">
            <h2 className="ml-4 ">Information</h2>
            <Link to="/users">
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
                    <img
                      src={data.img}
                      alt="error"
                      className="w-[20rem] h-[20rem] object-cover rounded-lg drop-shadow-xl"
                    />
                    <span
                      onClick={handleClick}
                      className="absolute bg-red-200 top-0 right-0 p-4 text-2xl font-bold z-0 hover:cursor-pointer hover:bg-red-400 transition-all"
                    >
                      Edit
                    </span>
                    <div className="flex flex-col w-1/2 p-4 bg-white drop-shadow-xl m-4 rounded-xl text-center">
                      <h1 className="text-5xl font-bold">{data.username}</h1>
                      <div className="flex flex-row justify-between items-center py-4">
                        <span className="text-2xl mr-4 font-bold">Email:</span>
                        <span className="text-2xl">{data.email}</span>
                      </div>
                      <div className="flex flex-row justify-between items-center py-4">
                        <span className="text-2xl mr-4 font-bold">Phone:</span>
                        <span className="text-2xl">{data.phone}</span>
                      </div>
                      <div className="flex flex-row justify-between items-center py-4">
                        <span className="text-2xl mr-4 font-bold">
                          Address:
                        </span>
                        {data.address ? (
                          <span className="text-2xl">{data.address}</span>
                        ) : (
                          <span className="text-2xl">No Data</span>
                        )}
                      </div>

                      <div className="flex flex-row justify-between items-center py-4">
                        <span className="text-2xl mr-4 font-bold">
                          Country:
                        </span>
                        <span className="text-2xl">{data.country}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-2/3 p-10 border-2 drop-shadow-md rounded-xl bg-greyLight2  mx-4">
                <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
              </div>
            </div>
            <div className="p-6 mx-4 my-8 drop-shadow-md rounded-xl bg-greyLight2">
              <h1 className="title">Last Transactions</h1>
              <List />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
