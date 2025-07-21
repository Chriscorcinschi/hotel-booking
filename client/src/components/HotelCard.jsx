import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";


const HotelCard = ({room, index }) => {
  return (
    <Link to={`/rooms/${room._id}`} onClick={()=> scrollTo(0,0)} key={room._id} className="relative max-w-70 w-full rounded-0 overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.050)]">
        <img src={room.images[0]} alt="" />
       {index % 2 === 0 && <p className="px-3 py absolute top-3 left-3 text-xs bg-white font-medium text-gray-800 rounded-full" >Best Seller</p>}

        <div className="p-4 pt-5">
            <div className="flex items-center justify-between">

                <p className="font-playfair text-xl font-medium text-gray-800">{room.hotel.name}</p>

                <div className="flex items-center gap-1">
                    <img src={assets.starIconFilled} alt='star-icon'/> 4.5
                 </div>
            </div>

            <div className="flex items-center gap-1 text-sm">
                <img src={assets.locationIcon} alt='location-icon'/>
                <span>{room.hotel.address}</span>
            </div>

            <div className="flex items-center justify-between mt-6 ">
                <p className="text-xl font-medium text-gray-800">€ {room.pricePerNight}/Night</p>
                <button className="text-gray-500 px-4 py-2 text-sm font-medium border border-gray-300 rounded  hover:bg-black hover:text-white hover:border-black active:scale-95 trasition-all cursor-pointer duration-300">Book Now</button>
            </div>
        </div>
    </Link>
  );
}

export default HotelCard;