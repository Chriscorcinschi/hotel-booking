import React from "react";
import Title from "./Title";
import { testimonials } from "../assets/assets";
import StarRating from "./StarRating";

const Testimonial = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30">
      <Title title='What Our Guests Say' subTitle='Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accommodations around the world.'/>

      <div className="flex flex-wrap items-center justify-center gap-20 md:gap-20 lg:gap-18 pt-20">
            {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="text-sm w-80 border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5">
                    <div className="flex flex-col items-center px-5 py-4 relative">
                        <img className="h-24 w-24 absolute -top-14 rounded-full" 
                                src={testimonial.image} 
                                alt={testimonial.name} />

                        <div className="pt-8 text-center">
                            <p className="font-playfair text-xl">{testimonial.name}</p>
                            <p className="text-gray-500 text-xs">{testimonial.address}</p>
                        </div>
                    </div>
                    <p className="text-gray-500 px-6 text-center">{testimonial.review}</p>
                    <div className="flex justify-center pt-4">
                        <div className="flex gap-1">
                        <StarRating rating={testimonial.rating} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Testimonial;