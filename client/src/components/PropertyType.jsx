import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Skeleton from "./Skeleton";

const PropertyList = () => {
  const navigate = useNavigate();
  const { data, loading } = useFetch("/hotels/countByType");

  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ];

  const handleSearch = (e) => {
    let type =
      e.currentTarget.firstElementChild.nextElementSibling.firstElementChild
        .innerHTML;
    navigate("/list", { state: { propertyType: type } });
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <h1 className="w-full max-w-5xl text-xl font-bold mt-6">
        Browse by property type
      </h1>
      <div className="w-full max-w-5xl flex justify-between gap-6 mt-6 ">
        {loading ? (
          <Skeleton type={"feedProperty"} />
        ) : (
          <>
            {data &&
              images.map((img, index) => (
                <div
                  className="flex-1 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all"
                  key={index}
                  onClick={handleSearch}
                >
                  <img
                    src={img}
                    alt="noImage"
                    className="w-full h-[125px] object-cover"
                  />
                  <div className="text-xl text-[#444444]">
                    <h2 className="font-bold mt-2 capitalize">
                      {data[index]?.type}
                    </h2>
                    <h3 className="">
                      {data[index]?.count} {data[index]?.type}
                    </h3>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
