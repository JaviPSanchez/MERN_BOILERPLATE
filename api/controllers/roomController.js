import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

// CREATE ROOM

export const createRoom = async (req, res, next) => {
  //We send hotel id:
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    //Guardamos la room
    const savedRoom = await newRoom.save();
    //Update hotel:
    try {
      //buscamos el hotel y metemos el id de la room
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    //Enviamos la room:
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

// UPDATE ROOM

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

// UPDATE ROOM AVAILABILITY

export const updateRoomAvailability = async (req, res, next) => {
  console.log(req.body);
  try {
    await Room.updateOne(
      //We are only updating roomNumber
      { "roomNumbers._id": req.params.id },
      {
        //To updated nested properties we have to use the $, that is how Mongo Works
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

// DELETE ROOM

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

// GET ROOM

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

// GET ALL ROOMS

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
