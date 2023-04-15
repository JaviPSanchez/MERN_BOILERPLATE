import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
// import { createError } from "../utils/error.js";

// CREATE

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

// UPDATE

export const updateHotel = async (req, res) => {
  console.log("updateHotel:", req.body);
  const obj = { ...req.body };
  // Delete empty filds
  Object.keys(obj).forEach((k) => obj[k] == "" && delete obj[k]);
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id, //filter
      {
        $set: obj,
      },
      { new: true } //Devolver el documento updated!
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

// DELETE

export const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndRemove(req.params.id);
    res.status(200).json("Hotel has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET HOTEL

export const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ALL HOTELS

export const getAllHotels = async (req, res, next) => {
  console.log("getAllHotels:", req.body);
  try {
    const allHotels = await Hotel.find();
    res.status(200).json(allHotels);
  } catch (err) {
    next(err);
  }
};

// GET ALL HOTELS BY CITY

export const getAllHotelsByCity = async (req, res, next) => {
  console.log("getAllHotelsByCity:", req.query);
  const cities = req.query.city.split(",");
  console.log(cities);
  try {
    const list = await Promise.all(
      cities.map((item) => {
        return Hotel.find({ city: item.toLowerCase() });
      })
    );

    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// GET ALL FEATURED HOTELS

export const getAllFeaturedHotels = async (req, res, next) => {
  console.log("getAllFeaturedHotels:", req.query);
  try {
    const hotels = await Hotel.find({
      featured: true,
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

// COUNT HOTELS BY CITY

export const countByCity = async (req, res, next) => {
  //Obtenemos el query, creando un array con el split method
  const cities = req.query.cities.split(",");
  console.log(cities);

  try {
    //Buscamos muchas ciudades, luego usamos una Promise.
    const list = await Promise.all(
      cities.map((item) => {
        //Este metodo es muy caro en recursos:
        // return Hotel.find({ city: item }).length;
        //Usamos un metodo de mongoDB
        return Hotel.countDocuments({ city: item });
      })
    );
    console.log(list);

    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// COUNT HOTELS BY TYPE

export const countByType = async (req, res, next) => {
  //Solo buscamos 5 tipos, luego podemos usar un fetch:
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

// HOTEL ROOMS

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((item, index) => {
        return Room.findById(item);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
