import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import authUsers from "./routes/users.js";
import authHotels from "./routes/hotels.js";
import authRooms from "./routes/rooms.js";
import authProperty from "./routes/property.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
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

app.get("/", (req, res) => {
  res.send("Hello!");
});

//Middlewares
app.use(
  cors({
    origin: "*",
  })
);
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
});

//En caso de problema de conexion
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});
//Si queremos comprobar la conexión:
// mongoose.connection.on("connected", () => {
//   console.log("mongoDB connected!");
// });

app.listen(8800, () => {
  connect();
  console.log("API Working!");
});
