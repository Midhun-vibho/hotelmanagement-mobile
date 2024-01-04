import React, { useEffect, useState } from 'react';
import { IonContent, IonCheckbox, IonItem, IonLabel, IonButton, IonPage, IonDatetime, IonDatetimeButton, IonModal, IonRippleEffect } from '@ionic/react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import '../styles/pages/search.scss';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { formatDateDDDMMM, stringDateToRangeObject } from '../utilities/DateFormat';
import axios from '../services/axios';
import DatePicker, {
    utils,
} from '@hassanmojab/react-modern-calendar-datepicker';

import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { TextField } from '@mui/material';
const DEFAULT_OPTIONS_LIMIT = 5;
const defaultFilterOptions = createFilterOptions();
const areatFilterOptions = createFilterOptions();
const filterOptionsLimited = (options: any, state: any) => {
    return defaultFilterOptions(options, state).slice(0, DEFAULT_OPTIONS_LIMIT);
};
const filterAreaOptionsLimited = (options: any, state: any) => {
    return areatFilterOptions(options, state).slice(0, DEFAULT_OPTIONS_LIMIT);
};

const filterOptions = (options: any, state: any) => {
    return defaultFilterOptions(options, state);
};
const filterAreaOptions = (options: any, state: any) => {
    return areatFilterOptions(options, state);
};

