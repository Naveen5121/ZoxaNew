import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Image, StatusBar} from 'react-native';
import styles from './style';
import {IMAGES} from '../../../constants/images';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CustomBtn from '../../../components/custom-btn';
import API from '../../../actions/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActivityLoader from '../../../components/activity-loader';
import {AuthContext} from '../../../../auth-context';

export default function OtpVerification(props) {
  const {signIn} = React.useContext(AuthContext).authContext;
  const phoneNo = props.route.params;
  const [otp, setOtp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(false);
  const [seconds, setSeconds] = useState(30);

  const onSubmit = async () => {
    try {
      if (otp) {
        setIsLoading(true);
        const data = await API.getOtpData(otp, phoneNo);
        console.log(data);

        if (data.success === 'true' && data.user_status === '1') {
          await AsyncStorage.setItem('userId', data.user_id);
          await AsyncStorage.setItem('accessToken', data.token);

          signIn({token: data.token, id: data.user_id});
          setIsLoading(false);
        } else if (data.success === 'true' && data.user_status === '0') {
          setIsLoading(false);

          await AsyncStorage.setItem('accessToken', data.token);
          props.navigation.navigate('CreateAccount', {
            phoneNumber: phoneNo,
            accessToken: data.token,
            userId: data.user_id,
          });
        } else {
          ToastAlertMsg('Invalid OTP, Please insert again.');
          setIsLoading(false);
        }
      } else {
        ToastAlertMsg('Please Enter OTP');
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const resendOtp = async () => {
    try {
      const data = await API.setLoginData(phoneNo);

      if (data.success) {
        ToastAlertMsg('New OTP has been sent successfully.');
        setTimer(false);
        setSeconds(30);
      } else {
        ToastAlertMsg('Something went wrong ..!');
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds(0);
      setTimer(true);
    }
  }, [seconds]);

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />

      <View style={styles.container}>
        {isLoading && <ActivityLoader isLoading={isLoading} />}
        <View>
          <Image source={IMAGES.LOGO} style={styles.logo} />

          <Text style={styles.heading}>OTP Verification</Text>
          <Text style={styles.title}>
            Enter the OTP verification code from the phone we just sent you in
            +91 {phoneNo}
          </Text>
          <OTPInputView
            style={styles.otpInput}
            pinCount={4}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => setOtp(code)}
            autoFocusOnLoad={false}
          />
          <CustomBtn
            title="Verify"
            marginVertical={40}
            onPress={() => onSubmit()}
          />
        </View>

        {timer ? (
          <TouchableOpacity onPress={() => resendOtp()}>
            <Text style={styles.resendCode}>Resend Code ?</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.resendCode}>
            Resend Code in 00:
            {seconds < 10 ? `0${seconds}` : seconds}
          </Text>
        )}
      </View>
    </>
  );
}
