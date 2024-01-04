import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import PropertyCard from "./PropertyCard";
import "../styles/components/property-slider.scss"
const PropertySlider: React.FC = () => {
    return (
        <>
        <div className="app-component-property-slider">
            <Swiper
            slidesPerView={1.6}
            spaceBetween={20}
            className="mySwiper"
            >
            <SwiperSlide>
                <PropertyCard/>
            </SwiperSlide>
            <SwiperSlide>
                <PropertyCard/>
            </SwiperSlide>
            <SwiperSlide>
                <PropertyCard/>
            </SwiperSlide>
            <SwiperSlide>
                <PropertyCard/>
            </SwiperSlide>
            </Swiper>
        </div>
      </>
    )
};

export default PropertySlider;