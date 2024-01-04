import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../styles/components/offer-slider.scss";
import "../styles/components/property-slider.scss"
import { Pagination } from "swiper";
import "../styles/components/offer-slider.scss";
const OfferSlider: React.FC = () => {
    return (
      <>
        <div className="app-component-offer-slider">
            <Swiper
                slidesPerView={1}
                className="mySwiper"
                pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
            autoplay={true}
                >
                <SwiperSlide>
                    <div className="app-component-offer-slider-image">
                        <img src="/assets/images/offer-banner.png"/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="app-component-offer-slider-image">
                        <img src="/assets/images/offer-banner.png"/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="app-component-offer-slider-image">
                        <img src="/assets/images/offer-banner.png"/>
                    </div>
                </SwiperSlide>
            </Swiper>    
        </div>  
      </>
    )
};

export default OfferSlider;