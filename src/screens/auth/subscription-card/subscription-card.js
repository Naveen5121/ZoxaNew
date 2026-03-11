import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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

  const [isLoading, setIsLoading] = useState(false);

  const [subcriptionPlan, setSubscriptionPlan] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

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

  async function buySubscription(plan, paymentId) {
    try {
      setIsLoading(true);
      const response = await API.setSubscriptionPlan(
        paymentId,
        plan.id,
        plan.discount_percent,
        selectedSubscription.subs_charges,
        plan.plan_duration_type,
        plan.plan_duration,
      );

      if (response.success === 'true') {
        ToastAlertMsg(response.extraData);
        await onRegistration(); // 👉 Automatically register after subscription success
      } else {
        ToastAlertMsg(response.extraData);
      }
    } catch (error) {
      console.log(error);
      ToastAlertMsg('Subscription failed');
    } finally {
      setIsLoading(false);
    }
  }

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
        // await AsyncStorage.setItem('userId', userId);
        // signIn({token: accessToken, id: userId});
        setIsLoading(false);
        ToastAlertMsg(data.extraData);
        props.navigation.navigate('OtpLogin');
      } else {
        ToastAlertMsg(data.extraData);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuyNow = async () => {
    if (!selectedSubscription) {
      ToastAlertMsg('Please select a subscription');
      return;
    }

    const profile = {
      email_id: emailId,
      mobile_no: phoneNo,
      owner_name: ownerName,
    };

    try {
      const razorpay = await PAYMENT.RazorpayPayment(
        profile,
        selectedSubscription.subs_charges,
      );
      console.log('chegr', selectedSubscription.subs_charges);

      if (razorpay?.razorpay_payment_id) {
        await buySubscription(
          selectedSubscription,
          razorpay.razorpay_payment_id,
        );
      } else {
        ToastAlertMsg('Payment failed');
      }
    } catch (error) {
      console.error('Payment Error:', error);
      ToastAlertMsg('Payment initialization failed');
    }
  };

  useEffect(() => {
    fetchData();
  }, [isVisible]);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.modalHeading}>Select Subscription</Text>

        <View style={styles.headingContainer}></View>

        {subcriptionPlan.map(plan => (
          <TouchableOpacity
            key={plan.id}
            onPress={() => setSelectedSubscription(plan)}
            style={{
              ...styles.list,
              borderColor:
                selectedSubscription?.id === plan.id
                  ? COLORS.PRIMARY
                  : COLORS.EXTRALIGHT_GREY,
            }}>
            <Ionicons
              name={
                selectedSubscription?.id === plan.id
                  ? 'radio-button-on'
                  : 'radio-button-off'
              }
              color={COLORS.PRIMARY}
              size={24}
            />
            <View style={{marginLeft: 15, flex: 1}}>
              <Text style={styles.paymentMode}>{plan.name}</Text>
              <Text style={styles.paymentMethods}>₹{plan.subs_charges}</Text>
              <Text style={styles.duration}>
                {'Duration'}-{plan.plan_duration} Days
              </Text>
              <Text style={styles.desc} numberOfLines={2}>
                {plan.description}
              </Text>
            </View>
            <View style={styles.label}>
              {plan.type === '2' && (
                <Text style={styles.planlabel}>Premium</Text>
              )}
              {plan.type === '1' && <Text style={styles.planlabel}>Basic</Text>}
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{backgroundColor: COLORS.WHITE, padding: 7.5}}>
        <CustomBtn
          title={
            selectedSubscription
              ? `Pay Now ₹${selectedSubscription.subs_charges}`
              : 'Pay Now'
          }
          onPress={handleBuyNow}
          marginVertical={10}
        />
      </View>
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

    textAlign: 'center',
  },

  paymentMode: {
    fontSize: 16,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primarySemiBold,
  },
  paymentMethods: {
    fontSize: 14,
    color: COLORS.DARK_GREY,
    fontFamily: FONT_FAMILY.primarySemiBold,
  },
  duration: {
    fontSize: 12,
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.primarySemiBold,
  },
  desc: {
    fontSize: 12,
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.primary,
  },
  heading: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
    // flex: 1,
  },

  headingContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  list: {
    flexDirection: 'row',
    marginVertical: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: COLORS.WHITE,
    //  elevation: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.EXTRALIGHT_GREY,
  },
  label: {
    height: 17.5,
    width: 80,
    //paddingHorizontal: 5,
    backgroundColor: COLORS.SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planlabel: {
    fontSize: 12,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
});
