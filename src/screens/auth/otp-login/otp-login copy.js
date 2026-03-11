import {View, Text, TouchableOpacity, StatusBar, Image} from 'react-native';
import React, {useState} from 'react';
import style from './style';
import {IMAGES} from '../../../constants/images';
import IconInput from '../../../components/icon-input';
import CustomBtn from '../../../components/custom-btn';
import {COLORS} from '../../../constants/colors';
import API from '../../../actions/api';

import ActivityLoader from '../../../components/activity-loader';
import ToastAlertMsg from '../../../components/toast-alert-msg';

export default function OtpLogin(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNo, setPhoneNo] = useState(null);

  const onSubmit = async () => {
    try {
      if (phoneNo && phoneNo.toString().trim().length === 10) {
        setIsLoading(true);
        const data = await API.setLoginData(phoneNo);
        console.log(data);
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
    <View style={style.container}>
      {isLoading && <ActivityLoader isLoading={isLoading} />}
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />

      <View style={{flex: 1}}>
        <Image source={IMAGES.LOGO} style={style.logo} />
        <Text style={style.title}>Merchant Login</Text>
        <Text style={style.subtitle}>
          Please enter your mobile number to continue using {'\n'}this app.
        </Text>

        <IconInput
          icon="phone"
          placeholder="Your mobile number *"
          defaultValue={phoneNo}
          onChangeText={text => setPhoneNo(text)}
          keyboardType="number-pad"
        />
        <Text style={style.otpTxt}>
          An OTP will be sent in this number for verification
        </Text>

        <CustomBtn
          marginVertical={20}
          title="Continue"
          // onPress={() => props.navigation.navigate('OtpVerification')}
          onPress={() => onSubmit()}
        />
        <TouchableOpacity
          onPress={() => props.navigation.navigate('EmailPasswordLogin')}>
          <Text style={style.emailLogin}>
            Login via{' '}
            <Text style={{color: COLORS.BLACK}}>Email ID & Password</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={style.agreeTxt}>
          By continuing you agree to accept to our
          <Text style={[style.agreeTxt, {color: COLORS.SECONDARY}]}>
            {' '}
            Privacy Policy <Text style={style.agreeTxt}>and</Text> Terms and
            Conditions
          </Text>
        </Text>
      </View>
    </View>
  );
}
