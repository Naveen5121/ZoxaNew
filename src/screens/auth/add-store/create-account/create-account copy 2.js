import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import InputBox from '../../../../components/input-box';
import CustomBtn from '../../../../components/custom-btn';
import Modal from 'react-native-modal';
import {ICONS} from '../../../../constants/icons';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import ToastAlertMsg from '../../../../components/toast-alert-msg';
import ActivityLoader from '../../../../components/activity-loader';
import API from '../../../../actions/api';
import LabelDropdown from '../../../../components/label-dropdown';

export default function CreateAccount(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEmailModalVisible, setEmailModalVisible] = useState(false);

  const [phoneNo, setPhoneNo] = useState(
    props.route.params?.phoneNumber || null,
  );
  const [vendorType, setVendorType] = useState(null);
  const [emailId, setEmailId] = useState(null);
  const [password, setPassword] = useState(null);
  const [cPassword, setCPassword] = useState(null);

  const [isPhoneVerified, setIsPhoneVerified] = useState(
    props.route.params?.phoneNumber ? true : false,
  );
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(undefined);

  const onSendOtp = async () => {
    try {
      if (phoneNo && phoneNo.toString().trim().length === 10) {
        setIsLoading(true);
        const data = await API.setLoginData(phoneNo);
        console.log(data);
        if (data.success === 'true') {
          setIsLoading(false);
          if (parseInt(data.user_status) === 0) {
            setModalVisible(!isModalVisible);
            setOtp(null);
          } else {
            ToastAlertMsg(
              'This Phone number is already registered with us. Please Login to continue.',
            );
          }
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

  const onVerifyOtp = async () => {
    try {
      if (otp) {
        setIsLoading(true);
        const data = await API.getOtpData(otp, phoneNo);
        console.log(data);

        if (data.success === 'true') {
          setModalVisible(!isModalVisible);
          setOtp(null);
          setIsPhoneVerified(true);
          setIsLoading(false);
          ToastAlertMsg('Phone Number Verified Successfully');
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

  const onSendEmailOtp = async () => {
    try {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(emailId)) {
        setIsLoading(true);
        const data = await API.setSendEmailOtp(emailId);
        console.log(data);
        if (data.success === 'true') {
          setIsLoading(false);
          if (parseInt(data.user_status) === 0) {
            setEmailModalVisible(!isEmailModalVisible);
          } else {
            ToastAlertMsg(
              'This Email number is already registered with us. Please Login to continue.',
            );
          }
        } else {
          ToastAlertMsg(data.extraData);
          setIsLoading(false);
        }
      } else {
        ToastAlertMsg('Please Enter Valid Email Id');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const onVerifyEmailOtp = async () => {
  //   try {
  //     if (otp) {
  //       setIsLoading(true);
  //       const data = await API.setVerifyEmailOtp(otp, emailId);
  //       console.log(data);

  //       if (data.success === 'true') {
  //         setEmailModalVisible(!isEmailModalVisible);
  //         setIsEmailVerified(true);
  //         setIsLoading(false);
  //         ToastAlertMsg('Email ID Verified Successfully');
  //       } else {
  //         ToastAlertMsg('Invalid OTP, Please insert again.');
  //         setIsLoading(false);
  //       }
  //     } else {
  //       ToastAlertMsg('Please Enter OTP');
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.log(error);
  //   }
  // };

  const onSubmit = async () => {
    try {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (phoneNo && phoneNo.toString().trim().length === 10) {
        if (isPhoneVerified) {
          if (reg.test(emailId)) {
            if (password && password.toString().trim().length > 0) {
              if (password === cPassword) {
                props.navigation.navigate('StoreInfo', {
                  phoneNo,
                  emailId,
                  password,
                  accessToken: props.route.params?.accessToken,
                  userId: props.route.params?.userId,
                  vendorType,
                });
              } else {
                ToastAlertMsg('Password and Confirm Password should be same');
              }
            } else {
              ToastAlertMsg('Please Enter Password');
            }
          } else {
            ToastAlertMsg('Please Enter Valid Email Id');
          }
        } else {
          ToastAlertMsg('Please Verify Your Phone Number with OTP');
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
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <ScrollView>
        <View
          style={{padding: 15, backgroundColor: '#f0f0f0', marginBottom: 5}}>
          <View style={styles.stepsContainer}>
            <View style={styles.completedStep}>
              <View style={styles.activestep} />
            </View>
            <View style={styles.line} />
            <View style={styles.pendingStep}></View>
            <View style={styles.line} />
            <View style={styles.pendingStep}></View>
            <View style={styles.line} />
            <View style={styles.pendingStep}></View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>Create Account</Text>
            <Text style={styles.text}>Store Information</Text>
            <Text style={styles.text}>Store Images</Text>
            <Text style={styles.text}>Bank and GST{'\n'}Details</Text>
          </View>
        </View>

        <View style={{padding: 15, flex: 1}}>
          <Text style={styles.heading}>Create your merchant Id</Text>

          <LabelDropdown
            items={[
              {label: 'Restaurant', value: '0'},
              {label: 'Grocery', value: '1'},
            ]}
            label="Type"
            defaultValue={vendorType}
            onChangeItem={item => {
              console.log(item);
              setVendorType(item.value);
            }}
          />

          <InputBox
            label="Your phone number"
            defaultValue={phoneNo}
            onChangeText={text => setPhoneNo(text)}
            editable={props.route.params?.phoneNumber ? false : true}
            btnTxt={'GET OTP'}
            isShowBtn={!isPhoneVerified}
            keyboardType="number-pad"
            onButtonPress={() => onSendOtp()}
          />

          <InputBox
            label="Your email address"
            defaultValue={emailId}
            onChangeText={text => setEmailId(text)}
            keyboardType="email-address"
          />
          <InputBox
            label="Create Password"
            placeholder="*********"
            secureTextEntry={true}
            defaultValue={password}
            onChangeText={text => setPassword(text)}
          />
          <InputBox
            label="Confirm your Password"
            placeholder="********"
            secureTextEntry={true}
            defaultValue={cPassword}
            onChangeText={text => setCPassword(text)}
          />
        </View>
      </ScrollView>
      <View style={{marginHorizontal: 15}}>
        <CustomBtn
          marginVertical={25}
          title="create account"
          //onPress={() => setModalVisible(!isModalVisible)}
          onPress={() => onSubmit()}
        />
      </View>

      <Modal
        onBackButtonPress={() => setModalVisible(!isModalVisible)}
        isVisible={isModalVisible}>
        <View style={{justifyContent: 'center'}}>
          <View style={styles.modalContainer}>
            <Image source={ICONS.VERIFY} style={styles.img} />
            <Text style={styles.title}>OTP Verification</Text>
            <Text style={styles.subtitle}>
              Please enter your 4 Digit One Time Password ( OTP ) sent to +91{' '}
              {phoneNo}
            </Text>
            <View>
              <OTPInputView
                style={styles.otpInput}
                pinCount={4}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={code => setOtp(code)}
                autoFocusOnLoad={false}
              />
            </View>
            <CustomBtn title="Verify" onPress={() => onVerifyOtp()} />
          </View>
        </View>
      </Modal>

      <Modal
        onBackButtonPress={() => setEmailModalVisible(!isEmailModalVisible)}
        isVisible={isEmailModalVisible}>
        <View style={{justifyContent: 'center'}}>
          <View style={styles.modalContainer}>
            <Image source={ICONS.VERIFY} style={styles.img} />
            <Text style={styles.title}>OTP Verification</Text>
            <Text style={styles.subtitle}>
              Please enter your 4 Digit One Time Password ( OTP ) sent to{' '}
              {emailId}
            </Text>
            <View>
              <OTPInputView
                style={styles.otpInput}
                pinCount={4}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={code => setOtp(code)}
                autoFocusOnLoad={false}
              />
            </View>
            <CustomBtn title="Verify" onPress={() => onVerifyEmailOtp()} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
