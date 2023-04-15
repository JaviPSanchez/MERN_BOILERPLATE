import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  updateHotel,
  getAllFeaturedHotels,
  getAllHotelsByCity,
  getHotelRooms,
} from "../controllers/hotelController.js";

const router = express.Router();

//CREATE

router.post("/", createHotel);

//UPDATE

router.put("/:id", updateHotel);

//DELETE

router.delete("/:id", deleteHotel);

//GET

router.get("/find/:id", getHotel);

//GET ALL

router.get("/", getAllHotels);

//GET ALL HOTELS BY CITY

router.get("/getAllHotelsByCity", getAllHotelsByCity);

//GET ALL FEATURED HOTELS

router.get("/getAllFeaturedHotels", getAllFeaturedHotels);

// COUNT HOTELS BY CITY

router.get("/countByCity", countByCity);

// COUNT HOTELS BY TYPE

router.get("/countByType", countByType);

// ROOM BY HOTEL

router.get("/room/:id", getHotelRooms);

export default router;
