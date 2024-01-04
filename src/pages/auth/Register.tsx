import React from 'react';
import { Link } from 'react-router-dom';
import { IonContent, IonPage, IonButton } from '@ionic/react';
import axios from '../../services/axios';
import '../../styles/pages/auth/login.scss';
import { toast } from 'react-toastify';
import { registerSchema } from '../../services/validations';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
const Login: React.FC = () => {
  const navigate = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit = async (formData: any) => {
    const { data, status } = await axios.post('Author/create', {...formData,role:"User"});
    if (status === 200 || status === 201) {
      toast.success('User registered successfully');
      navigate.goBack();
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
              <h4>Register</h4>
              <p>Lorem Ipsum is simply dummy text of the printing</p>
            </div>
            <div className="app-page-login-form-wrapper">
              <form className="app-page-login-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="app-page-login-form-field">
                  <input type={"text"} placeholder="Enter your First Name" {...register('first_name')} />
                  <img className="form-field-icon-left" src="/assets/images/user.svg" />
                  {errors.first_name && (
                    <p className="error-message">
                      <img className="error-icon" src="/assets/images/exclamation-mark.svg"/>
                      <span>
                        {errors?.first_name.message}
                      </span>
                    </p>
                  )}
                </div>
                <div className="app-page-login-form-field">
                  <input type={"text"} placeholder="Enter your Last Name" {...register('last_name')} />
                  <img className="form-field-icon-left" src="/assets/images/user.svg" />
                </div>
                <div className="app-page-login-form-field">
                  <input type={"email"} placeholder="Enter your email"    {...register('email')} />
                  <img className="form-field-icon-left" src="/assets/images/email.svg" />
                  
                  {errors.email && (
                    <p className="error-message">
                      <img className="error-icon" src="/assets/images/exclamation-mark.svg"/>
                      <span>
                        {errors.email.message}
                      </span>
                    </p>
                  )}
                </div>
                <div className="app-page-login-form-field">
                  <input type={"number"} placeholder="Enter your Contact Number"    {...register('phonenumber')} />
                  <img className="form-field-icon-left" src="/assets/images/telephone.svg" />
                  
                  {errors.phonenumber && (
                    <p className="error-message">
                      <img className="error-icon" src="/assets/images/exclamation-mark.svg"/>
                      <span>
                        {errors.phonenumber.message}
                      </span>
                    </p>
                  )}
                </div>
                <div className="app-page-login-form-field">
                  <input type={"password"} placeholder="Enter your password"    {...register('password')} />
                  <img className="form-field-icon-left" src="/assets/images/lock.svg" />
               
                  {errors.password && (
                    <p className="error-message">
                      <img className="error-icon" src="/assets/images/exclamation-mark.svg"/>
                      <span>
                        {errors.password.message}
                      </span>
                    </p>
                  )}
                </div>
                <div className="app-page-login-form-field">
                  <input type={"password"} placeholder="Confirm your Password"    {...register('confirmPassword')} />
                  <img className="form-field-icon-left" src="/assets/images/lock.svg" />
                  {errors.confirmPassword && (
                    <p className="error-message">
                      <img className="error-icon" src="/assets/images/exclamation-mark.svg"/>
                      <span>
                        {errors.confirmPassword.message}
                      </span>
                    </p>
                  )}
                </div>
                <div className="app-page-login-form-button">
                  <IonButton className="app-custom-button" fill="solid" color="primary" type='submit' shape="round">Register</IonButton>
                </div>
                <div className="app-page-auth-optional app-page-auth-optional-register">
                    <p>Already an user? <Link to="/login">Login</Link></p>
                </div>
              </form>
              {/* <div className="app-page-login-or-divider">
                <span>Or</span>
              </div>
              <div className="app-login-google">
                <IonButton fill="solid" color="white" shape="round">
                  <img src="/assets/images/google.svg" />
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