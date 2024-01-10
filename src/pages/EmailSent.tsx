import React from 'react';
import { IonContent, IonPage, IonButton} from '@ionic/react';
import { useHistory, useParams } from 'react-router';

const EmailSent: React.FC = () => {
    const {email} = useParams<any>()
    const navigate = useHistory();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="app-page-login">
          <div className="app-page-login-logo">
            <img src='/assets/images/logo.svg' />
          </div>
          <div className="app-page-login-content">
            <div className="app-page-login-form-wrapper">
                <div className="login-card-wrapper">
                    <div className="app-page-email-card" style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                        <img src="/assets/images/mail-sent.svg" style={{margin:'auto'}}/>
                        <h1>Email sent successfully</h1>
                        <p>We&apos;ve sent a password reset email to</p>
                        <span>{email}</span>
                    </div>
                </div>
                <div className="app-page-login-form-button">
                    <IonButton className="app-custom-button" fill="solid" color="primary" onClick={() => {navigate.push('/login')}} shape="round">Go To Login</IonButton>
                </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EmailSent