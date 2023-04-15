import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Oval } from "react-loader-spinner";

const theme = createTheme({
  typography: {
    fontSize: 20,
  },
});

const Datatable = ({ columns, listType }) => {
  const [list, setList] = useState([]);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const { data, loading } = useFetch(`/${path}`);

  console.log(data);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumnUsers = [
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => {
        return (
          <div
            className={`${
              params.row.isAdmin === true
                ? "bg-green-200 border-green-700 text-green-700 text-bold"
                : "bg-orange-200 border-orange-700 text-orange-700 text-bold"
            } mr-2 border-2 p-2 rounded-lg`}
          >
            {params.row.isAdmin ? "Admin" : "User"}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="flex flex-row justify-center items-center">
            <Link to={`/${path}/${params.row._id}`}>
              <div className="mr-4 border-2 p-2 border-blue-700 bg-blue-200 text-blue-700 text-bold rounded-lg">
                View
              </div>
            </Link>

            <div
              className="mr-2 border-2 p-2 border-red-700 bg-red-200 text-red-700 rounded-lg hover:cursor-pointer"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const actionColumnHotels = [
    {
      field: "roomNumbers",
      headerName: "Number of Rooms",
      width: 110,
      renderCell: (params) => {
        return (
          <div className="flex flex-row justify-center items-center">
            {params.row.rooms?.length >= 1 ? (
              <span className="bg-tertiary text-2xl font-bold px-4 py-2 rounded-xl">
                {params.row.rooms.length}
              </span>
            ) : (
              <span className="bg-red-200 text-2xl font-bold p-2 rounded-xl">
                No Rooms
              </span>
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="flex flex-row justify-center items-center">
            <Link to={`/${path}/${params.row._id}`}>
              <div className="mr-4 border-2 p-2 border-blue-700 bg-blue-200 text-blue-700 text-bold rounded-lg">
                View
              </div>
            </Link>

            <div
              className="mr-2 border-2 p-2 border-red-700 bg-red-200 text-red-700 rounded-lg hover:cursor-pointer"
              onClick={() => handleDelete(params.row._id, params.row.idRoom)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  const actionColumnRooms = [
    {
      field: "roomNumbers",
      headerName: "Room Numbers",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="flex flex-row justify-center items-center">
            {params.row.roomNumbers ? (
              params.row.roomNumbers.map((item, id) => (
                <span key={id} className="bg-tertiary m-2 p-2 rounded-xl">
                  {item.number}
                </span>
              ))
            ) : (
              <span className="bg-red-200 p-2 rounded-xl">No Rooms</span>
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="flex flex-row justify-center items-center">
            <Link to={`/${path}/${params.row._id}`}>
              <div className="mr-4 border-2 p-2 border-blue-700 bg-blue-200 text-blue-700 text-bold rounded-lg">
                View
              </div>
            </Link>

            <div
              className="mr-2 border-2 p-2 border-red-700 bg-red-200 text-red-700 rounded-lg hover:cursor-pointer"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col p-6 h-full bg-white mt-12 rounded-xl drop-shadow-md">
      <div className="flex justify-between items-center bg-primary text-white p-4 text-3xl rounded-xl mb-4">
        <h2 className="ml-4">{path.toUpperCase()}</h2>
        <Link
          to={`/${path}/new`}
          className="bg-tertiary p-3 rounded-xl hover:scale-105 transition-all border-2 border-yellow-700 text-white"
        >
          Add New
        </Link>
      </div>

      {loading ? (
        <Oval color="#003580" secondaryColor="#eeeeee" width={60} height={60} />
      ) : (
        <ThemeProvider theme={theme}>
          <DataGrid
            rows={list}
            columns={
              listType === "users"
                ? columns.concat(actionColumnUsers)
                : listType === "hotels"
                ? columns.concat(actionColumnHotels)
                : columns.concat(actionColumnRooms)
            }
            pageSize={9}
            rowsPerPageOptions={[9]}
            getRowId={(row) => row._id}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
          />
        </ThemeProvider>
      )}
    </div>
  );
};

export default Datatable;
