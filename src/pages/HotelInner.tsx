import { IonContent, IonButton, IonHeader, IonFooter, IonPage, IonRippleEffect, IonModal, IonDatetime, IonItem, IonCheckbox, IonLabel } from '@ionic/react';
import '../styles/pages/hotel-inner.scss';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios, { apiBaseUrl } from '../services/axios';
import React from 'react';
import Search from './Search';
import { Autocomplete } from '@mui/material';
import { formatDateDDDMMM, stringDateToRangeObject } from '../utilities/DateFormat';
import DatePicker, { utils } from '@hassanmojab/react-modern-calendar-datepicker';
import BookingDetails from './BookingDetails';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

const prepareApiSearchParams = (
    searchParamFrom: any,
    searchParamTo: any,
    searchParamAdults: any,
    searchParamChildrens: any,
    searchParamRooms: any,
) => {
    const apiSearchParams = new URLSearchParams();
    apiSearchParams.append('checkin_at', searchParamFrom);
    apiSearchParams.append('checkout_at', searchParamTo);
    apiSearchParams.append('no_of_guests', searchParamAdults);
    apiSearchParams.append('no_of_childrens', searchParamChildrens);
    apiSearchParams.append('no_of_rooms', searchParamRooms);
    return apiSearchParams;
};
function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}
const HotelInner: React.FC = () => {
    const { id }: any = useParams();
    const searchParams = useQuery();

    const searchParamFrom = searchParams.get('from');
    const searchParamTo = searchParams.get('to');
    const searchParamAdults = searchParams.get('adults');
    const searchParamChildrens = searchParams.get('childrens');
    const searchParamRooms = searchParams.get('rooms');
    const token = localStorage.getItem("token");

    const navigate = useHistory();
    const [loading, setLoading] = useState(true);
    const [property, setProperty] = useState<any>(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [numberOfDays, setNumberOfDays] = useState(0);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [isFavourite, setIsFavourite] = useState(false);

    const [adultsNumber, setAdultsNumber] = useState(
        searchParams.get('adults') ? Number(searchParams.get('adults')) : 1,
    );
    const [childrensNumber, setChildrensNumber] = useState(
        searchParams.get('childrens') ? Number(searchParams.get('childrens')) : 0,
    );
    const [roomsNumber, setRoomsNumber] = useState(
        searchParams.get('rooms') ? Number(searchParams.get('rooms')) : 1,
    );
    const calculateNumberOfDays = () => {
        if (searchParamFrom && searchParamTo) {
            const from = dayjs(searchParamFrom);
            const to = dayjs(searchParamTo);
            const diffInDays = to.diff(from, 'day');
            setNumberOfDays(diffInDays);
        }
    };

    const calculateTotalPrice = () => {
        let calculatedTotalPrice = 0;
        selectedRooms.forEach((selectedRoom: any) => {
            calculatedTotalPrice =
                calculatedTotalPrice + selectedRoom.number * selectedRoom.price;
        });
        setTotalPrice(calculatedTotalPrice);
    };

    useEffect(() => {
        calculateNumberOfDays();
    }, [searchParamFrom, searchParamTo]);

    useEffect(() => {
        let newSelectedRooms = [];
        if (property && property.HotelRooms && numberOfDays > 0) {
            newSelectedRooms = property.HotelRooms.map((room: any) => {
                return {
                    id: room?._id,
                    number: 0,
                    name: room?.name,
                    price: numberOfDays * room?.price,
                };
            });
        }
        setSelectedRooms(newSelectedRooms);
    }, [property, numberOfDays]);

    useEffect(() => {
        console.log(selectedRooms, "selectedRooms");
        calculateTotalPrice();
    }, [selectedRooms]);

    const getProperty = async () => {
        setLoading(true);
        const apiSearchParams = searchParamFrom == null ? '' : prepareApiSearchParams(
            searchParamFrom,
            searchParamTo,
            searchParamAdults,
            searchParamChildrens,
            searchParamRooms,
        );
        const { data, status } = await axios.get(
            `Hotel/view/${id}?${apiSearchParams}`,
        );
        if (status === 200 || status === 201) {
            setProperty(data);
            setIsFavourite(data.isFavourited > 0 ? true : false);
            setLoading(false);
        }
    };
    const [selectedDayRange, setSelectedDayRange] = useState<any>({
        from: searchParams.get('from')
            ? stringDateToRangeObject(searchParams.get('from'))
            : null,
        to: searchParams.get('to')
            ? stringDateToRangeObject(searchParams.get('to'))
            : null,
    });
    useEffect(() => {
        getProperty();
    }, [
        searchParamFrom,
        searchParamTo,
        searchParamAdults,
        searchParamChildrens,
        searchParamRooms,
    ]);

    const handleReturnToListing = () => {
        // navigate.push(`/properties-listing?${searchParams}`);
    };

    const handleAddFavourite = async () => {
        setIsFavourite(!isFavourite);
        await axios.post(`/Favourite/create`, {
            hotel_id: property?._id,
        });
    };
    const formatInputValue = () => {
        if (!selectedDayRange.from || !selectedDayRange.to) return '';
        return `${formatDateDDDMMM(selectedDayRange.from)} - ${formatDateDDDMMM(
            selectedDayRange.to,
        )}`;
    };
    const checkAvailability = () => {
        searchParams.set(
            'from',
            selectedDayRange.from
                ? `${selectedDayRange.from.year}-${selectedDayRange.from.month}-${selectedDayRange.from.day}`
                : '',
        );
        searchParams.set(
            'to',
            selectedDayRange.to
                ? `${selectedDayRange.to.year}-${selectedDayRange.to.month}-${selectedDayRange.to.day}`
                : '',
        );
        searchParams.set('adults', adultsNumber.toString());
        searchParams.set('childrens', childrensNumber.toString());
        searchParams.set('rooms', roomsNumber.toString());
        navigate.push(`/hotel-inner/${id}?${searchParams}`)
    }

    const [coupons, setCoupons] = useState([])
    const getCoupons = async () => {
        
		const { data, status } = await axios.post(`Coupon/hotel-list`, {
            token,
			hotelid: property?._id
		})

		if (data.success) {
            console.log(data.coupons)
			setCoupons(data.coupons)
		}
	}

	useEffect(() => {
		getCoupons()
	}, [])
    return (
        <>
            <IonPage>
                <IonContent fullscreen>
                    <div className="app-page-hotel-inner">
                        <div className="app-page-hotel-inner-banner">
                            <Swiper
                            cssMode={true}
                            // navigation={true}
                            slidesPerView={1}
                            initialSlide={1}
                            spaceBetween={15}
                            // centeredSlides={true}
                            loop={true}
                            // centeredSlidesBounds={true}
                            pagination={true}
                            modules={[Pagination]}
                            className="mySwiper"
                             
                            >
                                {property?.HotelGallery.map((hotelPicture: any) => (
                                    <SwiperSlide>
                                        <div className="property-card-slider-image">
                                            <img src={hotelPicture.image} />
                                        </div>
                                    </SwiperSlide>
                                ))}


                            </Swiper>
                            {/* <img className="app-page-hotel-inner-banner-image" src="/assets/images/manali.jpg" /> */}
                            <div className="app-page-hotel-inner-header">

                                <IonButton className="app-page-hotel-inner-header-backbtn" onClick={() => { navigate.goBack() }}>
                                    <img src="/assets/images/left-arrow-white.svg" />
                                </IonButton>

                                <ul>
                                    <li>
                                        <IonButton onClick={handleAddFavourite}>
                                            {!isFavourite && (
                                                <img src="/assets/images/heart-outlined.svg" style={{ width: 20 }} />
                                            )}
                                            {isFavourite && (
                                                <img src="/assets/images/heart-filled.svg" style={{ width: 20 }} />
                                            )}
                                        </IonButton>
                                    </li>
                                    <li>
                                        <IonButton className="app-page-hotel-inner-header-rightbtn">
                                            <img src="/assets/images/share-white.svg" />
                                        </IonButton>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="app-page-hotel-inner-content">
                            <div className="app-page-hotel-inner-info">
                                <div className="app-page-hotel-inner-info-header">
                                    <h2>{property?.title}</h2>
                                    <div className="app-page-hotel-inner-distance"><img src="/assets/images/pin.svg" /><span>2 Kms</span></div>
                                </div>
                                <p className="app-page-hotel-inner-info-para"> {property?.real_address}</p>
                                <div className="app-page-hotel-inner-info-reviews">
                                    <div className="app-page-hotel-inner-info-reviews-content"><img src="/assets/images/star.svg" /><span>{property?.rating_standard}</span></div>
                                    <p>{`${property?.Reviews?.length} Reviews`}</p>
                                </div>
                            </div>
                            <div className="app-page-hotel-inner-info-description">
                                <h2 className="hotel-inner-heading">Description</h2>
                                <p>{property?.content}</p>
                            </div>
                            {/* <div className="app-page-hotel-inner-pricing">
                                <h2 className="hotel-inner-heading">Price Details</h2>
                                <ul>
                                    <li>
                                        <p>Guests | 1 Room | 1 Night</p>
                                        <span>₹ 4,250</span>
                                    </li>
                                    <li>
                                        <p>Service fee</p>
                                        <span>₹ 880</span>
                                    </li>
                                    <li>
                                        <p>Tax fee</p>
                                        <span>₹ 500</span>
                                    </li>
                                    <li>
                                        <p>Total</p>
                                        <span>₹ 5,630</span>
                                    </li>
                                </ul>
                            </div> */}
                            {/* <div className="app-page-hotel-inner-info-date">
                                <h2 className="hotel-inner-heading">Date of travel & Guest</h2>
                                <div className="app-page-hotel-inner-info-list">
                                    <ul>
                                        <li>
                                            <p>Check In</p>
                                            <h4>Thu, Feb 2 - 12:00 PM</h4>
                                        </li>
                                        <li>
                                            <p>Check Out</p>
                                            <h4>Thu, Feb 3 - 11:00 AM</h4>
                                        </li>
                                        <li>
                                            <p>No of Rooms</p>
                                            <h4>1 Room</h4>
                                        </li>
                                        <li>
                                            <p>No of Guests</p>
                                            <h4>2 Adults</h4>
                                        </li>
                                    </ul>
                                </div>
                            </div> */}
                            {/* <div className="app-page-hotel-inner-info-applycoupon">
                                <Link to="/coupons">
                                    <IonButton class="ripple-parent">
                                        <div className="app-applycoupon-content">
                                            <img src="/assets/images/discount.svg" />
                                            <span>Apply coupon</span>
                                        </div>
                                        <img className="apply-coupon-arrow" src="/assets/images/next-primary.svg" />
                                        <IonRippleEffect></IonRippleEffect>
                                    </IonButton>
                                </Link>
                            </div> */}
                            <div className="app-page-hotel-inner-info-appliedcoupon">
                                {coupons.map((coupon: any) => (
                                    <>
                                    <div>
                                        <h3>{coupon?.name}</h3>
                                        <p>you saved <span>₹120</span> on coupon</p>
                                    </div>
                                        <IonButton>
                                            <img src="/assets/images/cross.svg" />
                                        </IonButton>
                                    </>
                                ))}
                            </div>
                            <div className="app-page-hotel-inner-info-amenities">
                                <h2 className="hotel-inner-heading">Amenities</h2>
                                <ul>
                                    {property?.amenities.map((amenity: any, index: any) => (
                                        <li key={index}>
                                            <img src={amenity.icon} />
                                            <span>{amenity.title}</span>
                                        </li>
                                    ))}

                                </ul>
                            </div>
                            <div className="app-page-hotel-inner-search">
                                <div className="app-component-search-dates">
                                    <div className="app-component-search-date-range">
                                        <img className="search-date-range-icon" src="/assets/images/footer/calendar.svg" />
                                        <DatePicker
                                            value={selectedDayRange}
                                            onChange={setSelectedDayRange}
                                            inputPlaceholder="Select a range"
                                            formatInputText={formatInputValue}
                                            inputClassName="datepicker-range"
                                            shouldHighlightWeekends
                                            colorPrimary="#ff6431"
                                            colorPrimaryLight="#ffeae4"
                                            minimumDate={utils('en').getToday()}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="app-component-search-body">
                                <div className="app-component-search-body-card">
                                    <h2>Guests & Rooms</h2>
                                    <ul className="search-guest-add-list">
                                        <li className="search-guest-add-list-item">
                                            <div className="search-guest-info">
                                                <h5>No of Guests</h5>
                                                <p>Adults 18+ years</p>
                                            </div>
                                            <div className="search-guest-add-buttons">
                                                <div className="guest-add-btn guest-add-btn-minus">
                                                    <IonButton className="" onClick={() => {
                                                        setAdultsNumber(oldValue => {
                                                            return oldValue > 0 ? oldValue - 1 : 0;
                                                        });
                                                    }}>-</IonButton>
                                                </div>
                                                <input
                                                    type={'text'}
                                                    value={adultsNumber}
                                                    readOnly
                                                />
                                                <div className="guest-add-btn guest-add-btn-plus">
                                                    <IonButton className="" onClick={() => {
                                                        setAdultsNumber(oldValue => {
                                                            return oldValue + 1;
                                                        });
                                                    }}>+</IonButton>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="search-guest-add-list-item">
                                            <div className="search-guest-info">
                                                <h5>Childrens</h5>
                                                <p>Under 18 years</p>
                                            </div>
                                            <div className="search-guest-add-buttons">
                                                <div className="guest-add-btn guest-add-btn-minus">
                                                    <IonButton className="" onClick={() => {
                                                        setChildrensNumber(oldValue => {
                                                            return oldValue > 0 ? oldValue - 1 : 0;
                                                        });
                                                    }}>-</IonButton>
                                                </div>
                                                <input
                                                    type={'text'}
                                                    value={childrensNumber}
                                                    readOnly
                                                />
                                                <div className="guest-add-btn guest-add-btn-plus">
                                                    <IonButton className="" onClick={() => {
                                                        setChildrensNumber(oldValue => {
                                                            return oldValue + 1;
                                                        });
                                                    }}>+</IonButton>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="search-guest-add-list-item">
                                            <div className="search-guest-info">
                                                <h5>No of Rooms</h5>
                                            </div>
                                            <div className="search-guest-add-buttons">
                                                <div className="guest-add-btn guest-add-btn-minus">
                                                    <IonButton className="" onClick={() => {
                                                        setRoomsNumber(oldValue => {
                                                            return oldValue > 0 ? oldValue - 1 : 0;
                                                        });
                                                    }}>-</IonButton>
                                                </div>
                                                <input
                                                    type={'text'}
                                                    value={roomsNumber}
                                                    readOnly
                                                />
                                                <div className="guest-add-btn guest-add-btn-plus">
                                                    <IonButton className="" onClick={() => {
                                                        setRoomsNumber(oldValue => {
                                                            return oldValue + 1;
                                                        });
                                                    }}>+</IonButton>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>

                                </div>

                            </div>

                            <div className="search-component-button">

                                <IonButton className="app-custom-button" fill="solid" color="primary" shape="round" onClick={checkAvailability}>Check Availability</IonButton>

                            </div>
                            <div className="app-page-hotel-inner-rooms">
                                <ul className="app-page-hotel-inner-rooms-list">
                                    {property?.HotelRooms.map((room: any, index: any) => (
                                        <li className="app-page-hotel-inner-rooms-list-item">
                                            <RoomCard
                                                room={room}
                                                numberOfDays={numberOfDays}
                                                setSelectedRooms={setSelectedRooms}
                                            />
                                        </li>

                                    ))}

                                </ul>
                            </div>
                            <div className="app-page-hotel-inner-info-map">
                                <h2 className="hotel-inner-heading">Map</h2>
                                <div className="app-page-hotel-inner-info-map-content">
                                    <iframe width="100%" height="200" src={`https://maps.google.com/maps?hl=en&q=${property?.real_address}+()&t=&amp;z=14&ie=UTF8&iwloc=B&output=embed`}></iframe>
                                </div>
                            </div>
                            <div className="app-page-hotel-inner-info-policies">
                                <h2 className="hotel-inner-heading">Hotel Policies</h2>
                                <div className="app-page-property-inner-detail-checkin">
                                    <ul>
                                        <li><p>Check In</p><h2>{property?.timeforcheckin}</h2></li>
                                        <li><p>Check Out</p><h2>{property?.timeforcheckout}</h2></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="app-page-property-inner-detail-policies">
                                <ul>
                                    {property?.HotelPolicy.map((hotelPolicy: any) => (
                                        <li key={hotelPolicy._id}>
                                            {hotelPolicy.content}
                                        </li>
                                    ))}
                                </ul>
                                <div className="app-page-property-inner-detail-policies-link">
                                    
                                        View Guest Policy
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </IonContent>
                <IonFooter className="ion-no-border">
                    <BookingDetails
                        property={property}
                        totalPrice={totalPrice}
                        setTotalPrice={setTotalPrice}
                        numberOfDays={numberOfDays}
                        selectedRooms={selectedRooms}
                    />
                </IonFooter>
            </IonPage>
        </>
    );
};

export default HotelInner;
