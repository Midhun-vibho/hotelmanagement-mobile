import { IonButton } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { apiBaseUrl } from "../services/axios";
import "../styles/components/room-card.scss";
function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}
const RoomCard = ({ room, numberOfDays, setSelectedRooms }: any) => {
    const searchParams = useQuery();

    const searchParamFrom = searchParams.get('from');
    const searchParamTo = searchParams.get('to');
    const searchParamAdults = searchParams.get('adults');
    const searchParamChildrens = searchParams.get('childrens');
    const searchParamRooms = searchParams.get('rooms');

    const [roomsNumber, setRoomsNumber] = useState(0);
    const priceForNights = numberOfDays * room?.price;
    useEffect(() => {
        setSelectedRooms((currentSelectedRooms: any) => {
            return currentSelectedRooms.map((selectedRoom: any) => {
                if (selectedRoom.id === room?._id) {
                    return {
                        ...selectedRoom,
                        number: roomsNumber,
                    };
                } else {
                    return selectedRoom;
                }
            });
        });
    }, [roomsNumber]);

    useEffect(() => {
        setRoomsNumber(0);
    }, [
        searchParamFrom,
        searchParamTo,
        searchParamAdults,
        searchParamChildrens,
        searchParamRooms,
    ]);
    return (
        <>
            <div className="app-component-roomcard">
                <div className="app-component-roomcard-heading">
                    <h3>{room?.name}</h3>
                </div>
                <div className="app-component-roomcard-image">
                    <img src={room?.icon} />
                </div>
                <div className="app-component-roomcard-info">
                    <ul className="app-component-roomcard-info-list">
                        <li className="app-component-roomcard-info-list-item">
                            <img src="/assets/images/rulers.svg" />
                            <span>{`${room?.room_size_in_sqft} sqft`}</span>
                        </li>
                        <li className="app-component-roomcard-info-list-item">
                            <img src="/assets/images/bed.svg" />
                            <span>{`x${room?.number_of_beds}`}</span>
                        </li>
                        <li className="app-component-roomcard-info-list-item">
                            <img src="/assets/images/couple.svg" />
                            <span>{`x${room?.max_adults}`}</span>
                        </li>
                        <li className="app-component-roomcard-info-list-item">
                            <img src="/assets/images/baby-boy.svg" />
                            <span>{`x${room?.max_children}`}</span>
                        </li>
                    </ul>
                </div>
                <div className="app-page-hotel-inner-info-amenities app-component-roomcard-amenities">
                    <ul>
                        {room?.amenities.map((amenity: any, index: any) => (
                            <li
                                key={index}
                            >
                                <img src={amenity.icon} />
                                <span>{amenity.title}</span>
                            </li>
                        ))}

                    </ul>
                </div>
                <div className="app-component-roomcard-add-btns">
                    <h4>{`₹${priceForNights}`} <span>{`/${numberOfDays} nights`}</span></h4>
                    <div className="search-guest-add-buttons">
                        <div className="guest-add-btn guest-add-btn-minus">
                            <IonButton className="" onClick={() => {
                                setRoomsNumber(oldValue => {
                                    return oldValue > 0 ? oldValue - 1 : 0;
                                });
                            }}>-</IonButton>
                        </div>
                        <input type={'text'} value={roomsNumber} readOnly />
                        <div className="guest-add-btn guest-add-btn-plus">
                            <IonButton className="" onClick={() => {
                                setRoomsNumber(oldValue => {
                                    return oldValue < room?.no_of_rooms
                                        ? oldValue + 1
                                        : room?.no_of_rooms;
                                });
                            }}>+</IonButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RoomCard;