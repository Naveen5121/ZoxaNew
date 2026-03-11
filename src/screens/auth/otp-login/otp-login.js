// OtpLogin.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  Modal,
  FlatList,
} from 'react-native';

import {IMAGES} from '../../../constants/images';
import styles from './style';
import {COLORS} from '../../../constants/colors';

import CustomBtn from '../../../components/custom-btn';
import API from '../../../actions/api';

import ActivityLoader from '../../../components/activity-loader';
import ToastAlertMsg from '../../../components/toast-alert-msg';
import LabelInputBox from '../../../components/label-input-box';

export default function OtpLogin(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNo, setPhoneNo] = useState(null);

  const onSubmit = async () => {
    try {
      if (phoneNo && phoneNo.toString().trim().length === 10) {
        setIsLoading(true);
        const data = await API.setLoginData(phoneNo);
        //  console.log(data);
        if (data.success === 'true') {
          setIsLoading(false);
          props.navigation.navigate('OtpVerification', phoneNo);
        } else {
          ToastAlertMsg(data.extraData);
          setIsLoading(false);
        }
      } else {
        ToastAlertMsg('Please Enter 10 digit phone Number');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <ActivityLoader isLoading={isLoading} />}
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />

      <View style={{flex: 1}}>
        <Image source={IMAGES.LOGO} style={styles.logo} />
        <Text style={styles.title}>User Login</Text>
        <Text style={styles.subtitle}>
          Please enter your mobile number to continue using {'\n'}this app.
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.phoneInputContainer}>
            <LabelInputBox
              label="Mobile Number"
              placeholder="Your mobile number *"
              defaultValue={phoneNo}
              onChangeText={text => setPhoneNo(text)}
              maxLength={10}
              keyboardType="number-pad"
            />
          </View>
        </View>

        <Text style={styles.otpTxt}>
          An OTP will be sent to this number for verification
        </Text>

        <CustomBtn
          marginVertical={20}
          title="Continue"
          onPress={() => onSubmit()}
        />

        {/*  <TouchableOpacity
          onPress={() => props.navigation.navigate('CreateAccount')}>
          <Text style={styles.emailLogin}>
            Login via{' '}
            <Text style={{color: COLORS.BLACK}}>Email ID & Password</Text>
          </Text>
        </TouchableOpacity> */}
      </View>

      <View>
        <Text style={styles.agreeTxt}>
          By continuing you agree to our{' '}
          <Text style={[styles.agreeTxt, {color: COLORS.PRIMARY}]}>
            Privacy Policy
          </Text>{' '}
          and{' '}
          <Text style={[styles.agreeTxt, {color: COLORS.PRIMARY}]}>
            Terms and Conditions
          </Text>
        </Text>
      </View>
    </View>
  );
}
