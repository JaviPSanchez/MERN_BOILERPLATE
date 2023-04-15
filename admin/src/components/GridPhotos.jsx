import React from "react";
import { room1, room2, room3 } from "../assets/images/index";

export default function GridPhotos({ photos }) {
  console.log(photos);
  return (
    <div className="grid gap-4 grid-cols-3 auto-rows-auto">
      <img className="w-full h-full rounded-xl" src={room1} alt="error" />
      <img className="w-full h-full rounded-xl" src={room2} alt="error" />
      <img className="w-full h-full rounded-xl" src={room3} alt="error" />
    </div>
  );
}
