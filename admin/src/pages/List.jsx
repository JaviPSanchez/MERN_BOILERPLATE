import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Datatable from "../components/Datatable";

const List = ({ columns, listType }) => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-col w-full ">
        <Navbar />
        <Datatable columns={columns} listType={listType} />
      </div>
    </div>
  );
};

export default List;
