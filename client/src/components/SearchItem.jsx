import styles from "../styles/Global";

import { Link, useNavigate } from "react-router-dom";

const SearchItem = ({ item }) => {
  console.log(item);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/hotels/${item._id}`);
  };

  return (
    <>
      {item ? (
        <div className={styles.searchItem}>
          {item.photos ? (
            <img src={item.photos} alt="" className={styles.siImg} />
          ) : (
            <span>No Photo</span>
          )}
          <div className={styles.siDesc}>
            <h1 className={styles.siTitle}>{item.name}</h1>
            <span className={styles.siDistance}>{item.distance}</span>
            <span className={styles.siTaxiOp}>Free airport taxi</span>
            <span className={styles.siSubTitle}>
              Studio Apartment with Air conditioning
            </span>
            <span className={styles.siFeatures}>{item.desc}</span>
            <span className={styles.siCancelOp}>Free cancellation </span>
            <span className={styles.siCancelOpSubtitle}>
              You can cancel later, so lock in this great price today!
            </span>
          </div>
          <div className={styles.siDetails}>
            {item.rating && (
              <div className={styles.siRating}>
                <span>Excellent</span>
                <button>{item.rating}</button>
              </div>
            )}
            <div className={styles.siDetailTexts}>
              <span className={styles.siPrice}>${item.cheapestPrice}</span>
              <span className={styles.siTaxOp}>Includes taxes and fees</span>
              <Link to={`/hotels/${item._id}`}>
                <button onClick={handleSearch} className={styles.siCheckButton}>
                  See availability
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.searchItem}>NO DATA</div>
      )}
    </>
  );
};

export default SearchItem;
