import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IonContent, IonPage, IonButton, IonLoading } from '@ionic/react';
import axios from '../../services/axios';
import '../../styles/pages/auth/login.scss';
import { setCookie, setLocalStorageItem } from '../../services/cookieHandling';
import { loginSchema } from '../../services/validations';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
const Login: React.FC = () => {
  const [eyeToggle, setEyeToggle] = useState(false)
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = async (formData: any) => {
    setShowLoading(true);
    const { data, status } = await axios.post('Author/login', { ...formData, role: "User" });
    if (status === 200 || status === 201) {
      setCookie('token', data?.Token);
      setCookie('logged_user_responce', JSON.stringify(data?.results));
      setCookie('logged_user_id', data?.results.id);
      setLocalStorageItem('token', data?.Token);
      setLocalStorageItem('refresh_token', data?.refreshToken);
      setLocalStorageItem('logged_user_data', JSON.stringify(data?.results));
      setShowLoading(false);
      navigate.push('/home');
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
              <h4>Login</h4>
              <p>Lorem Ipsum is simply dummy text of the printing</p>
            </div>
            <div className="app-page-login-form-wrapper">
              <form className="app-page-login-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="app-page-login-form-field">
                  <input type={"email"} placeholder="Enter your email" {...register('email')} />
                  <img className="form-field-icon-left" src="/assets/images/email.svg" />
                  {errors.email && (
                    <p className="error-message">
                      <img className="error-icon" src="/assets/images/exclamation-mark.svg" />
                      <span>
                        {errors?.email.message}
                      </span>
                    </p>
                  )}
                </div>
                <div className="app-page-login-form-field">
                  <input type={eyeToggle ? "text" : "password"} placeholder="Enter your password"    {...register('password')} />
                  <img onClick={() => setEyeToggle(!eyeToggle)} className="form-field-icon-left" src="/assets/images/lock.svg" />
                  {/* <img className="form-field-icon-right" src="/assets/images/no-eye.svg" /> */}
                  {eyeToggle ?
                    <img onClick={() => setEyeToggle(!eyeToggle)} style={{ cursor: 'pointer' }} className="form-field-icon-right" src="/assets/images/no-eye.svg" /> :
                    <img onClick={() => setEyeToggle(!eyeToggle)} style={{ cursor: 'pointer' }} className="form-field-icon-right" src="/assets/images/eye-regular.svg" />}
                  {errors.password && (
                    <p className="error-message">
                      <img className="error-icon" src="/assets/images/exclamation-mark.svg" />
                      <span>
                        {errors.password.message}
                      </span>
                    </p>
                  )}
                </div>
                <div className="app-page-login-form-button">

                  <IonButton className="app-custom-button" fill="solid" color="primary" type='submit' shape="round">Login</IonButton>
                  <IonLoading
                    isOpen={showLoading}
                    onDidDismiss={() => setShowLoading(false)}
                    message="Loading..."
                    duration={3000}
                    spinner="circles"
                  />
                  <IonButton class="app-clear-button" fill="clear"><Link to='/forgot-password'>Forgot Password?</Link></IonButton>
                </div>
                <div className="app-page-auth-optional">
                  <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
              </form>
              {/* <div className="app-page-login-or-divider">
                <span>Or</span>
              </div>
              <div className="app-login-google">
                <IonButton fill="solid" color="white" shape="round">
                  <img src="/assets/images/google.svg"/>
                  <span>Continue with google</span>
                </IonButton>
              </div> */}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login