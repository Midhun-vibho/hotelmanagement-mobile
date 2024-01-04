import React from 'react';
import { 
  IonButton,
  IonContent,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';
import "../styles/layouts/side-menu.scss";
import { Link, useHistory } from 'react-router-dom';
import { getLoggedUserData } from '../services/auth';
function SideMenu() {
  const history = useHistory();
  const loggedUserData = getLoggedUserData();
  return (
    <>
      <IonMenu contentId="main-content">
        <IonContent>
          <div className="app-layout-sidemenu">
              <div className="app-layout-sidemenu-profile">
                  <div className="app-layout-sidemenu-profile-image">
                    <img src="/assets/images/sidebar/default-user.svg"/>
                  </div>
                  <div className="app-layout-sidemenu-profile-details">
                    <h4>{loggedUserData?.first_name} {loggedUserData?.last_name}</h4>
                    <Link to="/profile">
                      <IonButton fill="clear">Edit Profile</IonButton>
                    </Link>
                  </div>
                  <div className="app-layout-sidemenu-close">
                    <IonMenuToggle>
                      <IonButton fill="clear">
                        <img src="/assets/images/sidebar/close.svg"/>
                      </IonButton>
                    </IonMenuToggle>  
                  </div>
              </div>
          </div>
          <div className="app-layout-sidemenu-links">
              <ul className="app-layout-sidemenu-links-list">
                <li className="app-layout-sidemenu-links-list-item">
                  <Link to="/bookings">
                    <IonButton fill="clear">
                      <div className="app-layout-sidemenu-links-wrapper">
                          <img src="/assets/images/sidebar/my-bookings.svg"/>
                          <span>My Bookings</span>
                      </div>
                    </IonButton>
                  </Link>
                </li>
                <li className="app-layout-sidemenu-links-list-item">
                  <Link to="/wishlist">
                    <IonButton fill="clear">
                      <div className="app-layout-sidemenu-links-wrapper">
                          <img src="/assets/images/sidebar/saved-hotels.svg"/>
                          <span>Saved Hotels</span>
                      </div>
                    </IonButton>
                  </Link>
                </li>
                <li className="app-layout-sidemenu-links-list-item">
                  <Link to="/notifications">
                    <IonButton fill="clear">
                      <div className="app-layout-sidemenu-links-wrapper">
                          <img src="/assets/images/sidebar/notifications.svg"/>
                          <span>Notifications</span>
                      </div>
                    </IonButton>
                  </Link>
                </li>
                <li className="app-layout-sidemenu-links-list-item">
                  <IonButton fill="clear">
                    <div className="app-layout-sidemenu-links-wrapper">
                        <img src="/assets/images/sidebar/helpcenter.svg"/>
                        <span>Help Center</span>
                    </div>
                  </IonButton>
                </li>
                <li className="app-layout-sidemenu-links-list-item">
                  <IonButton fill="clear">
                    <div className="app-layout-sidemenu-links-wrapper">
                        <img src="/assets/images/sidebar/privacypolicy.svg"/>
                        <span>Privacy Policy</span>
                    </div>
                  </IonButton>
                </li>
                <li className="app-layout-sidemenu-links-list-item">
                  <IonButton fill="clear">
                    <div className="app-layout-sidemenu-links-wrapper">
                        <img src="/assets/images/sidebar/privacypolicy.svg"/>
                        <span>Cookie Policy</span>
                    </div>
                  </IonButton>
                </li>
                <li className="app-layout-sidemenu-links-list-item">
                  <IonButton fill="clear">
                    <div className="app-layout-sidemenu-links-wrapper">
                        <img src="/assets/images/sidebar/privacypolicy.svg"/>
                        <span>Terms of Use</span>
                    </div>
                  </IonButton>
                </li>
                <li className="app-layout-sidemenu-links-list-item">
                  
                    <IonButton fill="clear" onClick={() => {
                      localStorage.clear();
                      history.push("/login")
                    }}>
                      <div className="app-layout-sidemenu-links-wrapper">
                          <img src="/assets/images/sidebar/logout.svg"/>
                          <span>Logout</span>
                      </div>
                    </IonButton>
               
                </li>
              </ul>
          </div>
        </IonContent>
      </IonMenu>
      
    </>
  );
}
export default SideMenu;