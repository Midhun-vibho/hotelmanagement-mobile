import { IonButton } from '@ionic/react';

import React, { useEffect, useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";

import "../styles/components/property-card.scss";
import { Link } from 'react-router-dom';
import { getSavedPricePercentage } from '../utilities/Costs';
import { apiBaseUrl } from '../services/axios';
const PropertyCard = ({ property,
  filtering,
  locationId,
  locationTitle,
  handleAddFavourite }: any) => {
  const [searchParams, setSearchParams] = useState(null);
  const [isFavourite, setIsFavourite] = useState(
    property?.isFavourited > 0 ? true : false,
  );

  const createSearchParams = () => {
    const newSearchParams: any = new URLSearchParams();
    locationId && newSearchParams.append('locationId', locationId);
    locationTitle && newSearchParams.append('locationTitle', locationTitle);
    filtering.from && newSearchParams.append('from', filtering.from);
    filtering.to && newSearchParams.append('to', filtering.to);
    filtering.adults && newSearchParams.append('adults', filtering.adults);
    filtering.childrens && newSearchParams.append('childrens', filtering.childrens);
    filtering.rooms && newSearchParams.append('rooms', filtering.rooms);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    createSearchParams();
  }, [filtering, property]);
  const handleClickAddFavourite = async (evt: any) => {
    evt.preventDefault();
    evt.stopPropagation();
    setIsFavourite(!isFavourite);
    handleAddFavourite(property?._id);
  };
  return (
    <>
      <Link to={`/hotel-inner/${property._id}?${searchParams}`}>
        <div className="app-component-property-card">
          <div className="app-component-property-card-slider">
            <Swiper
              slidesPerView={1}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              autoplay={true}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="property-card-slider-image">
                  <img src={property?.banner_image} />
                </div>
              </SwiperSlide>

            </Swiper>
            <div className="property-card-rating">
              <img src="/assets/images/star.svg" />
              <span>{property?.rating_standard}</span>
            </div>
            <div className="property-card-fav-btn">
              <IonButton fill="clear" size="small" onClick={handleClickAddFavourite}>
                {!isFavourite && <img src="/assets/images/heart.svg" />}
                {isFavourite && <img src="/assets/images/heart-filled.svg" />}
              </IonButton>
            </div>
          </div>
          <div className="app-component-property-card-details">
            <h1>{property?.title}</h1>
            <p>{property?.real_address}</p>
            <ul>
              <li>
                <h3>{`₹ ${property?.selling_price}`}</h3>
              </li>


              {property?.selling_price &&
                property?.price !== property?.selling_price && (
                  <>
                    <li>
                      <h4>{`₹ ${property?.price}`}</h4>
                    </li>
                    <li>
                      <h2>{`${getSavedPricePercentage(
                        property?.selling_price,
                        property?.price,
                      )}% Off`}</h2>
                    </li>
                  </>
                )}
            </ul>
          </div>
        </div>
      </Link>
    </>
  )
};

export default PropertyCard;