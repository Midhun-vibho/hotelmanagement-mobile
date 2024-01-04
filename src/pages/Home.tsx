import { IonContent, IonButton, IonHeader, IonFooter, IonPage } from '@ionic/react';
import Header from '../layouts/Header';
import SideMenu from '../layouts/SideMenu';
import Footer from "../layouts/Footer";
import '../styles/pages/home.scss';
import PropertySlider from '../components/PropertySlider';
import OfferSlider from '../components/OfferSlider';
import Filter from '../components/Filter';
import { Link, NavLink } from 'react-router-dom';
import { getLoggedUserData } from '../services/auth';
import axios from '../services/axios';
import { useEffect, useState } from 'react';
import { setLocalStorageItem } from '../services/cookieHandling';
const Home: React.FC = () => {
    const [name,setName] = useState<any>('')
    const [propertyTypes, setPropertyTypes] = useState<{_id:string, title:string, icon: string}[]>([])

    const getProfile = async () => {
        const loggedUserData = getLoggedUserData();
        const { data, status } = await axios.get(
            `Author/view/${loggedUserData._id}`,
        );
        if (status === 200 || status === 201) {
            setName(data?.first_name+ ' '+ data?.last_name)
            setLocalStorageItem('logged_user_data', JSON.stringify(data));
      
        }
    };
    
    const getPropertyTypes = async () => {
        const { data, status } = await axios.get(`PropertyType/list`)
		if (status === 200 || status === 201) {
            setPropertyTypes(data?.results)
		}
	}
    useEffect(() => {
        getProfile();
        getPropertyTypes()
    }, []);
  return (
    <>
        <SideMenu />
            <IonPage id="main-content">
            {/* <IonHeader translucent={true} collapse="fade" className="ion-no-border">
                <div className="app-page-home-header">
                    <Header/>
                </div>
            </IonHeader> */}
            <IonContent fullscreen>
                <div className="app-page-home-search">
                    <div className="app-page-home-banner">
                        <IonHeader collapse="fade" className="ion-no-border">
                            <Header/>
                        </IonHeader>
                        <div className="app-page-home-banner-content">
                            <div className="app-page-home-search-heading">
                                <h1><span>Hey</span> {name},</h1>
                                <h2>Let’s find the <span>best hotel</span></h2>
                                <p>Lorem Ipsum is simply dummy text of the printing</p>
                            </div>
                            <div className="app-page-home-search-content">
                                <div className="app-page-home-search-wrapper">
                                    <div className="app-page-home-search-button">
                                        <Link to="/search">
                                        <IonButton  fill="clear">
                                            <div className="app-page-home-search-button-content">
                                                <img src="/assets/images/search-icon.svg"/>
                                                <span>Where you want to stay...</span>
                                            </div>
                                        </IonButton>
                                        </Link>
                                    </div>
                                    <div className="app-page-home-search-filter-button">
                                        <IonButton id="open-modal" fill="clear">
                                            <img src="/assets/images/filter-icon.svg"/>
                                        </IonButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="app-page-home-property-slider">
                        <h3 className="app-page-home-property-slider-heading">Near By Hotels</h3>
                        <div className="app-page-home-property-slider-content">
                            <PropertySlider/>
                        </div>
                    </div>
                    <div className="app-page-home-property-slider">
                        <h3 className="app-page-home-property-slider-heading">Recomended</h3>
                        <div className="app-page-home-property-slider-content">
                            <PropertySlider/>
                        </div>
                    </div> */}
                    <div className="app-page-home-offers">
                        <div className="app-page-home-offers-content">
                            <div className="app-page-home-offers-graphic">
                                <img src="/assets/images/offer-slider-graphic.svg"/>
                                <span>Exclusive Offers for you</span>
                            </div>
                            <div className="app-page-home-offers-slider">
                                <OfferSlider/>
                            </div>
                        </div>
                    </div>
                    <div className="app-page-home-referandearn">
                        <img src="/assets/images/refer-earn.png"/>
                    </div>
                    <div className="app-home-explorestay">
                        <h3 className="app-home-explorestay-slider-heading">Explore your stay</h3>
                        <div className="app-home-explorestay-content">
                            <ul className="app-home-explorestay-list">
                                {propertyTypes && propertyTypes.length > 0 && propertyTypes.slice(0,4).map(propertyType => (
                                <li className="app-home-explorestay-list-item">
                                    <NavLink to={`/hotel-listing?propertyTypes=${propertyType._id}`}>
                                    <div className="app-home-explorestay-card">
                                        <div className="app-home-explorestay-card-bg"></div>
                                        <img src={propertyType.icon} alt='explore pictures'/>
                                        <h3>{propertyType.title}</h3>
                                    </div>
                                    </NavLink>
                                </li>))}
                                
                                {/* <li className="app-home-explorestay-list-item">
                                    <div className="app-home-explorestay-card">
                                        <div className="app-home-explorestay-card-bg"></div>
                                        <img src="/assets/images/family.png"/>
                                        <h3>Families</h3>
                                    </div>
                                </li>
                                <li className="app-home-explorestay-list-item">
                                    <div className="app-home-explorestay-card">
                                        <div className="app-home-explorestay-card-bg"></div>
                                        <img src="/assets/images/chlld.png"/>
                                        <h3>Families</h3>
                                    </div>
                                </li>
                                <li className="app-home-explorestay-list-item">
                                    <div className="app-home-explorestay-card">
                                        <div className="app-home-explorestay-card-bg"></div>
                                        <img src="/assets/images/bussiness.png"/>
                                        <h3>Corporate</h3>
                                    </div>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* <Filter /> */}
            </IonContent>
            <IonFooter>
                <Footer />
            </IonFooter>
        </IonPage>
    </>
  );
};

export default Home;
