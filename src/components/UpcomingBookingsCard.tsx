import { IonButton } from "@ionic/react";
import { Link, useHistory } from "react-router-dom";
import { apiBaseUrl } from "../services/axios";
import "../styles/components/booking-card.scss";
import { getSavedPricePercentage } from "../utilities/Costs";
import { formatDateDDDMMMFromString } from "../utilities/DateFormat";
const UpcomingBookingsCard = ({ booking, hotelInformation , selectedTab,handleCancelBooking}: any) => {
    const history  = useHistory();
    return (
        <>
        
                <div className="app-component-booking-card app-component-booking-checkout-card">
                    <div className="app-comzponent-booking-card-image">
                        <img className="app-comzponent-booking-card-image-content" onClick={() => {history.push(`/hotel-inner/${hotelInformation.hotel_id._id}`)}} src={
                            apiBaseUrl +
                            hotelInformation.hotel_id.banner_image
                        } />
                        {/* <IonButton>
                            <img src="/assets/images/wishlist-white.svg" />
                        </IonButton> */}
                    </div>
                    <div className="app-component-booking-card-content">
                        <div className="app-component-booking-card-heading">
                            <h3>{hotelInformation.hotel_id.title}</h3>
                            <p>{hotelInformation.hotel_id.real_address}</p>
                        </div>
                        <p className="app-component-booking-card-strip">{`${formatDateDDDMMMFromString(
                            booking.checkin_date,
                        )} - ${formatDateDDDMMMFromString(
                            booking.checkout_date,
                        )} | ${booking.no_of_adults} ${booking.no_of_adults > 1
                                ? 'Adults'
                                : 'Adult'
                            } | ${booking.no_of_chlidrens} ${booking.no_of_chlidrens > 1
                                ? 'Childrens'
                                : 'Children'
                            } | ${booking.no_of_rooms} ${booking.no_of_rooms > 1
                                ? 'Rooms'
                                : 'Room'
                            }`}</p>


                        <div className="app-component-booking-card-reviews">
                            <div className="app-page-hotel-inner-info-reviews">
                                <div className="app-page-hotel-inner-info-reviews-content"><img src="/assets/images/star.svg" /><span> {
                                    hotelInformation.hotel_id
                                        .rating_standard
                                }</span></div>
                                <p> {hotelInformation.hotel_id.ReviewsCount
                                    ? `${hotelInformation.hotel_id.ReviewsCount} Reviews`
                                    : ''}</p>
                            </div>
                        </div>
                        <div className="app-component-booking-card-pricing">
                            <div className="app-component-property-card-details">
                                <ul>
                                    <li>
                                        <h3>{`₹ ${hotelInformation.hotel_id.price}`}</h3>
                                    </li>
                                    <li>
                                        {hotelInformation.hotel_id.selling_price &&
                                            hotelInformation.hotel_id.price !==
                                            hotelInformation.hotel_id
                                                .selling_price && (
                                                <h4>{`₹ ${hotelInformation.hotel_id.selling_price}`}</h4>
                                            )}

                                    </li>
                                    <li>
                                        {hotelInformation.hotel_id.selling_price &&
                                            hotelInformation.hotel_id.price !==
                                            hotelInformation.hotel_id
                                                .selling_price && (
                                                <h2>{`${getSavedPricePercentage(
                                                    hotelInformation.hotel_id.price,
                                                    hotelInformation.hotel_id
                                                        .selling_price,
                                                )}% Off`}</h2>
                                            )}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <ul className="app-component-booking-card-buttons-list">
                            <li>
                                <IonButton className="app-grey-btn"  onClick={() => {history.push(`/hotel-inner/${hotelInformation.hotel_id._id}`)}}>
                                    <div className="app-button-has-icon-inner">
                                        <img src="/assets/images/customer-support.svg" />
                                        <span>Need Help</span>
                                    </div>
                                </IonButton>
                            </li>
                            <li>
                                <IonButton className="app-primary-btn"  onClick={() => {history.push(`/hotel-inner/${hotelInformation.hotel_id._id}`)}}>
                                    <div className="app-button-has-icon-inner">
                                        <img src="/assets/images/pin-primary.svg" />
                                        <span>View Map</span>
                                    </div>
                                </IonButton>
                            </li>
                        </ul>
                    </div>
                    <div className="app-component-booking-checkin-btn">
                       {selectedTab == 0 && <IonButton id="checkin-modal" class="app-custom-button" shape="round" fill="solid" color="primary" onClick={() => {handleCancelBooking(booking._id)}}>
                            Cancel Booking
                        </IonButton>}
                    </div>
                </div>
          
        </>
    )
}
export default UpcomingBookingsCard;