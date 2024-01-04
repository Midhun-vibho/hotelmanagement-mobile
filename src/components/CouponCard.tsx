import { IonButton } from "@ionic/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios, { apiBaseUrl } from "../services/axios";
import "../styles/components/coupon-card.scss";
const CouponCard = ({
    coupon,
    totalPrice,
    adults,
    childrens,
    coupons,
    appliedCoupon,
    setAppliedCoupon,
    setShowAppliedCoupon,
}: any) => {
    const [checkedCoupon, setCheckedCoupon] = useState<any>(null);

    const checkCoupon = async () => {
        const { data, status } = await axios.get(
            `/Coupon/CheckCoupon/${coupon?.code}/${totalPrice}?no_of_guests=${adults}&no_of_childrens=${childrens}`,
        );
        if (status === 200 || status === 201) {
            setCheckedCoupon(data);
        }
    };
    // useEffect(() => {
    //     checkCoupon();
    // }, []);

    const handleApplyCoupon = () => {
        if (checkedCoupon?.isValid) {
            if (!appliedCoupon) {
                const coupon = coupons.find((coupon:any) => coupon.code === coupon?.code);
                setAppliedCoupon({
                    id: coupon?._id,
                    code: coupon?.code,
                    discount: checkedCoupon?.discount,
                });
                toast.success(checkedCoupon?.message);
            } else {
                toast.error('One coupon already applied');
            }
            setShowAppliedCoupon(true);
        } else {
            toast.error(checkedCoupon?.message);
        }
    };
    return (
        <>
           
                <div className="app-component-coupon">
                    <div className="coupon-card-graphic"></div>
                    <div className="app-component-coupon-wrapper">
                        <div className="app-component-coupon-sponcer-logo">
                            <img src={apiBaseUrl + coupon?.icon} />
                        </div>
                        <div className="app-component-coupon-discount">
                            <h1>{coupon?.name}</h1>
                            <p>You will Save ₹₹${checkedCoupon?.discount} using paytm wallet</p>
                        </div>
                    </div>
                    <div className="app-component-coupon-stripped-line">
                        <span></span>
                    </div>
                    <div className="app-component-coupon-info">
                        <p>Use coupon code</p>
                        <h5>{coupon?.code}</h5>
                    </div>
                    <div className="app-component-coupon-apply-btn">
                        <IonButton onClick={handleApplyCoupon}>Apply</IonButton>
                    </div>
                </div>
       
        </>
    )
}
export default CouponCard;