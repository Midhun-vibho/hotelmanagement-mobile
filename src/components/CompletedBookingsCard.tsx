import { IonButton } from "@ionic/react";
import { Link } from "react-router-dom";
import "../styles/components/booking-card.scss";
const CompletedBookingsCard: React.FC = () => {
    return (
        <>
            <div className="app-component-booking-card">
                <div className="app-comzponent-booking-card-image">
                    <img className="app-comzponent-booking-card-image-content" src="/assets/images/manali.jpg"/>
                    <IonButton>
                        <img src="/assets/images/wishlist-white.svg"/>
                    </IonButton>
                </div>
                <div className="app-component-booking-card-content">
                    <div className="app-component-booking-card-heading">
                        <h3>Casata Residency</h3>
                        <p>Near SLG Hospital, Kukatpally</p>
                    </div>
                    <p className="app-component-booking-card-strip">02 Feb - 03 Feb | 2 Adults | 1 Room</p>
                   
                    
                
                    <ul className="app-component-booking-card-buttons-list">
                        <li>
                            <IonButton className="app-grey-btn">
                                <div className="app-button-has-icon-inner">
                                    <img src="/assets/images/customer-support.svg"/>
                                    <span>Need Help</span>
                                </div>
                            </IonButton>
                        </li>
                        <li>
                            <IonButton className="app-primary-btn">
                                <div className="app-button-has-icon-inner">
                                    <img src="/assets/images/exchange.svg"/>
                                    <span>Book again</span>
                                </div>
                            </IonButton>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default CompletedBookingsCard;