import React from 'react';
import {Link} from 'react-router-dom'
import {IonMenuToggle, IonButton } from '@ionic/react';
import '../styles/layouts/footer.scss';
function Footer() {
  return (
    <>
    <div className="app-layout-footer">
        <ul>
            <li>
                <Link to="/home">
                    <IonButton className="footer-link-active" size="small" fill="clear">
                        <div className="app-layout-footer-link-wrapper">
                            <img className="footer-default-icon" src="/assets/images/footer/home.svg"/>
                            <img className="footer-active-icon" src="/assets/images/footer/home-active.svg"/>
                            <span>Home</span>
                        </div>
                    </IonButton>
                </Link>
            </li>
            <li>
                <Link to="/bookings">
                    <IonButton size="small" fill="clear">
                        <div className="app-layout-footer-link-wrapper">
                            <img className="footer-default-icon" src="/assets/images/footer/calendar.svg"/>
                            <img className="footer-active-icon" src="/assets/images/footer/calendar.svg"/>
                            <span>Bookings</span>
                        </div>
                    </IonButton>
                </Link>
            </li>
            <li>
                <Link to="/wishlist">
                    <IonButton size="small" fill="clear">
                        <div className="app-layout-footer-link-wrapper">
                            <img className="footer-default-icon" src="/assets/images/footer/heart.svg"/>
                            <img className="footer-active-icon" src="/assets/images/footer/heart.svg"/>
                            <span>Wishlist</span>
                        </div>
                    </IonButton>
                </Link>
            </li>
            <li>
                <Link to="/profile">
                    <IonButton size="small" fill="clear">
                        <div className="app-layout-footer-link-wrapper">
                            <img className="footer-default-icon" src="/assets/images/footer/user.svg"/>
                            <img className="footer-active-icon" src="/assets/images/footer/user.svg"/>
                            <span>Profile</span>
                        </div>
                    </IonButton>
                </Link>
            </li>
        </ul>
    </div>
    </>
  );
}
export default Footer;