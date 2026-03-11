import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import InputBox from '../../../../components/input-box';
import LabelDropdown from '../../../../components/label-dropdown';
import CustomBtn from '../../../../components/custom-btn';
import ToastAlertMsg from '../../../../components/toast-alert-msg';
import API from '../../../../actions/api';

export default function StoreInfo(props) {
  const {phoneNumber, emailId, password, accessToken, userId} =
    props.route.params;

  const [storeName, setStoreName] = useState(null);
  const [addr, setAddr] = useState(null);
  const [pinCode, setPinCode] = useState(null);
  const [state, setState] = useState(null);
  const [district, setDistrict] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pinCodeList, setPinCodeList] = useState([]);

  async function fetchData() {
    try {
      const data = await API.getStateDistrictByPinCode();
      //console.log(data);

      if (data.success === 'true') {
        setPinCodeList(data.extraData.pincode);
        setState(null);
        setDistrict(null);
        setIsLoading(false);
      } else {
        ToastAlertMsg('Invalid Pin Code');
        setPinCodeList([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = async () => {
    try {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (storeName && storeName.toString().trim().length > 0) {
        if (addr && addr.toString().trim().length > 0) {
          if (pinCode && pinCode.toString().trim().length > 0) {
            props.navigation.navigate('StoreImage', {
              phoneNumber,
              emailId,
              password,
              accessToken,
              userId,
              storeName,
              addr,
              pinCode,
              state,
              district,
            });
          } else {
            ToastAlertMsg('Please Enter Pin Code');
          }
        } else {
          ToastAlertMsg('Please Enter Address');
        }
      } else {
        ToastAlertMsg('Please Enter Store Name');
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

      <View style={{padding: 15, backgroundColor: '#f0f0f0', marginBottom: 5}}>
        <View style={styles.stepsContainer}>
          <View style={styles.pendingStep}></View>
          <View style={styles.line} />
          <View style={styles.completedStep}>
            <View style={styles.activestep} />
          </View>
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{padding: 15, flex: 1}}>
          <Text style={styles.heading}>Tells us about your business</Text>
          <InputBox
            label="Store Name"
            defaultValue={storeName}
            onChangeText={text => setStoreName(text)}
          />

          <InputBox
            label="Street Address"
            defaultValue={addr}
            onChangeText={text => setAddr(text)}
          />

          <InputBox
            label="Pincode"
            defaultValue={pinCode}
            onChangeText={text => setPinCode(text)}
          />

          <LabelDropdown
            items={pinCodeList.map(n => ({
              label: n.pin,
              value: n.id,
              ...n,
            }))}
            label="Pincode"
            defaultValue={pinCode}
            onChangeItem={item => {
              setPinCode(item.value);
              setState(item.value);
              setDistrict(item.value);
            }}
            search={true}
          />

          <InputBox
            label="State"
            defaultValue={state}
            onChangeText={text => setState(text)}
          />

          <InputBox
            label="District"
            defaultValue={district}
            onChangeText={text => setDistrict(text)}
          />

          <CustomBtn
            title="Continue"
            marginVertical={20}
            onPress={() => onSubmit()}
          />
        </View>
      </ScrollView>
    </View>
  );
}
