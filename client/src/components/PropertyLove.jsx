import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";

const FeaturedProperties = () => {
  const { data, loading, error, reFetch } = useFetch(
    "/hotels/getAllFeaturedHotels?featured=true&limit=4"
  );

  console.log(data);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <h1 className="w-full max-w-5xl text-xl font-bold mt-6">
        Homes guests love
      </h1>
      <div className="w-full max-w-5xl flex justify-between gap-6">
        {loading ? (
          <Skeleton type="feedLove" />
        ) : (
          data.map((item) => (
            <Link
              to={`hotels/${item._id}`}
              className="flex-1 gap-2 flex flex-col"
              key={item._id}
            >
              {item.photos ? (
                <img
                  className="w-full h-[250px] object-cover rounded-lg hover:cursor-pointer hover:scale-105 transition-all"
                  src={item.photos[0]}
                  alt="NoImage"
                />
              ) : (
                "No Data"
              )}
              <span className="text-[#333333] font-bold capitalize">
                {item.name}
              </span>
              <span className="font-light capitalize">{item.city}</span>
              <span className="font-medium">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="[&>button]:bg-primary [&>button]:text-white [&>button]:font-bold [&>button]:p-2 [&>button]:mr-2 [&>span]:text-sm">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedProperties;