export const prepareApiSearchParams = (
    selectedLocation: any,
    selectedLocationArea: any,
    selectedDayRange: any,
    adultsNumber: any,
    childrensNumber: any,
    roomsNumber: any,
) => {
    const apiSearchParams = new URLSearchParams();
    apiSearchParams.append('locationId', selectedLocation.id);
    apiSearchParams.append('locationTitle', selectedLocation.title);
    apiSearchParams.append('area_id', selectedLocationArea.id);
    apiSearchParams.append('areaTitle', selectedLocationArea.title);
    apiSearchParams.append(
        'from',
        selectedDayRange.from
            ? `${selectedDayRange.from.year}-${selectedDayRange.from.month}-${selectedDayRange.from.day}`
            : '',
    );
    apiSearchParams.append(
        'to',
        selectedDayRange.to
            ? `${selectedDayRange.to.year}-${selectedDayRange.to.month}-${selectedDayRange.to.day}`
            : '',
    );
    apiSearchParams.append('adults', adultsNumber.toString());
    apiSearchParams.append('childrens', childrensNumber.toString());
    apiSearchParams.append('rooms', roomsNumber.toString());
    return apiSearchParams;
};
function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}
const Search = ({ isInner }: any) => {
    const searchParams = useQuery();
    const navigate = useHistory();
    const location = useLocation();
    const [anchorE, setAnchorE] = React.useState(null);
    const opened = Boolean(anchorE);

    const [searchingLocation, setSearchingLocation] = useState(false);
    const [searchingLocationArea, setSearchingLocationArea] = useState(false);
    const [locations, setLocations] = useState([{}]);
    const [locationAreas, setLocationAreas] = useState([{}]);

    const [selectedLocation, setSelectedLocation] = useState<any>({
        id: searchParams.get('locationId') ?? '',
        title: searchParams.get('locationTitle') ?? '',
    });
    const [selectedLocationArea, setSelectedLocationArea] = useState<any>({
        id: searchParams.get('locationId') ?? '',
        title: searchParams.get('locationTitle') ?? '',
    });
    const [adultsNumber, setAdultsNumber] = useState(
        searchParams.get('adults') ? Number(searchParams.get('adults')) : 1,
    );
    const [childrensNumber, setChildrensNumber] = useState(
        searchParams.get('childrens') ? Number(searchParams.get('childrens')) : 0,
    );
    const [roomsNumber, setRoomsNumber] = useState(
        searchParams.get('rooms') ? Number(searchParams.get('rooms')) : 1,
    );
    const [selectedDayRange, setSelectedDayRange] = useState<any>({
        from: searchParams.get('from')
            ? stringDateToRangeObject(searchParams.get('from'))
            : null,
        to: searchParams.get('to')
            ? stringDateToRangeObject(searchParams.get('to'))
            : null,
    });

    const getLocations = async () => {
        const { data, status } = await axios.get(`Location/list`);
        if (status === 200 || status === 201) {
            setLocations(data?.results);
        }
    };

    const getLocationAreas = async () => {
        const { data, status } = await axios.get(`Areas/list`);
        if (status === 200 || status === 201) {
            setLocationAreas(data?.results);
        }
    };
    useEffect(() => {

        getLocations();
        getLocationAreas()
    }, []);

    const handleClick = (event: any) => {
        setAnchorE(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorE(null);
    };

    const formatInputValue = () => {
        if (!selectedDayRange.from || !selectedDayRange.to) return '';
        return `${formatDateDDDMMM(selectedDayRange.from)} - ${formatDateDDDMMM(
            selectedDayRange.to,
        )}`;
    };

    const onSubmit = (event: any) => {
        event.preventDefault();
        const apiSearchParams = prepareApiSearchParams(
            selectedLocation,
            selectedLocationArea,
            selectedDayRange,
            adultsNumber,
            childrensNumber,
            roomsNumber,
        );
        if (location.pathname === '/search') {
            navigate.push(`/hotel-listing?${apiSearchParams}`);
        } else {
            // setSearchParams(apiSearchParams);
        }
    };

    const locationsDropDown = locations.map((option: any) => ({
        id: option._id,
        title: option.title,
    }));

    const filteredResults = locationAreas.filter((result: any) => result.location_id === selectedLocation.id);

    const locationAreasDropDown = filteredResults.map((option: any) => ({
        id: option._id,
        title: option.title,
    }));

    return (
        <>
            <IonPage>
                <IonContent fullscreen>
                    <div className="app-component-search">
                        <div className="app-component-search-header">
                            <div className="app-component-search-back">
                                <Link to="home">
                                    <IonButton fill="clear">
                                        <img src="/assets/images/left-arrow.svg" />
                                    </IonButton>
                                </Link>
                            </div>
                            <div className="app-component-search-form">
                                <form>
                                    <div className="app-component-search-form-field">
                                        <Autocomplete
                                            id="free-solo-demo"
                                            freeSolo
                                            value={selectedLocation}
                                            filterOptions={
                                                searchingLocation ? filterOptions : filterOptionsLimited
                                            }
                                            options={locationsDropDown}
                                            getOptionLabel={(option: any) => option.title}
                                            onInputChange={(_event, value) => {
                                                value !== ''
                                                    ? setSearchingLocation(true)
                                                    : setSearchingLocation(false);
                                            }}
                                            onChange={(_event, value) => {
                                                setSelectedLocation({
                                                    id: value?.id ?? '',
                                                    title: value?.title ?? '',
                                                });
                                            }}
                                            renderInput={params => (
                                                <TextField
                                                    placeholder="Search your location..."
                                                    {...params}
                                                />
                                            )}
                                        />
                                        <img className="app-component-search-header-icon" src="/assets/images/search-icon.svg" />
                                    </div>
                                    <div className="app-component-search-form-field">
                                        <Autocomplete
                                            id="free-solo-demo"
                                            freeSolo
                                            value={selectedLocationArea}
                                            filterOptions={
                                                searchingLocationArea ? filterAreaOptions : filterAreaOptionsLimited
                                            }
                                            options={locationAreasDropDown}
                                            getOptionLabel={(option: any) => option.title}
                                            onInputChange={(_event, value) => {
                                                value !== ''
                                                    ? setSearchingLocationArea(true)
                                                    : setSearchingLocationArea(false);
                                            }}
                                            onChange={(_event, value) => {
                                                setSelectedLocationArea({
                                                    id: value?.id ?? '',
                                                    title: value?.title ?? '',
                                                });
                                            }}
                                            renderInput={params => (
                                                <TextField
                                                    placeholder="Search your area..."
                                                    {...params}
                                                />
                                            )}
                                        />
                                        <img className="app-component-search-header-icon" src="/assets/images/search-icon.svg" />
                                    </div>
                                </form>
                            </div>
                            <div className="app-component-search-dates">
                                <div className="app-component-search-date-range">
                                    <img className="search-date-range-icon" src="/assets/images/footer/calendar.svg" />
                                    <DatePicker
                                        value={selectedDayRange}
                                        onChange={setSelectedDayRange}
                                        inputPlaceholder="Checkin & Checkout"
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
                        <div className="app-section-container">

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

                                <div className="search-component-button">
                                    <IonButton className="app-custom-button" fill="solid" color="primary" shape="round" onClick={onSubmit}>Search</IonButton>
                                </div>
                            </div>
                        </div>
                    </div>

                </IonContent>
            </IonPage>
        </>
    );
};

export default Search;
