import React, { useRef } from 'react';
import {
  IonButton,
  IonContent,
  IonModal,
} from '@ionic/react';

import '../styles/components/checkin-request.scss';

function CheckIn() {
  const modal = useRef<HTMLIonModalElement>(null);

  function dismiss() {
    modal.current?.dismiss();
  }

  return (
        <IonModal className="checkin-request-modal" ref={modal} trigger="checkin-modal">
          <IonContent>
              <div className="app-component-checkin-request">
                <img src="/assets/images/location-checked.svg"/>
                <h5>Check-In Request</h5>
                <p>Your Request was sent successfully</p>
                <IonButton  onClick={() => dismiss()} className="app-custom-button" shape="round" fill="outline">View Booking</IonButton>
              </div>
          </IonContent>
        </IonModal>
  );
}

export default CheckIn;