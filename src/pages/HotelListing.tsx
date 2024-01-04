import React, { useEffect, useState } from 'react';
import { IonContent, IonButton, IonPage } from '@ionic/react';
import moment from 'moment';
import '../styles/pages/hotel-listing.scss';
import { Link, useLocation} from 'react-router-dom';
import Filter from '../components/Filter';
import PropertyCard from '../components/PropertyCard';
import axios from '../services/axios';
import Pagination from '@mui/material/Pagination';
const PAGE_SIZE = 12;

const prepareApiSearchParams = (realPage: any, filtering: any) => {
    const apiSearchParams = new URLSearchParams();
    apiSearchParams.append('page', realPage.toString());
    apiSearchParams.append('page_size', PAGE_SIZE.toString());
    filtering.locationId && apiSearchParams.append('location_id', filtering.locationId);
    filtering.rooms && apiSearchParams.append('no_of_rooms', filtering.rooms);
    filtering.from && apiSearchParams.append('checkin_at', filtering.from);
    filtering.to && apiSearchParams.append('checkout_at', filtering.to);
    filtering.adults && apiSearchParams.append('no_of_guests', filtering.adults);
    filtering.childrens && apiSearchParams.append('no_of_childrens', filtering.childrens);
    filtering.sortBy && apiSearchParams.append('sort_by', filtering.sortBy);
    filtering.fromPrice && apiSearchParams.append('from_price', filtering.fromPrice);
    filtering.toPrice && apiSearchParams.append('to_price', filtering.toPrice);
    if (filtering.services.length > 0) {
        apiSearchParams.append('services', filtering.services.toString());
    }
    if (filtering.propertyTypes.length > 0) {
        apiSearchParams.append('propertytypes', filtering.propertyTypes.toString());
    }
    if (filtering.amenities.length > 0) {
        apiSearchParams.append('amenities', filtering.amenities.toString());
    }
    return apiSearchParams;
};
function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}
export const MIN_PRICE_RANGE = 10;
export const MAX_PRICE_RANGE = 125000;
const HotelListing: React.FC = () => {

    const searchParams = useQuery();
    const [page, setPage] = useState(
        searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    );
    // const [searchParams, setSearchParams] = useSearchParams();

    const searchParamLocationId = searchParams.get('locationId');
    const searchParamLocationTitle = searchParams.get('locationTitle');
    const searchParamFrom = searchParams.get('from');
    const searchParamTo = searchParams.get('to');
    const searchParamAdults = searchParams.get('adults');
    const searchParamChildrens = searchParams.get('childrens');
    const searchParamRooms = searchParams.get('rooms');
    const searchParamSortBy = searchParams.get('sortBy');
    const searchFromPrice = searchParams.get('fromPrice');
    const searchToPrice = searchParams.get('toPrice');
    const searchParamServices = searchParams.get('services');
    const searchParamPropertyTypes = searchParams.get('propertyTypes');
    const searchParamAmenities = searchParams.get('amenities');

    const [filtering, setFiltering] = useState({
        locationId: searchParamLocationId,
        rooms: searchParamRooms,
        from: searchParamFrom,
        to: searchParamTo,
        adults: searchParamAdults,
        childrens: searchParamChildrens,
        sortBy: searchParamSortBy ?? 'rating',
        fromPrice: searchFromPrice ?? MIN_PRICE_RANGE.toString(),
        toPrice: searchToPrice ?? MAX_PRICE_RANGE.toString(),
        services: searchParamServices ? searchParamServices.split(',') : [],
        propertyTypes: searchParamPropertyTypes
            ? searchParamPropertyTypes.split(',')
            : [],
        amenities: searchParamAmenities ? searchParamAmenities.split(',') : [],
    });

    const [properties, setProperties] = useState([]);

    const getProperties = async () => {
        const realPage = page - 1;
        const apiSearchParams = prepareApiSearchParams(realPage, filtering);
        const { data, status } = await axios.get(
            `Hotel/list?${apiSearchParams.toString()}`,
        );
        if (status === 200 || status === 201) {
            setProperties(data?.results);
        }
    };
    console.log(filtering,properties, "filtering")
    useEffect(() => {
        getProperties();
    }, [filtering, page]);

    useEffect(() => {
        setFiltering(oldFiltering => ({
            ...oldFiltering,
            locationId: searchParamLocationId,
            rooms: searchParamRooms,
            from: searchParamFrom,
            to: searchParamTo,
            adults: searchParamAdults,
            childrens: searchParamChildrens,
        }));
    }, [
        searchParamLocationId,
        searchParamFrom,
        searchParamTo,
        searchParamAdults,
        searchParamChildrens,
        searchParamRooms,
    ]);

    const handleSortChange = (event: any) => {
        resetPage();
        setFiltering(oldFiltering => ({
            ...oldFiltering,
            sortBy: event.target.value,
        }));
        searchParams.set('sortBy', event.target.value);
    };

    const resetPage = () => {
        setPage(1);
        searchParams.set('page', '0');
    };

    const handlePageChange = (_event: any, value: any) => {
        setPage(value);
        searchParams.set('page', value.toString());
        return searchParams;
    };

    const handleAddFavourite = async (propertyId: any) => {
        await axios.post(`/Favourite/create`, {
            hotel_id: propertyId,
        });
    };


    return (
        <>
            <IonPage>
                <IonContent fullscreen>
                    <div className="app-page-hotel-listing">
                        <div className="app-page-dark-back-header">
                            <Link to="/search">
                                <IonButton>
                                    <img src="/assets/images/left-arrow.svg" />
                                </IonButton>
                            </Link>
                        </div>
                        <div className="app-page-hotel-listing-wrapper">
                            <div className="app-page-hotel-listing-search">
                                <Link className="fullWidth" to="/search">
                                    <IonButton className="listing-serched-button">
                                        <div className="app-page-hotel-listing-search-content">
                                            <img src="/assets/images/search-icon.svg" />
                                            <div className="app-page-hotel-listing-search-info">
                                                <h6>Location</h6>
                                                <p>{searchParamLocationTitle}</p>
                                            </div>
                                        </div>
                                    </IonButton>
                                </Link>
                                <div className="app-page-hotel-listing-searched-text">
                                    <p>{moment(searchParamFrom).format("DD MMM")} - {moment(searchParamTo).format("DD MMM")}  | {searchParamAdults} Adults | {searchParamRooms} Room</p>  <Link to="/search"><IonButton fill="clear">Modify</IonButton></Link>
                                </div>
                            </div>
                            <div className="app-page-hotel-listing-heading">
                                {!searchParamLocationTitle && (
                                    <h1>{properties.length} Results found</h1>
                                )}
                                <IonButton id="open-modal">
                                    <div className="app-page-hotel-listing-filter">
                                        <img src="/assets/images/filter-icon.svg" />
                                        <p>Filters</p>
                                        <span>1</span>
                                    </div>
                                </IonButton>
                            </div>
                            <ul className="app-hotel-list">
                                {properties.map(property => (
                                    <li className="app-hotel-list-item">
                                        <PropertyCard
                                            property={property}
                                            filtering={filtering}
                                            locationId={searchParamLocationId}
                                            locationTitle={searchParamLocationTitle}
                                            handleAddFavourite={handleAddFavourite}

                                        />
                                    </li>
                                ))}


                            </ul>
                            {properties.length > PAGE_SIZE && (
                                <div className="app-page-properties-listing-pagination">
                                    <Pagination
                                        count={Math.ceil(properties.length / PAGE_SIZE)}
                                        page={page}
                                        onChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <Filter filtering={filtering}
                            setFiltering={setFiltering}
                            setSearchParams={searchParams}
                            resetPage={resetPage}
                    />
                </IonContent>
            </IonPage>
        </>
    );
};

export default HotelListing;
