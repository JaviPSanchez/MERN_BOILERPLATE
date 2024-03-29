import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import authUsers from "./routes/users.js";
import authHotels from "./routes/hotels.js";
import authRooms from "./routes/rooms.js";
import authProperty from "./routes/property.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

//Initial connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB!");
  } catch (error) {
    throw error;
  }
};
mongoose.set("strictQuery", true);

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", authUsers);
app.use("/api/hotels", authHotels);
app.use("/api/property", authProperty);
app.use("/api/rooms", authRooms);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
  next();
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

app.listen(process.env.PORT, () => {
  connect();
  console.log(`API Working! Listening in port ${process.env.PORT}`);
});
