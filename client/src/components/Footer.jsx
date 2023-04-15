import styles from "../styles/Global";

const Footer = () => {
  return (
    <div className="w-full h-1/2 mt-12 bg-footer-pattern bg-cover bg-bottom">
      <div className="w-full flex flex-col items-center bg-primary bg-opacity-80 p-5 gap-5 text-white">
        <h1 className="text-3xl font-bold">Save time, save money!</h1>
        <span>Sign up and we'll send the best deals to you</span>
        <div className="[&>button]:h-[50px] [&>button]:p-2 [&>button]:bg-primaryLight [&>button]:text-white [&>button]:border-none [&>button]:rounded-xl [&>button]:cursor-pointer [&>input]:w-[300px] [&>input]:h-[30px] [&>input]:p-6 [&>input]:border-none [&>input]:mr-2 [&>input]:rounded-xl">
          <input type="text" placeholder="Your Email" />
          <button>Subscribe</button>
        </div>
        <div className="w-full bg-transparent w-5xl text-sm p-6">
          <div className={styles.fLists}>
            <ul className={styles.fList}>
              <li className={styles.fListItem}>Countries</li>
              <li className={styles.fListItem}>Regions</li>
              <li className={styles.fListItem}>Cities</li>
              <li className={styles.fListItem}>Districts</li>
              <li className={styles.fListItem}>Airports</li>
              <li className={styles.fListItem}>Hotels</li>
            </ul>
            <ul className={styles.fListItem}>
              <li className={styles.fListItem}>Homes </li>
              <li className={styles.fListItem}>Apartments </li>
              <li className={styles.fListItem}>Resorts </li>
              <li className={styles.fListItem}>Villas</li>
              <li className={styles.fListItem}>Hostels</li>
              <li className={styles.fListItem}>Guest houses</li>
            </ul>
            <ul className={styles.fListItem}>
              <li className={styles.fListItem}>Unique places to stay </li>
              <li className={styles.fListItem}>Reviews</li>
              <li className={styles.fListItem}>Unpacked: Travel articles </li>
              <li className={styles.fListItem}>Travel communities </li>
              <li className={styles.fListItem}>Seasonal and holiday deals </li>
            </ul>
            <ul className={styles.fListItem}>
              <li className={styles.fListItem}>Car rental </li>
              <li className={styles.fListItem}>Flight Finder</li>
              <li className={styles.fListItem}>Restaurant reservations </li>
              <li className={styles.fListItem}>Travel Agents </li>
            </ul>
            <ul className={styles.fListItem}>
              <li className={styles.fListItem}>Curtomer Service</li>
              <li className={styles.fListItem}>Partner Help</li>
              <li className={styles.fListItem}>Careers</li>
              <li className={styles.fListItem}>Sustainability</li>
              <li className={styles.fListItem}>Press center</li>
              <li className={styles.fListItem}>Safety Resource Center</li>
              <li className={styles.fListItem}>Investor relations</li>
              <li className={styles.fListItem}>Terms & conditions</li>
            </ul>
          </div>
          <div className="w-full flex justify-center text-xl text-white">
            Copyright 🚀 2022 JaviPSanchez.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
