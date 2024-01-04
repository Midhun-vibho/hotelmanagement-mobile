import { IonAccordion, IonAccordionGroup, IonButton, IonCheckbox, IonItem, IonLabel, IonRippleEffect } from '@ionic/react';
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    IconButton,
    Popover,
    Tooltip,
} from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import CouponCard from '../components/CouponCard';
import { getLoggedUserData } from '../services/auth';
import axios from '../services/axios';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../components/StripePaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { Capacitor } from '@capacitor/core';
import { Stripe } from '@capacitor-community/stripe';
// import StripeCheckoutButton from '../components/CheckOutForm';
const stripePromise = loadStripe('pk_test_51NZv8WSIeoNx7WRJosdRkVFhQUT5Sq9MQDCCBE18EBjBKlvvB1dKTii7piZgURdPRpDjrERiBl8LlMcTyxvkyNPP00FEcESSuD');

const validateBooking = (from: any, to: any, adults: any, childrens: any, rooms: any) => {
    let validate = true;
    if (!from || !to) {
        toast.error('Please, select date range');
        validate = false;
    }
    if (!adults || adults === 0) {
        toast.error('Please, select guest number');
        validate = false;
    }
    if (rooms === 0) {
        toast.error('Please, select any room');
        validate = false;
    }
    return validate;
};
function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}
export default function BookingDetails({ property,
    totalPrice,
    setTotalPrice,
    numberOfDays,
    selectedRooms, }: any) {
    const location: any = useLocation()
    const searchParams = useQuery();
    const navigate = useHistory();
    const [selectedHotelBuyerPrices, setSelectedHotelBuyerPrices] = useState([]);
    const adults = searchParams.get('adults')
        ? Number(searchParams.get('adults'))
        : 0;
    const childrens = searchParams.get('childrens')
        ? Number(searchParams.get('childrens'))
        : 0;

    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const [totalHotelBuyerPrices, setTotalHotelBuyerPrices] = useState(0);
    const [totalHotelExtraPrices, setTotalHotelExtraPrices] = useState(0);
    const [totalAmountPaid, setTotalAmountPaid] = useState(0);
    const [openmodal, setOpenmodal] = useState(false);
    const [openCardModal, setOpenCardModal] = useState<any>(false);
    const [showAppliedCoupon, setShowAppliedCoupon] = useState<any>(false);
    const handleOpenModal = () => setOpenmodal(true);
    const handleCloseModal = () => setOpenmodal(false);
    const handleCloseCardModal = () => setOpenCardModal(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedExtraPrices, setSelectedExtraPrices] = useState<any>([]);
    const [totalExtraPrices, setTotalExtraPrices] = useState<any>(0);
    const [totalBuyerPrices, setTotalBuyerPrices] = useState<any>(0);
    const [coupons, setCoupons] = useState([]);
    const [promoCode, setPromoCode] = useState('');
    const [bookingId, setBookingId] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
    const [stripeInitialized, setStripeInitialized] = useState(false);

    const open = Boolean(anchorEl);

    const selectedRoomsWithNumber = selectedRooms.filter(
        (selectedRoom: any) => selectedRoom.number > 0,
    );

    const handlePopoverOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const calculateTotalHotelBuyerPrices = () => {
        const sumHotelBuyerPrices = selectedHotelBuyerPrices.reduce(
            (accumulator, selectedBuyerPrice: any) => {
                if (selectedBuyerPrice.is_price_per_person) {
                    return accumulator + selectedBuyerPrice.price * (adults + childrens);
                } else {
                    return accumulator + selectedBuyerPrice.price;
                }
            },
            0,
        );
        setTotalHotelBuyerPrices(sumHotelBuyerPrices);
    };

    useEffect(() => {
        calculateTotalHotelBuyerPrices();
    }, [selectedHotelBuyerPrices, adults, childrens]);

    const handleExtraPriceChange = (event: any) => {

        let selectedHotelBuyerPricesIds: any = [];
        setSelectedHotelBuyerPrices(oldSelectedHotelBuyerPrices => {
            const oldSelectedHotelBuyerPricesIds = oldSelectedHotelBuyerPrices.map(
                (extraPrice: any) => extraPrice?._id,
            );
            if (event.target.checked) {
                const buyerPriceExist = oldSelectedHotelBuyerPrices?.find(
                    (buyerPrice: any) => buyerPrice._id === event.target.value,
                );
                if (!buyerPriceExist) {
                    selectedHotelBuyerPricesIds = [
                        ...oldSelectedHotelBuyerPricesIds,
                        event.target.value,
                    ];
                }
            } else {
                selectedHotelBuyerPricesIds = oldSelectedHotelBuyerPricesIds?.filter(
                    hotelBuyerPriceId => hotelBuyerPriceId !== event.target.value,
                );
            }
            let newCompletedExtraPrices: any = [];
            selectedHotelBuyerPricesIds.forEach((selectedHotelBuyerPricesId: any) => {
                const completeBuyerPrice = property?.HotelBuyerPrices.find(
                    (hotelBuyerPrice: any) => hotelBuyerPrice._id === selectedHotelBuyerPricesId,
                );
                newCompletedExtraPrices.push(completeBuyerPrice);
            });
            return newCompletedExtraPrices;
        });
    };

    const getCoupons = async () => {
        const { data, status } = await axios.get(`Coupon/list`);
        if (status === 200 || status === 201) {
            setCoupons(data?.results);
        }
    };
    useEffect(() => {
        getCoupons();
    }, [property]);



    const calculateTotalHotelExtraPrices = () => {
        const sumHotelExtraPrices = property?.HotelExtraPrices.reduce(
            (accumulator: any, hotelExtraPrice: any) => {
                if (hotelExtraPrice.is_per_person) {
                    return accumulator + hotelExtraPrice.price * (adults + childrens);
                } else {
                    return accumulator + hotelExtraPrice.price;
                }
            },
            0,
        );
        setTotalHotelExtraPrices(sumHotelExtraPrices);
    };

    useEffect(() => {
        calculateTotalHotelExtraPrices();
    }, [property?.HotelBuyerPrices, adults, childrens]);

    const recalculateTotalPrice = () => {
        setTotalPrice((oldTotalPrice: any) => oldTotalPrice - appliedCoupon.discount);
    };

    useEffect(() => {
        if (appliedCoupon) {
            recalculateTotalPrice();
        }
    }, [appliedCoupon]);

    const onSubmitCoupon = async (event: any) => {
        event.preventDefault();
        const { data, status } = await axios.get(
            `/Coupon/CheckCoupon/${promoCode}/${totalPrice}?no_of_guests=${adults}&no_of_childrens=${childrens}`,
        );
        if (status === 200 || status === 201) {
            if (data?.isValid) {
                if (!appliedCoupon) {
                    const coupon: any = coupons.find((coupon: any) => coupon.code === promoCode);
                    setAppliedCoupon({
                        id: coupon._id,
                        code: coupon.code,
                        discount: data?.discount,
                    });
                    toast.success(data?.message);
                } else {
                    toast.error('One coupon already applied');
                }
                setShowAppliedCoupon(true);
            } else {
                toast.error(data?.message);
            }
        }
    };

    const createStripeSession = async (bookingId: any) => {
        // const { data, status } = await axios.post('/Payments/create-checkout', { bookingid: bookingId, ismobile: true, cancelredirect: `${window.location.href}` });
        // console.log('data=====>', data)
        // window.location = data.session.url

    }

    const handleCreateBooking = async () => {
        const sumRoomsNumber = selectedRoomsWithNumber.reduce(
            (accumulator: any, room: any) => accumulator + room.number,
            0,
        );
        const totalPaid =
            totalPrice + totalHotelBuyerPrices + totalHotelExtraPrices;

        const roomIds = selectedRoomsWithNumber.map((selectedRoom: any) => {
            return {
                hotel_room_id: selectedRoom.id,
                price: selectedRoom.price,
                no_of_rooms: selectedRoom.number,
            };
        });

        const extraPriceInformation = selectedHotelBuyerPrices.map(
            (selectedHotelBuyerPrice: any) => {
                return {
                    id: selectedHotelBuyerPrice._id,
                    price: selectedHotelBuyerPrice.price,
                    title: selectedHotelBuyerPrice.name,
                    type: selectedHotelBuyerPrice.type,
                    is_per_person: selectedHotelBuyerPrice.is_price_per_person,
                };
            },
        );

        if (!validateBooking(from, to, adults, childrens, sumRoomsNumber)) {
            return;
        }

        const loggedUserData = getLoggedUserData();



        const booking: any = {
            hotel_id: property?._id,
            room_ids: roomIds,
            author_id: loggedUserData._id,
            checkin_date: from,
            checkout_date: to,
            no_of_adults: adults,
            no_of_chlidrens: childrens,
            no_of_rooms: sumRoomsNumber,
            payment_method: 'Online',
            total_paid: totalPaid,
            total_service_price: totalHotelExtraPrices,
            total_extra_price: totalHotelBuyerPrices,
            discount: 0,
            address: property?.real_address,
            extra_price_information: extraPriceInformation,
        };
        if (appliedCoupon) {
            booking.promocode = appliedCoupon.code;
            booking.discount = appliedCoupon.discount;
        }
        const { data, status } = await axios.post(`/Booking/create`, booking);
        console.log('first===>', data)

        if (status === 200 || status === 201) {
            // createStripeSession(data._id)
            if (Capacitor.isPluginAvailable("Stripe")) {
                Stripe.initialize({
                    publishableKey: 'pk_test_51NZv8WSIeoNx7WRJosdRkVFhQUT5Sq9MQDCCBE18EBjBKlvvB1dKTii7piZgURdPRpDjrERiBl8LlMcTyxvkyNPP00FEcESSuD',
                })

                try {
                    const response = await axios.post("/Payments/payment-intent", {
                        amount: totalPaid * 100, currency: "INR"
                    }
                    );

                    await Stripe.createPaymentSheet({
                        paymentIntentClientSecret: response?.data?.clientSecret,
                        merchantDisplayName: "HotelManagement",
                    });

                    const { paymentResult } = await Stripe.presentPaymentSheet();
                    console.log(paymentResult);
                    navigate.push(`/thankyou/${data._id}`)
                } catch (error) {
                    console.error("Payment failed:", error);
                    toast.error('Something went wrong please try again...')
                }

                // navigate.push('/checkoutform', { amount: totalPaid })
            }
            // setTotalAmountPaid(totalPaid)
            // setOpenCardModal(true)
            // setBookingId(data._id)
            // navigate.push(`/paymentform`);
            // navigate.push(`/bookings`);
        }
    };


    return (
        <div className="app-proceed-to-pay-cta-footer">

            <div className="app-proceed-to-pay-services">
                <h2>Booking Details</h2>
                <p>{`${property?.title}, ${property?.real_address}`}</p>
                {selectedRoomsWithNumber.map((selectedRoom: any, index: any) => (
                    <p key={index}>{`${selectedRoom.number} ${selectedRoom.number > 1 ? 'Rooms' : 'Room'
                        } - ${selectedRoom.name}`}</p>
                ))}
                <p>
                    {`${adults} ${adults > 1 ? 'Adults' : 'Adult'} - ${childrens} ${childrens > 1 ? 'Childrens' : 'Children'
                        } - ${numberOfDays} ${numberOfDays > 1 ? 'Nights' : 'Night'}`}
                </p>
                <div className="app-booking-details-collapse">
                    <IonAccordionGroup>
                        <IonAccordion value="first">
                            <IonItem slot="header">
                                <h2 className="app-booking-details-collapse__title">Extra Services</h2>
                            </IonItem>
                            <div slot="content">
                                <ul className="search-guest-preference-list">
                                    <FormGroup>
                                        {property?.HotelBuyerPrices.map((extraPrice: any) => (
                                            <FormControlLabel
                                                key={extraPrice._id}
                                                control={<Checkbox />}
                                                value={extraPrice._id}
                                                label={extraPrice.name}
                                                onChange={handleExtraPriceChange}
                                            />
                                        ))}
                                    </FormGroup>
                                    {/* <div className="app-page-hotel-inner-info-applycoupon">

                                        <IonButton class="ripple-parent" onClick={handleOpenModal}>
                                            <div className="app-applycoupon-content">
                                                <img src="/assets/images/discount.svg" />
                                                <span>Apply coupon</span>
                                            </div>
                                            <img className="apply-coupon-arrow" src="/assets/images/next-primary.svg" />
                                            <IonRippleEffect></IonRippleEffect>
                                        </IonButton>

                                    </div> */}
                                    {selectedRoomsWithNumber.map((selectedRoom: any, index: any) => (
                                        <li key={index} className="listing-prices">
                                            <p>{`${selectedRoom.number} ${selectedRoom.number > 1 ? 'Rooms' : 'Room'
                                                } - ${selectedRoom.name} - ${numberOfDays} ${numberOfDays > 1 ? 'Nights' : 'Night'
                                                }`}</p>
                                            <span>{`₹ ${selectedRoom.price * selectedRoom.number}`}</span>
                                        </li>
                                    ))}
                                    {selectedHotelBuyerPrices.map((selectedHotelBuyerPrice: any, index: any) => (
                                        <li key={index} className="listing-prices">
                                            <p>{`${adults + childrens} ${selectedHotelBuyerPrice?.name
                                                }`}</p>
                                            <span>{`₹ ${selectedHotelBuyerPrice?.price * (adults + childrens)
                                                }`}</span>
                                        </li>
                                    ))}
                                    {property?.HotelExtraPrices.map((extraPrice: any) => (
                                        <li
                                            key={extraPrice._id}
                                            className="listing-prices"
                                        >
                                            <p>
                                                {extraPrice.name}

                                            </p>
                                            <span>{`₹ ${extraPrice.is_per_person
                                                ? extraPrice.price * (adults + childrens)
                                                : extraPrice.price
                                                }`}</span>
                                        </li>
                                    ))}
                                    <li className="listing-prices">
                                        <p>Total</p>
                                        <span>{`₹ ${totalPrice + totalHotelBuyerPrices + totalHotelExtraPrices
                                            }`}</span>
                                    </li>

                                </ul>
                            </div>
                        </IonAccordion>
                    </IonAccordionGroup>

                </div>
            </div>
            <div className="app-proceed-to-pay-cta-price">
                <div className="app-proceed-to-pay-price">
                    <h4>{`₹ ${totalPrice + totalHotelBuyerPrices + totalHotelExtraPrices
                        }`}</h4>
                    {/* <h6><span>₹ 6800</span> <span className="discounted">60% Off</span></h6> */}
                </div>
                {/* <Link to="/thankyou"> */}
                <IonButton shape="round" onClick={handleCreateBooking} className="app-custom-button">
                    Proceed to Pay
                </IonButton>
                {/* </Link> */}
            </div>
            <Modal
                open={openmodal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="app-page-coupons">
                    <div className="app-page-coupons-heading">
                        <h1>Coupons</h1>
                        <p>Enter your Coupon Code to apply</p>
                    </div>
                    <div className="app-page-coupons-search">
                        <input type={'text'} placeholder="Coupon Code" onChange={(evt: any) => {

                            setPromoCode(evt.target.value);
                        }} />
                        <IonButton fill="clear" className="app-clear-btn" onClick={onSubmitCoupon}>
                            Apply
                        </IonButton>
                    </div>
                    <div className="app-page-coupons-content">
                        <ul className="app-page-coupons-list">
                            {coupons.map((coupon: any) => (
                                <li key={coupon._id} className="app-coupons-list-item">
                                    <CouponCard
                                        coupon={coupon}
                                        totalPrice={totalPrice}
                                        adults={adults}
                                        childrens={childrens}
                                        coupons={coupons}
                                        appliedCoupon={appliedCoupon}
                                        setAppliedCoupon={setAppliedCoupon}
                                        setShowAppliedCoupon={setShowAppliedCoupon}
                                    />
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>
            </Modal>
            {/* <Elements stripe={stripePromise}>
                <StripeCheckoutButton
                    openCardModal={openCardModal}
                    handleCloseCardModal={handleCloseCardModal}
                    totalPaid={totalAmountPaid}
                    bookingId={bookingId}
                />
            </Elements> */}
        </div>
    )
}
