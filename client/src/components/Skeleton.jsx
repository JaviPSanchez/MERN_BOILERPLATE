import React from "react";
import { Oval } from "react-loader-spinner";

export default function Skeleton({ type }) {
  const COUNTER_CITY = 3;
  const COUNTER_PROPERTY = 5;
  const COUNTER_LOVE = 4;
  const FeedSkeletonCity = () => (
    <div
      key={crypto.randomUUID()}
      className="rounded-xl h-[250px] flex-1 bg-darkGrey bg-opacity-20 animate-pulse"
    ></div>
  );
  const FeedSkeletonProperty = () => (
    <div
      key={crypto.randomUUID()}
      className="rounded-xl h-[250px] flex-1 bg-darkGrey bg-opacity-20 animate-pulse"
    ></div>
  );
  const FeedSkeletonLove = () => (
    <div
      key={crypto.randomUUID()}
      className="rounded-xl h-[250px] flex-1 bg-darkGrey bg-opacity-20 animate-pulse"
    ></div>
  );

  const Circle = () => (
    <div className="w-full flex items-center justify-center h-[250px]">
      <Oval color="#003580" secondaryColor="#eeeeee" width={60} height={60} />
    </div>
  );

  if (type === "feedCity")
    return Array.from({ length: COUNTER_CITY }, (_, index) => (
      <FeedSkeletonCity key={index} />
    ));
  if (type === "feedProperty")
    //Array(COUNTER_PROPERTY).fill(<FeedSkeletonProperty />); --> Evitar problema de index key
    //Tambien podríamos hacer {[...Array(10)].map((_, index) => <FeedSkeletonProperty key={index} />)}
    return Array.from({ length: COUNTER_PROPERTY }, (_, index) => (
      <FeedSkeletonProperty key={index} />
    ));
  if (type === "feedLove")
    return Array.from({ length: COUNTER_LOVE }, (_, index) => (
      <FeedSkeletonLove key={index} />
    ));
  if (type === "circle") return <Circle />;
}
