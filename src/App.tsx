import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { ToastContainer } from 'react-toastify';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import 'react-toastify/dist/ReactToastify.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './styles/main.scss';
import Search from './pages/Search';
import HotelInner from './pages/HotelInner';
import Coupons from './pages/Coupons';
import Thankyou from './pages/Thankyou';
import Bookings from './pages/Bookings';
import HotelListing from './pages/HotelListing';
import Notification from './pages/Notification';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import { getLocalStorageItem } from './services/cookieHandling';
import { UserRoleContextConsumer } from './services/userAuthorization';
import PaymentForm from './components/StripePaymentForm';
import StripeCheckoutButton from './components/CheckOutForm';
import ForgotPassword from './pages/ForgotPassword';
import EmailSent from './pages/EmailSent';
setupIonicReact();

const App: React.FC = () => {
  const notLoggedIn = (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/forgot-password">
        <ForgotPassword />
      </Route>
      <Route exact path="/email-sent/:email">
        <EmailSent />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
    </Switch>
  )

  const loggedIn = (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/forgot-password">
        <ForgotPassword />
      </Route>
      <Route exact path="/search">
        <Search />
      </Route>
      <Route exact path="/hotel-listing">
        <HotelListing />
      </Route>
      <Route exact path="/hotel-inner/:id">
        <HotelInner />
      </Route>
      <Route exact path="/coupons">
        <Coupons />
      </Route>
      <Route exact path="/thankyou/:id">
        <Thankyou />
      </Route>
      <Route exact path="/bookings">
        <Bookings />
      </Route>
      <Route exact path="/wishlist">
        <Wishlist />
      </Route>
      <Route exact path="/notifications">
        <Notification />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/paymentform">
        <PaymentForm bookingId={null} />
      </Route>
      <Route exact path="/checkoutform">
        <StripeCheckoutButton />
      </Route>
    </Switch>
  )
  return <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <UserRoleContextConsumer>
          {(value: any) =>
            value?.isLoggedIn || localStorage.getItem("token")
              ? loggedIn
              : notLoggedIn
          }
        </UserRoleContextConsumer>



      </IonRouterOutlet>
    </IonReactRouter>
    <ToastContainer position="top-center" theme="colored" />
  </IonApp>
};

export default App;
