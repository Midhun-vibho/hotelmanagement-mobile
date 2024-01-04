import React, { useState, useRef, useEffect } from 'react';
import {
  IonFooter,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonCheckbox,
  IonLabel,
  IonItem
} from '@ionic/react';
import { IonRippleEffect } from '@ionic/react';
import "../styles/components/filter.scss";
import axios from '../services/axios'
import { string } from 'yup';
import { Checkbox, FormControlLabel, Slider } from '@mui/material';

export const MIN_PRICE_RANGE = 10
export const MAX_PRICE_RANGE = 125000

function Filter({filtering, setFiltering, setSearchParams, resetPage} : any) {
  const modal = useRef<HTMLIonModalElement>(null);
  function dismiss() {
    modal.current?.dismiss();
  }
  const fromPrice = Number(filtering.fromPrice)
	const toPrice = Number(filtering.toPrice)

	const [value, setValue] = useState([fromPrice, toPrice])
	const [services, setServices] = useState<{_id:string, title:string}[]>([])
	const [propertyTypes, setPropertyTypes] = useState<{_id:string, title:string}[]>([])
	const [amenities, setAmenities] = useState<{_id:string, title:string}[]>([])

	const getServices = async () => {
		const { data, status } = await axios.get(`Services/list`)
		if (status === 200 || status === 201) {
			setServices(data?.results)
		}
	}
	const getPropertyTypes = async () => {
		const { data, status } = await axios.get(`PropertyType/list`)
		if (status === 200 || status === 201) {
			setPropertyTypes(data?.results)
		}
	}
	const getAmenities = async () => {
		const { data, status } = await axios.get(`Amenties/list`)
		if (status === 200 || status === 201) {
			setAmenities(data?.results)
		}
	}

	useEffect(() => {
		getServices()
		getPropertyTypes()
		getAmenities()
	}, [])

	const handlePriceRangeChange = (_event: any, newValue: any) => {
		setValue(newValue)
	}

	const handlePriceRangeChangeCommited = (_event: any, newValue: any) => {
		resetPage()
		setValue(newValue)
		setFiltering((oldFiltering: any) => ({
			...oldFiltering,
			fromPrice: newValue[0],
			toPrice: newValue[1],
		}))
    
			setSearchParams.set('fromPrice', newValue[0])
			setSearchParams.set('toPrice', newValue[1])
	}

	const handleServiceFilterChange = (event: any) => {
		resetPage()
		let newFilterServices: any[] = []
		setFiltering((prev: any) => {
			if (event.target.checked) {
				const serviceExist = prev.services.find(
					(service: any) => service === event.target.value,
				)
				if (!serviceExist) {
					newFilterServices = [...prev.services, event.target.value]
				}
			} else {
				newFilterServices = prev.services.filter(
					(service: any) => service !== event.target.value,
				)
			}
			return {
				...prev,
				services: newFilterServices,
			}
		})

    if (newFilterServices.length === 0) {
      setSearchParams.delete('services')
    } else {
      setSearchParams.set('services', newFilterServices)
    }
			
	}

	console.log({ filtering })

	const handlePropertyTypesFilterChange = (event: any) => {
		resetPage()
		let newFilterPropertyTypes: any[] = []
		setFiltering((oldFiltering: any) => {
			if (event.target.checked) {
				const propertyTypeExist = oldFiltering.propertyTypes.find(
					(propertytype: any) => propertytype === event.target.value,
				)
				if (!propertyTypeExist) {
					newFilterPropertyTypes = [
						...oldFiltering.propertyTypes,
						event.target.value,
					]
				}
			} else {
				newFilterPropertyTypes = oldFiltering.propertyTypes.filter(
					(propertytype: any) => propertytype !== event.target.value,
				)
			}

			console.log({ newFilterPropertyTypes })

			return {
				...oldFiltering,
				propertyTypes: newFilterPropertyTypes,
			}
		})
			if (newFilterPropertyTypes.length === 0) {
				setSearchParams.delete('propertyTypes')
			} else {
				setSearchParams.set('propertyTypes', newFilterPropertyTypes)
			}
	}

	const handleAmenitiesFilterChange = (event: any) => {
		resetPage()
		let newFilterAmenities: any[] = []
		setFiltering((oldFiltering: any) => {
			if (event.target.checked) {
				const amenityExist = oldFiltering.amenities.find(
					(amenity: any) => amenity === event.target.value,
				)
				if (!amenityExist) {
					newFilterAmenities = [...oldFiltering.amenities, event.target.value]
				}
			} else {
				newFilterAmenities = oldFiltering.amenities.filter(
					(amenity: any) => amenity !== event.target.value,
				)
			}
			return {
				...oldFiltering,
				amenities: newFilterAmenities,
			}
		})
			if (newFilterAmenities.length === 0) {
				setSearchParams.delete('amenities')
			} else {
				setSearchParams.set('amenities', newFilterAmenities)
			}
	}

	const isServiceChecked = (serviceId: any) => {
		let checked = false
		if (filtering.services) {
			const serviceInFiltering = filtering.services.find(
				(service: any) => service === serviceId,
			)
			if (serviceInFiltering) {
				checked = true
			}
		}
		return checked
	}

	const isPropertyTypeChecked = (propertyTypeId: any) => {
		let checked = false
		if (filtering.propertyTypes) {
			const propertyTypeInFiltering = filtering.propertyTypes.find(
				(propertytype: any) => propertytype === propertyTypeId,
			)
			if (propertyTypeInFiltering) {
				checked = true
			}
		}
		return checked
	}

	const isAmenityChecked = (amenityId: any) => {
		let checked = false
		if (filtering.amenities) {
			const amenityInFiltering = filtering.amenities.find(
				(amenity: any) => amenity === amenityId,
			)
			if (amenityInFiltering) {
				checked = true
			}
		}
		return checked
	}

  function handleResetFilters(){
    setFiltering((prev: any) => {return {
      ...prev,
      services: [],
      propertyTypes: [],
      amenities: [],
      fromPrice: MIN_PRICE_RANGE,
			toPrice: MAX_PRICE_RANGE,

    }})
    setSearchParams.delete('services')
    setSearchParams.delete('propertyTypes')
    setSearchParams.delete('amenities')
    setSearchParams.set('fromPrice', MIN_PRICE_RANGE)
		setSearchParams.set('toPrice', MAX_PRICE_RANGE)
    setValue([MIN_PRICE_RANGE,MAX_PRICE_RANGE])
  }

  function handleClear(filToClr: string){
    setFiltering((prev: any) => { 
      const nextval = {...prev};
      nextval[filToClr] = [];
      return nextval;
    })
    setSearchParams.delete(filToClr)
  }

  function handleRangeClear(){
    setFiltering((prev: any) => {return {
      ...prev,
      fromPrice: MIN_PRICE_RANGE,
			toPrice: MAX_PRICE_RANGE,
    }})
    setSearchParams.set('fromPrice', MIN_PRICE_RANGE)
		setSearchParams.set('toPrice', MAX_PRICE_RANGE)
    setValue([MIN_PRICE_RANGE,MAX_PRICE_RANGE])
  }


  return (
<>
        <IonModal className="app-filter-modal" ref={modal} trigger="open-modal">
          <IonHeader className="app-component-filter-header ion-no-border">
            <div className="app-component-filter-content">
                {/* <IonButton fill="clear">
                    <img src="/assets/images/sidebar/close.svg"/>
                </IonButton> */}
                <div className="app-component-filter-content-text">
                    <h4>Filters</h4>
                    <span>1</span>
                </div>
            </div>
          </IonHeader>
          <IonContent>
            <div className="app-component-filter-info">
                {/* <div className="app-component-filter-section">
                    <div className="app-component-filter-section-header">
                      <h4>Guest Ratings</h4>
                      <IonButton fill="clear">Clear</IonButton>
                    </div>
                    <div className="app-component-filter-section-wrapper">
                      <ul className="app-component-filter-list-check">
                        <li className="app-component-filter-list-check-item">
                          <div className="app-component-filter-checkbox">
                          <IonItem>
                            <IonCheckbox slot="start"></IonCheckbox>
                              <IonLabel>4 & Above</IonLabel>
                            </IonItem>
                          </div>
                        </li>
                        <li className="app-component-filter-list-check-item">
                          <div className="app-component-filter-checkbox">
                          <IonItem>
                            <IonCheckbox slot="start"></IonCheckbox>
                              <IonLabel>3</IonLabel>
                            </IonItem>
                          </div>
                        </li>
                        <li className="app-component-filter-list-check-item">
                          <div className="app-component-filter-checkbox">
                          <IonItem>
                            <IonCheckbox slot="start"></IonCheckbox>
                              <IonLabel>{`< 2`}</IonLabel>
                            </IonItem>
                          </div>
                        </li>
                      </ul>
                    </div>
                </div> */}
                <div className="app-component-filter-section">
                    <div className="app-component-filter-section-header">
                      <h4>Price Range</h4>
                      <IonButton fill="clear" onClick={() => {handleRangeClear(); dismiss()}}>Clear</IonButton>
                    </div>
                    <div className="app-component-filter-section-wrapper">
                    <ul className="app-component-filter-list-radio-btn">
								    <h3>₹ {fromPrice} - ₹ {toPrice}</h3>
                      <Slider
                        getAriaLabel={() => 'Price range'}
                        style={{color:'#ff6431'}}
                        value={value}
                        onChange={handlePriceRangeChange}
                        onChangeCommitted={handlePriceRangeChangeCommited}
                        valueLabelDisplay="auto"
                        min={MIN_PRICE_RANGE}
                        max={MAX_PRICE_RANGE}
                        step={100}
                        disableSwap
                      /> </ul>
                      {/* <ul className="app-component-filter-list-radio-btn">
                        <li className="app-component-filter-list-radio-btn-item">
                            <div className="filter-button-type-radio">
                                <input id="price-range1" name="price-range" type={'radio'}/>
                                <label htmlFor="price-range1" className="ion-activatable ripple-parent">
                                  <span>₹ 0 - ₹ 2000</span>
                                  <IonRippleEffect></IonRippleEffect>
                                </label>
                            </div>
                        </li>
                        <li className="app-component-filter-list-radio-btn-item">
                            <div className="filter-button-type-radio">
                                <input id="price-range2" name="price-range" type={'radio'}/>
                                <label htmlFor="price-range2" className="ion-activatable ripple-parent">
                                  <span>₹ 2000 - ₹ 3000</span>
                                  <IonRippleEffect></IonRippleEffect>
                                </label>
                            </div>
                        </li>
                        <li className="app-component-filter-list-radio-btn-item">
                            <div className="filter-button-type-radio">
                                <input id="price-range3" name="price-range" type={'radio'}/>
                                <label htmlFor="price-range3" className="ion-activatable ripple-parent">
                                  <span>₹ 3000 - ₹ 5000</span>
                                  <IonRippleEffect></IonRippleEffect>
                                </label>
                            </div>
                        </li>
                        <li className="app-component-filter-list-radio-btn-item">
                            <div className="filter-button-type-radio">
                                <input id="price-range4" name="price-range" type={'radio'}/>
                                <label htmlFor="price-range4" className="ion-activatable ripple-parent">
                                  <span>₹ 5000+</span>
                                  <IonRippleEffect></IonRippleEffect>
                                </label>
                            </div>
                        </li>
                      </ul> */}
                    </div>
                </div>
                <div className="app-component-filter-section">
                    <div className="app-component-filter-section-header">
                      <h4>Services</h4>
                      <IonButton fill="clear" onClick={() => {handleClear('services'); dismiss()}}>Clear</IonButton>
                    </div>
                    <div className="app-component-filter-section-wrapper">
                    <ul className="app-component-filter-check-list" style={{listStyle:'none'}}>
                      {services.map(service => (
                        <li
                          key={service._id}
                          className="app-component-filter-check-list-item"
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                // color="primary"
                                style={{color:'#ff6431'}}
                                checked={isServiceChecked(service._id)}
                                name={service.title}
                                value={service._id}
                                onChange={handleServiceFilterChange}
                              />
                            }
                            label={service.title}
                          />
                        </li>
                      ))}
                    </ul>
                      {/* <ul className="app-component-filter-list-check">
                        <li className="app-component-filter-list-check-item">
                          <div className="app-component-filter-checkbox">
                          <IonItem>
                            <IonCheckbox slot="start"></IonCheckbox>
                              <IonLabel>Couple Friendly</IonLabel>
                            </IonItem>
                          </div>
                        </li>
                        <li className="app-component-filter-list-check-item">
                          <div className="app-component-filter-checkbox">
                          <IonItem>
                            <IonCheckbox slot="start"></IonCheckbox>
                              <IonLabel>Families</IonLabel>
                            </IonItem>
                          </div>
                        </li>
                        <li className="app-component-filter-list-check-item">
                          <div className="app-component-filter-checkbox">
                          <IonItem>
                            <IonCheckbox slot="start"></IonCheckbox>
                              <IonLabel>Premium Stays</IonLabel>
                            </IonItem>
                          </div>
                        </li>
                        <li className="app-component-filter-list-check-item">
                          <div className="app-component-filter-checkbox">
                          <IonItem>
                            <IonCheckbox slot="start"></IonCheckbox>
                              <IonLabel>Traveling for work</IonLabel>
                            </IonItem>
                          </div>
                        </li>
                      </ul> */}
                    </div>
                </div>
                <div className="app-component-filter-section">
                    <div className="app-component-filter-section-header">
                      <h4>Property Types</h4>
                      <IonButton fill="clear" onClick={() => {handleClear('propertyTypes'); dismiss()}}>Clear</IonButton>
                    </div>
                    <div className="app-component-filter-section-wrapper">
                      <ul className="app-component-filter-check-list" style={{listStyle:'none'}}>
                        {propertyTypes.map(propertyType => (
                            <li
                              key={propertyType._id}
                              className="app-component-filter-check-list-item"
                            >
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    // color="primary"
                                    style={{color:'#ff6431'}}
                                    checked={isPropertyTypeChecked(propertyType._id)}
                                    name={propertyType.title}
                                    // checkedIcon={}
                                    value={propertyType._id}
                                    onChange={handlePropertyTypesFilterChange}
                                  />
                                }
                                label={propertyType.title}
                              />
                            </li>
                          ))}
                        {/* <li className="app-component-filter-list-check-item">
                          <div className="app-component-filter-checkbox">
                          <IonItem>
                            <IonCheckbox slot="start"></IonCheckbox>
                              <IonLabel>Refrigerator</IonLabel>
                            </IonItem>
                          </div>
                        </li>
                        <li className="app-component-filter-list-check-item">
                          <div className="app-component-filter-checkbox">
                          <IonItem>
                            <IonCheckbox slot="start"></IonCheckbox>
                              <IonLabel>Seating area</IonLabel>
                            </IonItem>
                          </div>
                        </li>
                        <li className="app-component-filter-list-check-item">
                          <div className="app-component-filter-checkbox">
                          <IonItem>
                            <IonCheckbox slot="start"></IonCheckbox>
                              <IonLabel>King Sized Bed</IonLabel>
                            </IonItem>
                          </div>
                        </li>
                        <li className="app-component-filter-list-check-item">
                          <div className="app-component-filter-checkbox">
                          <IonItem>
                            <IonCheckbox slot="start"></IonCheckbox>
                              <IonLabel>Queen Sized Bed</IonLabel>
                            </IonItem>
                          </div>
                        </li> */}
                      </ul>
                    </div>
                </div>
                <div className="app-component-filter-section">
                    <div className="app-component-filter-section-header">
                      <h4>Amenities</h4>
                      <IonButton fill="clear" onClick={() => {handleClear('amenities'); dismiss()}}>Clear</IonButton>
                    </div>
                    <div className="app-component-filter-section-wrapper">
                      <ul className="app-component-filter-check-list" style={{listStyle:'none'}}>
                        {amenities.map(amenity => (
                          <li
                            key={amenity._id}
                            className="app-component-filter-check-list-item"
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  // color="primary"
                                  style={{color:'#ff6431'}}
                                  checked={isAmenityChecked(amenity._id)}
                                  name={amenity.title}
                                  value={amenity._id}
                                  onChange={handleAmenitiesFilterChange}
                                />
                              }
                              label={amenity.title}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                </div>
            </div>
          </IonContent>
            <IonFooter>
              <div className="app-component-filter-footer">
                <h3 onClick={() => {handleResetFilters(); dismiss()}} style={{cursor:'pointer'}}>Reset All</h3>
                <IonButton color="medium" fill="solid" shape="round" onClick={dismiss}>Close</IonButton>
              </div>
            </IonFooter>
        </IonModal>
</>
  );
}

export default Filter;