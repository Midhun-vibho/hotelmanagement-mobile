import { IonButton } from "@ionic/react";
import { Link } from "react-router-dom";
import { apiBaseUrl } from "../services/axios";
import { useHistory } from 'react-router';
import "../styles/components/booking-card.scss";

const WishlistCard = ({ favourite, handleRemove }: any) => {
    const navigate = useHistory();
    console.log(favourite)
    return (
        <>
            <div className="app-component-booking-card">
                <div className="app-comzponent-booking-card-image">
                    <img className="app-comzponent-booking-card-image-content" src={apiBaseUrl + favourite?.hotel_id?.banner_image} />
                </div>
                <div className="app-component-booking-card-content">
                    <div className="app-component-booking-card-heading">
                        <h3>{favourite?.hotel_id?.title}</h3>
                        <p>{favourite?.hotel_id?.real_address}</p>
                    </div>

                    <ul className="app-component-booking-card-buttons-list">
                        <li>
                            <IonButton className="app-grey-btn" onClick={() => { handleRemove(favourite._id) }}>
                                <div className="app-button-has-icon-inner">
                                    <img src="/assets/images/cross.svg" />
                                    <span>Remove</span>
                                </div>
                            </IonButton>
                        </li>
                        <li>
                            <IonButton className="app-primary-btn" onClick={() => { navigate.push(`/hotel-inner/${favourite.hotel_id._id}`) }}>
                                <div className="app-button-has-icon-inner">
                                    <img src="/assets/images/view.svg" />
                                    <span>View</span>
                                </div>
                            </IonButton>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default WishlistCard;