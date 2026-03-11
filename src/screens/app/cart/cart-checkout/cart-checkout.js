import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Modal,
} from 'react-native';

import styles from './style';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../../constants/colors';

import ActivityLoader from '../../../../components/activity-loader';

import {AuthContext} from '../../../../../auth-context';
import API from '../../../../actions/api';

import ToastAlertMsg from '../../../../components/toast-alert-msg';
import {PAYMENT} from '../../../../components/razorpay-payment';
import {IMAGES} from '../../../../constants/images';
import ConvertIntoRupees from '../../../../components/convert-into-rupees';
import IconInput from '../../../../components/icon-input';
import CouponCard from '../../../../components/coupon-card';
import GradientBtn from '../../../../components/gradient-btn';
import {ICONS} from '../../../../constants/icons';

export default function CartCheckout(props) {
  const {addr, cartTotal, cartSaving} = props.route.params;

  const {userProfile} = React.useContext(AuthContext);
  const totalCartAmount = parseFloat(cartTotal.replace(/,/g, ''));
  const totalcartSaving = parseFloat(cartSaving.replace(/,/g, ''));
  const [isLoading, setIsLoading] = useState(false);
  const [paymentType, setPaymentType] = useState(1);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const {updateCartCount} = useContext(AuthContext).authContext;
  const [gst, setGst] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [couponModalVisible, setCouponModalVisible] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponMsg, setCouponMsg] = useState(null);
  const [couponCode, setCouponCode] = useState(null);
  const [couponName, setCouponName] = useState(null);
  const [couponSavings, setCouponSavings] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState('50');
  const [totalCgst, setTotalCgst] = useState(0);
  const [totalSgst, setTotalSgst] = useState(0);
  const [totalIgst, setTotalIgst] = useState(0);

  // const coupons = [
  //   {
  //     percentageOff: '5',
  //     offerAmount: '10',
  //     promoCode: 'NEWUSER10',
  //     minCartValue: '1000',
  //     endDate: '25-03-30',
  //   },
  // ];
  const [coupons, setCoupons] = useState([]);

  const [minCartValue, setMinCartValue] = useState(0); // Fix typo
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [coinDiscount, setCoinDiscount] = useState(0);

  async function fetchData() {
    try {
      setIsLoading(true);

      const gst_rate = await API.getCalculatedGstByStateCode(
        userProfile?.code,
        '0',
      );

      const coupons = await API.getCouponList();

      if (gst_rate.success === 'true') {
        const cgstArr = gst_rate.extraData.cgst || [];
        const sgstArr = gst_rate.extraData.sgst || [];
        const igstArr = gst_rate.extraData.igst || [];

        const cgstTotal = cgstArr.reduce(
          (sum, val) => sum + parseFloat(val),
          0,
        );
        const sgstTotal = sgstArr.reduce(
          (sum, val) => sum + parseFloat(val),
          0,
        );

        const igstTotal = igstArr.reduce(
          (sum, val) => sum + parseFloat(val),
          0,
        );

        setGst(gst_rate.extraData);
        setTotalCgst(cgstTotal);
        setTotalSgst(sgstTotal);
        setTotalIgst(igstTotal);
        setIsDataLoading(false);
        setIsLoading(false);
      }

      if (coupons.success === 'true') {
        setCoupons(coupons.extraData.coupon_list);
        setIsLoading(false);
      } else {
        ToastAlertMsg('Something went Wrong..');
        setIsDataLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleApplyCoupon(coupon) {
    const isValid = minCartValue >= parseFloat(coupon.purchase_of);

    if (!isValid) {
      ToastAlertMsg(`Minimum cart value should be ₹${coupon.purchase_of}`);
      return;
    }

    const coins = parseFloat(coupon.coins || 0);

    setCoinDiscount(coins); // direct coin use
    setSelectedCoupon(coupon);
  }

  function handleRemoveCoupon() {
    setSelectedCoupon(null);
    setCoinDiscount(0);
  }

  const options = [
    {
      key: 1,
      text: 'Online',
      icon: 'card-outline',
      subText: 'UPI, Card, Net Banking',
    },
  ];

  async function PlaceOrder(paymentType, paymentId) {
    console.log(paymentType, paymentId);
    try {
      setIsLoading(true);

      const data = await API.setPlaceOrder(
        paymentId,
        addr.address_id,
        paymentType,
        totalCgst,
        totalSgst,
        totalIgst,
        '0',
        coinDiscount,
        '500',
      );

      if (data.success === 'true') {
        setIsLoading(false);
        ToastAlertMsg('Order Placed Successfully');

        updateCartCount({cartCount: 0});
        props.navigation.navigate('Home_');
      } else {
        setIsLoading(false);
        ToastAlertMsg('Something Went Wrong');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const OnlinePayment = async () => {
    const totalWithGst = Math.round(
      totalCartAmount + totalCgst + totalSgst + totalIgst - coinDiscount,
    ).toString();

    try {
      const razorpay = await PAYMENT.RazorpayPayment(
        userProfile,
        // parseFloat(cartTotal.replace(/,/g, '')).toString(),
        totalWithGst,
      );

      if (razorpay?.razorpay_payment_id) {
        PlaceOrder('Online', razorpay.razorpay_payment_id);
      } else {
        ToastAlertMsg('Payment Failed');
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setMinCartValue(totalCartAmount); // totalCartAmount already exists in your view
  }, [totalCartAmount]);

  if (isDataLoading) {
    return <ActivityLoader />;
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.savingContainer}>
          <Text style={styles.savingTitle}>
            You Save in this Deal {ConvertIntoRupees(cartSaving)}
          </Text>
        </View>
        <ScrollView>
          <View style={styles.checkoutContainer}>
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>Shipping Address</Text>
              {/*  <TouchableOpacity>
                <Icon name="edit" size={16} color={COLORS.PRIMARY} />
              </TouchableOpacity> */}
            </View>
            <Text style={styles.address}>
              {addr.address +
                ', ' +
                addr.landmark +
                ', ' +
                addr.city +
                ', ' +
                addr.state +
                ' - ' +
                addr.pin}
            </Text>
          </View>
          <View style={[styles.checkoutContainer, {borderBottomWidth: 0}]}>
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>Payment</Text>
            </View>

            {options.map((item, i) => (
              <TouchableOpacity
                style={styles.methodContainer}
                key={i}
                onPress={() => setPaymentType(item.key)}>
                <View style={{width: 55}}>
                  <Ionicons name={item.icon} size={30} color={COLORS.PRIMARY} />
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.paymentType}>{item.text}</Text>
                  <Text style={styles.onlinePayment}>
                    UPI, Card, Net Banking
                  </Text>
                </View>
                {paymentType === item.key ? (
                  <View style={styles.selectedCircle}>
                    <Ionicons name="checkmark" size={14} color={COLORS.WHITE} />
                  </View>
                ) : (
                  <View style={styles.circle} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/*Coupon Section */}

        <View style={{}}>
          {/*  <View style={styles.headingContainer}>
            <Text style={styles.couponTitle}>Coupon</Text>
          </View> */}
          <View style={styles.couponContainer}>
            <Image source={ICONS.DISCOUNT} style={styles.couponImage} />

            <View style={{flex: 1}}>
              <Text style={styles.applyCoupon}>Apply Coins</Text>
            </View>
            <Ionicons name="chevron-forward" color={COLORS.BLACK} size={16} />
          </View>
        </View>

        <View>
          <ScrollView horizontal={true} style={{paddingLeft: 15}}>
            {coupons.map((data, i) => (
              <CouponCard
                key={i}
                data={data}
                selectCoupon={selectedCoupon}
                minCartValue={minCartValue}
                onApplyCoupon={coupon => handleApplyCoupon(coupon)}
                onRemoveCoupon={handleRemoveCoupon}
              />
            ))}
            <View style={{paddingHorizontal: 10}} />
          </ScrollView>
        </View>

        <View style={styles.amountContainer}>
          <View style={styles.amountRowContainer}>
            <Text style={styles.amountTitle}>Total MRP:</Text>
            <Text style={styles.amount}>
              {(totalCartAmount + totalcartSaving)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>

          <View style={styles.amountRowContainer}>
            <Text style={styles.amountTitle}>Discount:</Text>
            <Text style={styles.amount}>(-) {'\u20B9' + cartSaving}</Text>
          </View>

          <View style={styles.amountRowContainer}>
            <Text style={styles.amountTitle}>Coins Applied:</Text>
            <Text style={styles.amount}>(-) ₹{coinDiscount.toFixed(2)}</Text>
          </View>

          <View style={styles.amountRowContainer}>
            <Text style={styles.amountTitle}>GST:</Text>
            {gst?.cgst && gst?.sgst ? (
              <View>
                <Text style={styles.gst}>CGST: +₹{totalCgst.toFixed(2)}</Text>
                <Text style={styles.gst}>SGST: +₹{totalSgst.toFixed(2)}</Text>
              </View>
            ) : (
              <Text style={styles.gst}>IGST: +₹{totalIgst.toFixed(2)}</Text>
            )}
          </View>

          {/*  <View style={styles.amountRowContainer}>
            <Text style={styles.amountTitle}>Shipping Charges:</Text>

            <Text style={styles.amount}>Free</Text>
          </View> */}
          <View style={styles.divider} />
          <View style={styles.amountRowContainer}>
            <Text style={styles.summaryTxt}>Total:</Text>
            <Text style={styles.summaryAmount}>
              {'\u20B9' +
                Math.round(
                  totalCartAmount +
                    totalCgst +
                    totalSgst +
                    totalIgst -
                    coinDiscount, // Subtract coins
                )
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomBtnContainer}>
        <View>
          <Text style={styles.summaryTxt}>Total:</Text>
          <Text style={styles.summaryAmount}>
            {'\u20B9' +
              Math.round(
                totalCartAmount +
                  totalCgst +
                  totalSgst +
                  totalIgst -
                  coinDiscount, // Subtract coins
              )
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.btnContainer}
          // onPress={() => PlaceOrder('Cash on Delivery', '0')}
          onPress={() => OnlinePayment()}>
          {isLoading ? (
            <ActivityIndicator color={COLORS.WHITE} size={20} />
          ) : (
            <Text style={styles.btnTxt}>Checkout</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}
