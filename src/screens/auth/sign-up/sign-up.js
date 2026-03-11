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

import Modal from 'react-native-modal';

import OTPInputView from '@twotalltotems/react-native-otp-input';
import {ICONS} from '../../../constants/icons';
import CustomBtn from '../../../components/custom-btn';
import InputBox from '../../../components/input-box';
import LabelDropdown from '../../../components/label-dropdown';
import LabelInputBox from '../../../components/label-input-box';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from '../../../constants/colors';

export default function SignUp(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEmailModalVisible, setEmailModalVisible] = useState(false);

  const [phoneNo, setPhoneNo] = useState(
    props.route.params?.phoneNumber || null,
  );
  // console.log(phoneNo);
  const [vendorType, setVendorType] = useState(null);
  const [emailId, setEmailId] = useState(null);
  const [password, setPassword] = useState(null);
  const [cPassword, setCPassword] = useState(null);
  const [checked, setChecked] = React.useState(false);

  const [isPhoneVerified, setIsPhoneVerified] = useState(
    props.route.params?.phoneNumber ? true : false,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(undefined);

  const [brand, setBrand] = useState(null);
  const brandList = [
    {label: 'UP', id: 1},
    {label: 'Delhi', id: 2},
    {label: 'Gurgaon', id: 3},
  ];

  // const onSendOtp = async () => {
  //   try {
  //     if (phoneNo && phoneNo.toString().trim().length > 0) {
  //       setIsLoading(true);
  //       const data = await API.setLoginData(phoneNo);
  //       console.log(data);
  //       if (data.success === 'true') {
  //         setIsLoading(false);
  //         if (parseInt(data.user_status) === 0) {
  //           setModalVisible(!isModalVisible);
  //           setOtp(null);
  //         } else {
  //           ToastAlertMsg(
  //             'This Phone number is already registered with us. Please Login to continue.',
  //           );
  //         }
  //       } else {
  //         ToastAlertMsg(data.extraData);
  //         setIsLoading(false);
  //       }
  //     } else {
  //       ToastAlertMsg('Please Enter 10 digit phone Number');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const onVerifyOtp = async () => {
  //   try {
  //     if (otp) {
  //       setIsLoading(true);
  //       const data = await API.getOtpData(otp, phoneNo);
  //       console.log(data);

  //       if (data.success === 'true') {
  //         setModalVisible(!isModalVisible);
  //         setOtp(null);
  //         setIsPhoneVerified(true);
  //         setIsLoading(false);
  //         ToastAlertMsg('Phone Number Verified Successfully');
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

  // const onSubmit = async () => {
  //   try {
  //     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  //     if (phoneNo && phoneNo.toString().trim().length > 0) {
  //       if (isPhoneVerified) {
  //         if (reg.test(emailId)) {
  //           if (password && password.toString().trim().length > 0) {
  //             if (password === cPassword) {
  //               props.navigation.navigate('StoreInfo', {
  //                 //phoneNo:props.route.params?.phoneNumber,
  //                 phoneNo,
  //                 emailId,
  //                 password,
  //                 accessToken: props.route.params?.accessToken,
  //                 userId: props.route.params?.userId,
  //                 vendorType,
  //               });
  //             } else {
  //               ToastAlertMsg('Password and Confirm Password should be same');
  //             }
  //           } else {
  //             ToastAlertMsg('Please Enter Password');
  //           }
  //         } else {
  //           ToastAlertMsg('Please Enter Valid Email Id');
  //         }
  //       } else {
  //         ToastAlertMsg('Please Verify Your Phone Number with OTP');
  //       }
  //     } else {
  //       ToastAlertMsg('Please Enter 10 digit phone Number');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />

      <ScrollView
        style={{padding: 15, flex: 1, paddingTop: 20}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Sign Up</Text>

        <LabelInputBox label="Name" placeholder="Name" />

        <LabelInputBox
          label="Email"
          keyboardType="email-address"
          placeholder="Email"
        />

        <LabelInputBox
          label="Phone Number"
          placeholder="Phone Number"
          // editable={props.route.params?.phoneNumber ? false : true}
          btnTxt={'GET OTP'}
          isShowBtn={!isPhoneVerified}
          keyboardType="number-pad"
          onButtonPress={() => setModalVisible(!isModalVisible)}

          // defaultValue={phoneNo}
          // onChangeText={text => setPhoneNo(text)}
        />

        <LabelInputBox
          label="Password"
          placeholder="Password"
          // secureTextEntry={true}
        />

        <LabelDropdown
          label="State"
          title="State"
          items={brandList.map(n => ({
            label: n.label,
            value: n.id,
          }))}
          defaultValue={brand}
          onChangeItem={item => setBrand(item.value)}
        />

        <LabelDropdown
          label="Fashion Expertise"
          title="Fashion Expertise"
          items={brandList.map(n => ({
            label: n.label,
            value: n.id,
          }))}
          defaultValue={brand}
          onChangeItem={item => setBrand(item.value)}
        />

        <View style={styles.checkBoxContainer}>
          <TouchableOpacity
            style={styles.checkBox}
            onPress={() => setChecked(!checked)}>
            {checked && <Feather name="check" color={COLORS.BLACK} size={14} />}
          </TouchableOpacity>
          <Text style={styles.checkboxTitle}>
            I have read and accept the{' '}
            <Text
              style={styles.checkboxTitleBold}
              onPress={() => console.log('PrivacyPolicy')}>
              Privacy Policy
            </Text>{' '}
            and{' '}
            <Text
              style={styles.checkboxTitleBold}
              onPress={() => console.log('TersmCondition')}>
              Terms & Conditions.{' '}
            </Text>
          </Text>
        </View>
        <CustomBtn
          marginVertical={25}
          title="Sign Up"
          onPress={() => props.navigation.navigate('CreateAccount')}
          // onPress={() => onSubmit()}
        />
      </ScrollView>

      <Modal
        onBackButtonPress={() => setModalVisible(!isModalVisible)}
        isVisible={isModalVisible}>
        <View style={{justifyContent: 'center'}}>
          <View style={styles.modalContainer}>
            <Image source={ICONS.FB} style={styles.img} />
            <Text style={styles.title}>OTP Verification</Text>
            <Text style={styles.subtitle}>
              Please enter your 4 Digit One Time Password ( OTP ) sent to +91
              {'8585845652'}
            </Text>
            <View>
              <OTPInputView
                style={styles.otpInput}
                pinCount={4}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                // onCodeFilled={code => setOtp(code)}
                autoFocusOnLoad={false}
              />
            </View>
            <CustomBtn
              title="Verify"
              // onPress={() => onVerifyOtp()}
            />
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
