import React from 'react';
import {IonMenuToggle, IonButton, IonRippleEffect } from '@ionic/react';
import '../styles/layouts/header.scss';
import { Link } from 'react-router-dom';
function Header() {
  return (
    <>
    <div className="app-layout-header">
        <ul>
            <li>
                <IonMenuToggle>
                    <IonButton size="small" fill="clear">
                        <img src="/assets/images/menu-trigger.svg"/>
                    </IonButton>
                </IonMenuToggle>
            </li>
            <li>
                <Link to="/notifications">
                    <IonButton size="small" fill="clear">
                        <div className="notification-bell">
                            <img src="/assets/images/notification-icon.svg"/>
                            <span></span>
                        </div>
                    </IonButton>
                </Link>
            </li>
        </ul>
    </div>
    </>
  );
}
export default Header;