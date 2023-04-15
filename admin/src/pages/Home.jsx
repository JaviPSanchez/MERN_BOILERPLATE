import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Widget from "../components/Widget";
import Featured from "../components/Featured";
// import Chart from "../components/Chart";
import Table from "../components/Table";

const Home = () => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="flex flex-row p-5 gap-5">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="flex gap-5 px-2 py-5">
          {/* <Featured /> */}
          {/* <Chart title="Last 6 Months (Revenue)"/> */}
        </div>
        <div className="m-2 p-2 ">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
