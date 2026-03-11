import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './style';
import InputBox from '../../../../components/input-box';
import CustomBtn from '../../../../components/custom-btn';
import Modal from 'react-native-modal';
import {ICONS} from '../../../../constants/icons';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import ToastAlertMsg from '../../../../components/toast-alert-msg';
import ActivityLoader from '../../../../components/activity-loader';

import LabelDropdown from '../../../../components/label-dropdown';
import API from '../../../../actions/api';

export default function CreateAccount(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEmailModalVisible, setEmailModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [phoneNo, setPhoneNo] = useState(
    props.route.params?.phoneNumber || null,
  );
  const [ownerName, setOwnerName] = useState(null);
  const [emailId, setEmailId] = useState(null);

  const [state, setState] = useState(null);
  const [stateList, setStateList] = useState([]);
  const [city, setCity] = useState(null);
  const [cityList, setCityList] = useState([]);
  const [pincode, setPincode] = useState(null);
  const [pinCodeList, setPinCodeList] = useState([]);

  async function fetchData() {
    try {
      const data = await API.getStateList();
      console.log(data);

      if (data.success === 'true') {
        setStateList(data.extraData.state);
        setIsLoading(false);
      } else {
        ToastAlertMsg('Something went wrong');
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchDistictByState(id) {
    console.log(id);
    try {
      setIsLoading(true);
      setState(id);
      setPincode(null);
      setPinCodeList([]);
      setCity(null);
      setCityList([]);
      const data = await API.getDistrictListByStateId(id);
      console.log(data);

      if (data.success === 'true') {
        setCityList(data.extraData.city);
        setIsLoading(false);
      } else {
        setCityList([]);
        setCity(null);
        ToastAlertMsg('No Records');
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchPinCodeByDistict(id) {
    try {
      setIsLoading(true);
      setCity(id);
      setPincode(null);
      setPinCodeList([]);
      const data = await API.getPinCodeListByDistrictId(id, state);
      console.log(data);

      if (data.success === 'true') {
        setPinCodeList(data.extraData.pincode);
        setIsLoading(false);
      } else {
        setPinCodeList([]);
        setPincode(null);
        ToastAlertMsg('No Records');
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = async () => {
    try {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (phoneNo && phoneNo.toString().trim().length > 0) {
        if (reg.test(emailId)) {
          if (ownerName && ownerName.toString().trim().length > 0) {
            if (state && state.toString().trim().length > 0) {
              if (city && city.toString().trim().length > 0) {
                if (pincode && pincode.toString().trim().length > 0) {
                  props.navigation.navigate('StoreInfo', {
                    //phoneNo:props.route.params?.phoneNumber,
                    ownerName,
                    phoneNo,
                    emailId,
                    state,
                    city,
                    pincode,
                    accessToken: props.route.params?.accessToken,
                    userId: props.route.params?.userId,
                  });
                } else {
                  ToastAlertMsg('Please Select PinCode');
                }
              } else {
                ToastAlertMsg('Please Select City');
              }
            } else {
              ToastAlertMsg('Please Select State');
            }
          } else {
            ToastAlertMsg('Please Enter Owner Name');
          }
        } else {
          ToastAlertMsg('Please Enter Valid Email Id');
        }
      } else {
        ToastAlertMsg('Please Enter 10 digit phone Number');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
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
            <Text style={styles.inactivetext}>Company Information</Text>
            <Text style={styles.inactivetext}>Business Images</Text>
            <Text style={styles.inactivetext}>Bank and GST{'\n'}Details</Text>
          </View>
        </View>

        <View style={{padding: 15, flex: 1}}>
          <Text style={styles.heading}>Add your Personal Details</Text>

          <InputBox
            placeholder="Owner Name*"
            defaultValue={ownerName}
            onChangeText={text => setOwnerName(text)}
          />

          <InputBox
            placeholder="Your phone number"
            defaultValue={phoneNo}
            onChangeText={text => setPhoneNo(text)}
            editable={props.route.params?.phoneNumber ? false : true}
            // btnTxt={'GET OTP'}
            //isShowBtn={!isPhoneVerified}
            keyboardType="number-pad"
            // onButtonPress={() => onSendOtp()}
          />

          <InputBox
            placeholder="Your email address"
            defaultValue={emailId}
            onChangeText={text => setEmailId(text)}
            keyboardType="email-address"
          />

          <LabelDropdown
            label="Select State"
            items={stateList.map(n => ({
              label: n.name,
              value: n.id,
            }))}
            placeholder="State"
            defaultValue={state}
            onChangeItem={item => fetchDistictByState(item.value)}
          />

          <LabelDropdown
            label="Select City"
            items={cityList.map(n => ({
              label: n.name,
              value: n.id,
            }))}
            placeholder="Distict"
            defaultValue={city}
            onChangeItem={item => fetchPinCodeByDistict(item.value)}
          />

          <LabelDropdown
            label="Select PinCode"
            items={pinCodeList.map(n => ({
              label: n.pin,
              value: n.id,
            }))}
            placeholder="Pin Code"
            defaultValue={pincode}
            onChangeItem={item => setPincode(item.value)}
          />

          {/* <InputBox
            label="Confirm your Password"
            placeholder="********"
            secureTextEntry={true}
            defaultValue={password}
            onChangeText={text => setPassword(text)}
          /> */}
        </View>
      </ScrollView>
      <View style={{marginHorizontal: 15}}>
        <CustomBtn
          marginVertical={25}
          title="create account"
          //onPress={() => setModalVisible(!isModalVisible)}
          onPress={() => onSubmit()}
          // onPress={() => props.navigation.navigate('StoreInfo')}
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
