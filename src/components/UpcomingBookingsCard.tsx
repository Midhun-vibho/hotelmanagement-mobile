import { IonButton } from "@ionic/react";
import { Link, useHistory } from "react-router-dom";
import { apiBaseUrl } from "../services/axios";
import "../styles/components/booking-card.scss";
import { getSavedPricePercentage } from "../utilities/Costs";
import { formatDateDDDMMMFromString } from "../utilities/DateFormat";
import { Button } from "@mui/material";
const UpcomingBookingsCard = ({ booking, hotelInformation , selectedTab,handleCancelBooking}: any) => {
    const history  = useHistory();
    console.log(hotelInformation)
    return (
        <>
        <div className="app-component-booking-card app-component-booking-checkout-card">
                <div className="app-bookings-card-content">
                    <div className="app-comzponent-booking-card-image">
                        <img className="app-comzponent-booking-card-image-content" onClick={() => {history.push(`/hotel-inner/${hotelInformation.hotel_id._id}`)}} src={
                            apiBaseUrl +
                            hotelInformation.hotel_id.banner_image
                        } />
                        {/* <IonButton>
                            <img src="/assets/images/wishlist-white.svg" />
                        </IonButton> */}
                    </div>
                    <div className="app-bookings-card-info" style={{margin:'15px'}}>
                        <div className="app-comoponent-property-card-details">
                            <div className="property-card-details-heading">
                                <div className="property-card-details-info">
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                        <div style={{ fontWeight: 500 }}>{hotelInformation.hotel_id.title}</div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                                            <img style={{ width: "13px", height: "13px", backgroundColor: "grey", padding: "2px", borderRadius: "50%" }} src="/assets/images/star.svg" />
                                            <span style={{ fontWeight: 500, fontSize: "12px", color: "grey" }}>
                                                {hotelInformation.hotel_id.rating_standard}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ color: "grey", fontSize: "10px", fontWeight: 400, marginTop: "10px" }}>
                                        {/* <FaCalendarCheck /> */}
                                        <span >BOOKING MADE ON</span>
                                        <span style={{ marginLeft: "4px" }}>{new Date(booking.confirmed_at).toDateString().toUpperCase()}</span>
                                    </div>

                                    <p>
                                        {hotelInformation.hotel_id.real_address}
                                    </p>
                                    <h6>{`${formatDateDDDMMMFromString(
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
                                        }`}</h6>
                                </div>

                            </div>
                            {booking.bookedrooms.map((room: any) => <div style={{ fontSize: "12px", fontWeight: 500, marginTop: "10px" }}>
                                <span>ROOM</span>
                                <span style={{ marginLeft: "4px" }}>{String(room.details.name).toUpperCase()}</span>
                                <span style={{ backgroundColor: "rgb(209, 209, 209)", padding: "0px 6px", marginLeft: "10px", borderRadius: "4px" }}>{room.no_of_rooms}</span>
                            </div>)}
                            <div style={{ fontSize: "14px", marginTop: "8px", color: "grey" }}>{booking.instructions}</div>
                            <div>
                                <p>
                                    {hotelInformation.hotel_id.ReviewsCount
                                        ? `${hotelInformation.hotel_id.ReviewsCount} Reviews`
                                        : ''}
                                </p>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginTop: "8px", marginBottom: "8px" }}>
                                <span style={{ color: "rgb(40, 40, 40)", fontWeight: 500, fontSize: "14px" }}>Booking Amount</span>
                                <span style={{ color: "rgb(40, 40, 40)", fontSize: "14px", fontWeight: 500, marginLeft: "10px", marginRight: "5px" }}>
                                    {`₹ ${booking.discount + booking.total_paid}`}
                                </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginTop: "8px", marginBottom: "8px" }}>
                                <span style={{ color: "grey", fontWeight: 500, fontSize: "12px" }}>Discount</span>
                                <span style={{ color: "#069e20", fontSize: "12px", fontWeight: 500, marginLeft: "10px", marginRight: "5px" }}>
                                    {`₹ ${booking.discount}`}
                                </span>
                                {booking.discount ? <span style={{ color: "white", backgroundColor: "rgb(173, 173, 173)", fontSize: "9px", padding: "3px 7px" }}>
                                    {booking.promocode}
                                </span> : undefined}
                            </div>
                            <div className="property-card-details-price">
                                <div style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
                                    <span style={{ color: "#069e20", fontSize: "14px", marginRight: "10px" }}>{`₹ ${booking.total_paid}`}</span>
                                    <div style={{ display: "flex", alignItems: "center", gap: "4px", backgroundColor: "#069e20", color: "white", padding: "4px 7px", borderRadius: "20px", fontSize: "12px" }}>
                                        {/* <RiVerifiedBadgeFill style={{ width: "16px", height: "16px" }} /> */}
                                        Paid
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="app-bookings-card-buttons">
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
                </div> */}
                <div className="app-component-booking-checkin-btn" style={{marginBottom:'50px'}}>
                    {selectedTab == 0 && <IonButton id="checkin-modal" class="app-custom-button" shape="round" fill="solid" color="primary" onClick={() => {handleCancelBooking(booking._id)}}>
                        Cancel Booking
                    </IonButton>}
                </div>
                {/* <div className="app-bookings-card-sticker">
                    <p>{`Booking ID: ${booking._id}`}</p>
                </div> */}
            </div>
        </>
    )
}
export default UpcomingBookingsCard;