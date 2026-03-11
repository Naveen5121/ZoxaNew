import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../../../../constants/colors';
import API from '../../../../../actions/api';

import ActivityLoader from '../../../../../components/activity-loader';
import styles from './style';
import IconInput from '../../../../../components/icon-input';
import CustomBtn from '../../../../../components/custom-btn';
import ToastAlertMsg from '../../../../../components/toast-alert-msg';
import LabelDropdown from '../../../../../components/label-dropdown';

export default function AddShippingAddress(props) {
  const [addrType, setAddrType] = useState(1);
  const [name, setName] = useState(null);
  const [mobNo, setMobNo] = useState(null);
  const [addr, setAddr] = useState(null);
  const [landmark, setLandmark] = useState(null);
  const [state, setState] = useState(null);
  const [stateList, setStateList] = useState([]);
  const [city, setCity] = useState(null);
  const [cityList, setCityList] = useState([]);
  const [pinCode, setPinCode] = useState(null);
  const [pinCodeList, setPinCodeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const type = [
    {id: 1, title: 'HOME'},
    {id: 2, title: 'WORK'},
    {id: 3, title: 'OTHER'},
  ];

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
      setPinCode(null);
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
      setPinCode(null);
      setPinCodeList([]);
      const data = await API.getPinCodeListByDistrictId(id, state);
      console.log(data);

      if (data.success === 'true') {
        setPinCodeList(data.extraData.pincode);
        setIsLoading(false);
      } else {
        setPinCodeList([]);
        setPinCode(null);
        ToastAlertMsg('No Records');
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const addAddress = () => {
    try {
      if (name && name.toString().trim().length > 0) {
        if (mobNo && mobNo.toString().trim().length === 10) {
          if (addrType && addrType.toString().trim().length > 0) {
            if (addr && addr.toString().trim().length > 0) {
              if (landmark && landmark.toString().trim().length > 0) {
                if (city && city.toString().trim().length > 0) {
                  if (state && state.toString().trim().length > 0) {
                    if (pinCode && pinCode.toString().trim().length > 0) {
                      if (props.route.params && props.route.params.address_id) {
                        updateShippingAddress();
                      } else {
                        addShippingAddress();
                      }
                    } else {
                      ToastAlertMsg('Please Enter Your PinCode');
                    }
                  } else {
                    ToastAlertMsg('Please Enter State Name');
                  }
                } else {
                  ToastAlertMsg('Please Enter City Name');
                }
              } else {
                ToastAlertMsg('Please Enter Landmark');
              }
            } else {
              ToastAlertMsg('Please Enter Address');
            }
          } else {
            ToastAlertMsg('Please Enter Address Type');
          }
        } else {
          ToastAlertMsg('Please Enter Valid Mobile Number');
        }
      } else {
        ToastAlertMsg('Please Enter Name');
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function addShippingAddress() {
    try {
      setIsBtnLoading(true);
      const data = await API.setAddShippingAddress(
        name,
        addr,
        city,
        state,
        pinCode,
        addrType,
        landmark,
        mobNo,
      );

      if (data.success === 'true') {
        ToastAlertMsg('Address Added Successfully');
        setIsBtnLoading(false);
        props.navigation.goBack();
      } else {
        ToastAlertMsg('Something Went Wrong');
        setIsBtnLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateShippingAddress() {
    try {
      setIsBtnLoading(true);
      const data = await API.setUpdateShippingAddress(
        name,
        props.route.params.address_id,
        addr,
        city,
        state,
        pinCode,
        addrType,
        landmark,
        mobNo,
      );
      //console.log(data);

      if (data.success === 'true') {
        ToastAlertMsg('Address Updates Successfully');
        setIsBtnLoading(false);
        props.navigation.goBack();
      } else {
        ToastAlertMsg(data.extraData.status);
        setIsBtnLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {isLoading && <ActivityLoader isLoading={isLoading} />}
      <View style={styles.innerContainer}>
        <IconInput
          label="Full Name"
          placeholder="Full Name"
          icon={'user'}
          keyboardType="default"
          defaultValue={name}
          onChangeText={text => setName(text)}
        />
        <IconInput
          label="Phone Number"
          placeholder="Phone Number"
          icon={'phone'}
          defaultValue={mobNo}
          onChangeText={text => setMobNo(text)}
          keyboardType={'phone-pad'}
          maxLength={10}
        />
        <IconInput
          label="Address"
          icon={'map-pin'}
          keyboardType="default"
          defaultValue={addr}
          onChangeText={text => setAddr(text)}
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
          defaultValue={pinCode}
          onChangeItem={item => setPinCode(item.value)}
        />

        <View style={styles.borderBtnContainer}>
          {type.map((item, i) => {
            return addrType === item.id ? (
              <TouchableOpacity
                key={i}
                style={styles.borderBtn}
                onPress={() => setAddrType(item.id)}>
                <Text style={styles.borderBtnTxt}>{item.title}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                key={i}
                style={styles.inactiveBorderBtn}
                onPress={() => setAddrType(item.id)}>
                <Text style={styles.inactiveBorderBtnTxt}>{item.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <IconInput
          label="Landmark"
          placeholder="Landmark"
          icon={'map-pin'}
          keyboardType="default"
          defaultValue={landmark}
          onChangeText={text => setLandmark(text)}
        />

        <CustomBtn
          title={props.route.params ? 'Update Address' : 'Save Address'}
          marginVertical={30}
          onPress={() => addAddress()}
          isLoading={isBtnLoading}
        />
      </View>
    </ScrollView>
  );
}
