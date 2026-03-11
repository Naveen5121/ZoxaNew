import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Checkbox} from 'react-native-paper';
import styles from './style';
import {useIsFocused} from '@react-navigation/native';
import {COLORS} from '../../../../../constants/colors';
import API from '../../../../../actions/api';

import ActivityLoader from '../../../../../components/activity-loader';
import ToastAlertMsg from '../../../../../components/toast-alert-msg';

export default function ViewShippingAddress(props) {
  const {cartTotal, cartSaving} = props.route.params;
  const isVisible = useIsFocused();

  const [isLoading, setIsLoading] = useState(true);
  const [addrList, setAddrList] = useState([]);

  const [addrId, setAddrId] = useState(null);
  const [addr, setAddr] = useState([]);

  async function fetchData() {
    const data = await API.getShippingAddress();
    console.log(data.extraData.address);

    if (data.success === 'true') {
      data.extraData.address.map(item => {
        if (item.default_address === '1') {
          setAddr(item);
          setAddrId(item.address_id);
        }
      });

      setAddrList(data.extraData.address);
      setIsLoading(false);
    } else {
      ToastAlertMsg('No Data');
      setIsLoading(false);
    }
  }

  async function defaultShippingAddress(address_id) {
    const data = await API.setDefaultShippingAddress(address_id);

    if (data.success === 'true') {
      fetchData();
    } else {
      ToastAlertMsg('Something Went Wrong');
    }
  }

  async function deleteShippingAddress(address_id) {
    const data = await API.setDeleteShippingAddress(address_id);

    if (data.success === 'true') {
      ToastAlertMsg('Address Deleted Successfully');
      fetchData();
    } else {
      ToastAlertMsg('Something Went Wrong');
    }
  }

  useEffect(() => {
    fetchData();
  }, [isVisible]);

  if (isLoading) {
    return <ActivityLoader />;
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          {addrList.map((item, i) => (
            <View style={styles.addressContainer} key={i}>
              <View style={styles.headingContainer}>
                <Text style={styles.heading}>{item.name}</Text>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('AddShippingAddress', {
                      name: item.name,
                      address: item.address,
                      city: item.city,
                      state: item.state,
                      pin: item.pin,
                      address_type: parseInt(item.address_type),
                      landmark: item.landmark,
                      mobile: item.mobile,
                      address_id: item.address_id,
                    })
                  }>
                  <Icon name="edit" size={16} color={COLORS.PRIMARY} />
                </TouchableOpacity>
                <View style={{marginHorizontal: 5}} />
                <TouchableOpacity
                  onPress={() => deleteShippingAddress(item.address_id)}>
                  <Icon name="trash-2" size={16} color={COLORS.PRIMARY} />
                </TouchableOpacity>
              </View>
              <Text style={styles.phoneNo}>+91 {item.mobile}</Text>
              <Text style={styles.address}>
                {item.address +
                  ', ' +
                  item.landmark +
                  ', ' +
                  item.city_name +
                  ', ' +
                  item.state_name +
                  ' - ' +
                  item.pin_name}
              </Text>
              <View style={styles.checkBoxContainer}>
                <Checkbox
                  status={
                    parseInt(item.default_address) === 0
                      ? 'unchecked'
                      : 'checked'
                  }
                  color={COLORS.PRIMARY}
                  onPress={() => defaultShippingAddress(item.address_id)}
                />
                <Text style={styles.checkBoxTitle}>Set as default address</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.addBtnContainer}>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => props.navigation.navigate('AddShippingAddress')}>
            <Icon name="plus" size={24} color={COLORS.WHITE} />
          </TouchableOpacity>
        </View>
      </View>
      {props.route.params && cartTotal && cartSaving ? (
        <View style={styles.bottomContainer}>
          <View>
            <Text style={styles.price}>{'\u20B9 ' + cartTotal}</Text>
            <Text style={styles.save}>{'save  \u20B9' + cartSaving}</Text>
          </View>

          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              addrId === null
                ? ToastAlertMsg('Please Add Address')
                : props.navigation.navigate('CartCheckout', {
                    addr,
                    cartTotal: cartTotal,
                    cartSaving: cartSaving,
                  })
            }>
            <Text style={styles.btnTxt}>CHECKOUT</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
}
