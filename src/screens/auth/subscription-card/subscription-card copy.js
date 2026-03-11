import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS} from '../../../constants/colors';
import {IMAGES} from '../../../constants/images';
import {FONT_FAMILY} from '../../../constants/font-family';
import CustomBtn from '../../../components/custom-btn';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ToastAlertMsg from '../../../components/toast-alert-msg';
import GradientBtn from '../../../components/gradient-btn';
import API from '../../../actions/api';
import {AuthContext} from '../../../../auth-context';
import {useIsFocused} from '@react-navigation/native';
import {PAYMENT} from '../../../components/razorpay-payment';

const {height, width} = Dimensions.get('window');

export default function SubscriptionCard(props) {
  const isVisible = useIsFocused();

  const {signIn} = React.useContext(AuthContext).authContext;
  const {
    phoneNo,
    ownerName,
    emailId,
    accessToken,
    userId,
    businessType,
    companyType,
    companyName,
    companyPersonName,
    primaryEmail,
    teamEmail,
    regAddress,
    shippingAddress,
    mapLink,
    storeImage,
    gstNumber,
    panNumber,
    gstImage,
    panImage,
  } = props.route.params;

  const subscrption = [
    {id: '0', price: '599', type: '1 month'},
    {id: '1', price: '999', type: '6 month'},
  ];

  const [isLoading, setIsLoading] = useState(false);

  const [subcriptionPlan, setSubscriptionPlan] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('online');

  async function fetchData() {
    try {
      const subscription = await API.getSubscriptionList();
      console.log(subscription);

      if (subscription.success === 'true') {
        setSubscriptionPlan(subscription.extraData.subscription);
        setIsLoading(false);
      } else {
        ToastAlertMsg('Something Went Wrong');
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function buySubscription(
    paymentId,
    offPercent,
    ProductImageCarousel,
    planDurationType,
    planDuration,
  ) {
    console.log(paymentId);
    try {
      setIsLoading(true);
      const data = await API.setSubscriptionPlan(
        paymentId,
        subscriptionId,
        offPercent,
        ProductImageCarousel,
        planDurationType,
        planDuration,
      );

      if (data.succes === 'true') {
        ToastAlertMsg(data.extraData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const OnlinePayment = async () => {
    try {
      const razorpay = await PAYMENT.RazorpayPayment(
        emailId,
        phoneNo,
        ownerName,
        subs_charges,
      );
      if (razorpay?.razorpay_payment_id) {
        buySubscription(razorpay.razorpay_payment_id);
      } else {
        ToastAlertMsg('Payment failed');
      }
    } catch (error) {
      console.error('Payment Error:', error);
      ToastAlertMsg('Payment initialization failed');
    }
  };

  const onRegistration = async () => {
    try {
      setIsLoading(true);
      const data = await API.setRegistrationData(
        businessType,
        companyName,
        emailId,
        ownerName,
        shippingAddress,
        regAddress,
        companyType,
        gstNumber,
        panNumber,
        teamEmail,
        primaryEmail,
        companyPersonName,
        phoneNo,
        mapLink,
        storeImage,
        panImage,
        gstImage,
      );
      console.log(data);
      if (data.success === 'true') {
        await AsyncStorage.setItem('userId', userId);
        signIn({token: accessToken, id: userId});
        setIsLoading(false);
        ToastAlertMsg(data.extraData);
      } else {
        ToastAlertMsg(data.extraData);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isVisible]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>Select Subscription</Text>

          <View style={{padding: 15}}>
            <View>
              <View style={styles.headingContainer}>
                <Text style={styles.heading}>List</Text>
              </View>

              {subcriptionPlan.map(method => (
                <TouchableOpacity
                  key={method}
                  onPress={() => setSelectedPaymentMethod(method)}
                  style={{
                    ...styles.list,

                    marginBottom: 10,
                  }}>
                  <Ionicons
                    name={
                      selectedPaymentMethod === method
                        ? 'radio-button-on'
                        : 'radio-button-off'
                    }
                    color={COLORS.PRIMARY}
                    size={24}
                  />
                  <View style={{flex: 1, marginLeft: 15}}>
                    <Text style={styles.paymentMode}>{method.name}</Text>
                    {method === 'online' && (
                      <Text style={styles.paymentMethods} numberOfLines={1}>
                        hdh
                      </Text>
                    )}
                    {method === 'cash_on_delivery' && (
                      <Text style={styles.paymentMethods} numberOfLines={1}>
                        ddd
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}

              <CustomBtn title="Buy Now" onPress={() => buySubscription()} />
            </View>
          </View>
        </View>
      </View>
      <View style={{padding: 15, backgroundColor: COLORS.WHITE}}></View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    padding: 10,
  },
  logo: {
    height: 80,
    width: 80,
    marginBottom: 15,
  },
  type: {
    fontSize: 18,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
  rate: {
    fontSize: 26,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
  },
  title: {
    fontSize: 16,
    color: COLORS.GREY,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
  border: {
    height: 1,
    backgroundColor: COLORS.LIGHT_GREY,
    marginVertical: 5,
  },
  card: {
    borderWidth: 1,
    borderColor: COLORS.EXTRALIGHT_GREY,
    borderRadius: 10,
    padding: 12.5,
    elevation: 2.5,
    backgroundColor: COLORS.WHITE,
    width: width - 40,
    marginHorizontal: 5,
  },
  bollet: {
    fontSize: 12,
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.primary,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.TRANSPARENT_BLACK,
    // justifyContent: 'flex-end',
  },

  modalHeading: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
    flex: 1,
    textAlign: 'center',
  },

  paymentMode: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primarySemiBold,
  },
  paymentMethods: {
    fontSize: 12,
    color: COLORS.DARK_GREY,
    fontFamily: FONT_FAMILY.primarySemiBold,
  },
  heading: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
    flex: 1,
  },

  headingContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  list: {flexDirection: 'row', marginVertical: 5},
});
