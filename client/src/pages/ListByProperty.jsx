import Navbar from "../components/Navbar";
import Header from "../components/Header";
import useFetch from "../hooks/useFetch";
import { Oval } from "react-loader-spinner";
import SearchItem from "../components/SearchItem";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export const ListByProperty = () => {
  const location = useLocation();
  const [type, setType] = useState(location.state.propertyType);
  const { data, loading } = useFetch(
    `/property/getPropertiesByType?type=${type}`
  );
  return (
    <div>
      <Navbar />
      <Header />
      <div className="flex-3">
        {loading ? (
          <Oval />
        ) : (
          <>
            {data.map((item) =>
              item.map((item) => <SearchItem item={item} key={item._id} />)
            )}
          </>
        )}
      </div>
    </div>
  );
};
