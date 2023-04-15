import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../components/SearchItem";
import useFetch from "../hooks/useFetch";
import styles from "../styles/Global";
import { Oval } from "react-loader-spinner";

const ListByCity = () => {
  //Para usar los states que pasamos de Header
  const location = useLocation();
  console.log(location);
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  // const { data, loading, error, reFetch } = useFetch(
  //   `/hotels/getAllHotelsByCity?city=${destination}&min=${min || 0}&max=${
  //     max || 999
  //   }`
  // );
  const { data, loading, error, reFetch } = useFetch(
    `/hotels/getAllHotelsByCity?city=${destination}`
  );

  // console.log(data);

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header />
      <div className="flex justify-center mt-5">
        <div className="listWrapper w-full max-w-5xl flex gap-5">
          <div
            className={`flex-1 max-w-[330px] bg-yellow p-5 rounded-xl sticky top-6 h-fit max-h-fit, ${styles.listSearch}`}
          >
            <h1 className="text-2xl text-[#555555] mb-5">Search</h1>
            <div className={styles.lsItem}>
              <label>Destination</label>
              <input
                placeholder={destination}
                onChange={(e) => setDestination(e.target.value)}
                type="text"
              />
            </div>
            <div className={styles.lsItem}>
              <label className=" text-md">Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className={styles.lsItem}>
              <label>Options</label>
              <div className="p-2">
                <div className={styles.lsOptionItem}>
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className={styles.lsOptionInput}
                  />
                </div>
                <div className={styles.lsOptionItem}>
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className={styles.lsOptionInput}
                  />
                </div>
                <div className={styles.lsOptionItem}>
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className={styles.lsOptionInput}
                    placeholder={options.adult}
                  />
                </div>
                <div className={styles.lsOptionItem}>
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className={styles.lsOptionInput}
                    placeholder={options.children}
                  />
                </div>
                <div className={styles.lsOptionItem}>
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className={styles.lsOptionInput}
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
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
      </div>
    </div>
  );
};

export default ListByCity;
