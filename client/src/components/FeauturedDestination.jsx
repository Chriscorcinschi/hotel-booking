import React from "react";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useAppContext } from "../Context/AppContext";

const FeaturedDestination = () => {
  const { rooms, navigate} = useAppContext();

  if (rooms.length === 0) return null;

  //rooms.length > 0 &&
  return(
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">

      <Title title='Feature Destination' subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences'/>

      <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
        {rooms.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>
      <button onClick={() => {navigate('/rooms'); scrollTo(0, 0);}}
      className="my-16 px-4 py-2 text-m font-medium border border-gray-300 rounded bg-white hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer duration-300">
        View All Destinations
      </button>
    </div>
  );
};
export default FeaturedDestination;

// !!!!  PER VEDERE LE CARD DEVO PRIMA FARE UN ARICAMENTO NELLA DASHOBOARD /OWNER !!!! 