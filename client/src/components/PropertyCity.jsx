import useFetch from "../hooks/useFetch";
import madridVideo from "../assets/videos/madridVideo.mp4";
import berlinVideo from "../assets/videos/berlinVideo.mp4";
import londonVideo from "../assets/videos/londonVideo.mp4";
import Skeleton from "./Skeleton";
import { useNavigate } from "react-router-dom";

const videos = [
  { video: madridVideo, name: "Madrid" },
  { video: berlinVideo, name: "Berlin" },
  { video: londonVideo, name: "London" },
];

const Featured = () => {
  const navigate = useNavigate();
  const { data, loading } = useFetch(
    "/hotels/countByCity?cities=madrid,berlin,london"
  );

  const handleSearch = (e) => {
    let destination =
      e.currentTarget.firstElementChild.nextElementSibling.firstElementChild
        .innerHTML;

    const dates = [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ];
    const options = {
      adult: undefined,
      children: undefined,
      room: undefined,
    };

    navigate("/hotels", {
      state: { destination, dates, options },
    });
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <h1 className="w-full max-w-5xl text-xl font-bold mt-6">
        Properties by City
      </h1>
      <div className="w-full max-w-5xl flex justify-between gap-5 z-1 place-items-center">
        {loading ? (
          <Skeleton type="feedCity" />
        ) : (
          <>
            {data &&
              videos.map((item, index) => (
                <div
                  key={index}
                  className="relative text-white rounded-xl h-[250px] overflow-hidden flex-1 hover:cursor-pointer"
                  onClick={handleSearch}
                >
                  <video
                    className="w-full h-full object-cover  hover:scale-105 transition-all"
                    autoPlay
                    loop
                    muted
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                  <div className="absolute bottom-[20px] left-[20px] font-bold text-2xl bg-primaryLight p-2 rounded-xl bg-opacity-70">
                    <h2>{item.name}</h2>
                    {data[index] === 1 ? (
                      <h3>{data[index]} property</h3>
                    ) : (
                      <h3>{data[index]} properties</h3>
                    )}
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Featured;
