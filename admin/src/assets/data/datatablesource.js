import { noAvatar } from "../images";

export const userColumns = [
  { field: "_id", headerName: "ID", width: 200 },
  {
    field: "user",
    headerName: "User",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="flex flex-row justify-center items-center">
          <img
            className="w-12 h-12 rounded-full object-cover mr-6"
            src={params.row.img || noAvatar}
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },

  {
    field: "email",
    headerName: "Email",
    width: 150,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 180,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 240 },
  {
    field: "title",
    headerName: "Title",
    width: 180,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];
