import React from 'react';
import { IonContent, IonPage, IonButton, IonLoading } from '@ionic/react';
import axios from '../services/axios';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgotPasswordSchema } from '../services/validations';
const ForgotPassword: React.FC = () => {
  const navigate = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });
  const onSubmit = async (formData: any) => {
    const { data, status } = await axios.post(
        `/Author/forgot-password/`,{email: formData.email}
      );
      if (data.success) {
        navigate.push(`/email-sent/${formData.email}`);
      }
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="app-page-login">
          <div className="app-page-login-logo">
            <img src='/assets/images/logo.svg' />
          </div>
          <div className="app-page-login-content">
            <div className="app-page-login-content-heading">
              <h4>Forgot Password</h4>
              <p>Enter your email to send the link</p>
            </div>
            <div className="app-page-login-form-wrapper">
              <form className="app-page-login-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="app-page-login-form-field">
                        <input
                        type={'email'}
                        placeholder="Enter your Email"
                        {...register('email')}
                        />
                        <img
                        className="form-field-icon-left"
                        src="/assets/images/email.svg"
                        />
                        {errors.email && (
                        <div className="error-message">
                        {errors.email.message}
                        </div>
                        )}
                    </div>
                    <div className="app-page-login-form-button">
                        <IonButton className="app-custom-button" fill="solid" color="primary" type='submit' shape="round">Submit</IonButton>
                    </div>
              </form>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword