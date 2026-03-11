import React, {useContext, useRef, useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../../constants/colors';
import ModalAlert from '../../../../components/modal-alert';
//import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

import ActivityLoader from '../../../../components/activity-loader';

import API from '../../../../actions/api';
import {useIsFocused} from '@react-navigation/native';

import ImageLoader from '../../../../components/image-loader';
import {AuthContext} from '../../../../../auth-context';
import NoData from '../../../../components/no-data';
import Feather from 'react-native-vector-icons/Feather';
import ToastAlertMsg from '../../../../components/toast-alert-msg';
import CustomBtn from '../../../../components/custom-btn';
import RBSheet from 'react-native-raw-bottom-sheet';
import LabelTimePicker from '../../../../components/label-time-picker';
import LabelDatePicker from '../../../../components/label-date-picker';

export default function Cart(props) {
  const isVisible = useIsFocused();
  const refRBSheet = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [emptyCart, setEmptyCart] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartSaving, setCartSaving] = useState();
  const [isModalShow, setIsModalShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const {updateCartCount} = useContext(AuthContext).authContext;

  let minCartValue = '1200';

  async function fetchData() {
    try {
      const data = await API.getCartList('0');

      if (data.success === 'true') {
        setCartList(data.extraData.cart);
        updateCartCount({cartCount: data.extraData.cart.length});

        setCartTotal(data.extraData.cart_total);
        setCartSaving(data.extraData.savings);
        setIsLoading(false);
        setEmptyCart(false);
      } else {
        setEmptyCart(true);
        setIsLoading(false);

        updateCartCount({cartCount: 0});
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchRate(product_id, qty) {
    try {
      const rateData = await API.getProductRate(product_id, qty);
      if (rateData.success === 'true' && rateData.extraData.length > 0) {
        return rateData.extraData[0].price_per_unit;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async function addQuantity(rate, qty, edit_id, product_id) {
    try {
      setIsLoading(true);
      const newQty = parseInt(qty) + 1;

      const newRate = await fetchRate(product_id, newQty);
      const updatedPrice = newRate || rate;

      const data = await API.setUpdateCart(updatedPrice, newQty, edit_id);

      if (data.success === 'true') {
        fetchData();
      } else {
        ToastAlertMsg('Something Went Wrong');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteQuantity(rate, qty, edit_id, product_id) {
    try {
      setIsLoading(true);
      if (parseInt(qty) > 1) {
        const newQty = parseInt(qty) - 1;

        const newRate = await fetchRate(product_id, newQty);
        const updatedPrice = newRate || rate;

        const data = await API.setUpdateCart(updatedPrice, newQty, edit_id);

        if (data.success === 'true') {
          fetchData();
        } else {
          ToastAlertMsg('Something Went Wrong');
        }
      } else {
        deleteItemFromCart(edit_id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteItemFromCart(edit_id) {
    try {
      const data = await API.setDeleteItemInCart(edit_id);

      if (data.success === 'true') {
        fetchData();
        setIsModalShow(false);
      } else {
        ToastAlertMsg('Something Went Wrong');
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [isVisible]);

  if (emptyCart) {
    return <NoData title={'Your Cart is Empty !'} />;
  }
  return (
    <>
      {isLoading && <ActivityLoader isLoading={isLoading} />}
      <View style={styles.container}>
        <ScrollView>
          {cartList.map((item, i) => (
            <View style={styles.card} key={i}>
              <View style={styles.imageContainer}>
                <ImageLoader image={item.image} style={styles.image} />
              </View>
              <View style={{flex: 1, marginRight: 5}}>
                <Text style={styles.text}>{item.name}</Text>

                <Text style={styles.price}>₹{item.unit_qty_price}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setEditId(item.edit_id);
                  setIsModalShow(true);
                }}
                style={styles.deletBtn}>
                <Feather name="trash" color={COLORS.BLACK} />
              </TouchableOpacity>
              <View style={styles.rowCenter}>
                <TouchableOpacity
                  style={styles.toggleBtn}
                  onPress={() =>
                    deleteQuantity(
                      item.unit_qty_price,
                      item.qty,
                      item.edit_id,
                      item.product_id,
                    )
                  }>
                  <Ionicons
                    color={COLORS.WHITE}
                    name="remove-outline"
                    size={18}
                  />
                </TouchableOpacity>
                <Text style={styles.qty}>{item.qty}</Text>
                <TouchableOpacity
                  style={styles.toggleBtn}
                  onPress={() =>
                    addQuantity(
                      item.unit_qty_price,
                      item.qty,
                      item.edit_id,
                      item.product_id,
                    )
                  }>
                  <Ionicons color={COLORS.WHITE} name="add-outline" size={18} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
        <ModalAlert
          isVisible={isModalShow}
          onClose={() => setIsModalShow(false)}
          onConfirm={() => deleteItemFromCart(editId)}
          redBtnTxt="Delete"
          btnTxt="Cancel"
          txt="Are you sure you want to delete this item from cart ?"
          heading="Delete"
        />
      </View>
      <View
        style={{
          backgroundColor: COLORS.WHITE,
          paddingHorizontal: 15,
          paddingVertical: 5,
        }}>
        <Text style={styles.bottomBtnPrice}>₹{cartTotal || 0}</Text>
        <Text style={styles.save}>save ₹{cartSaving || 0}</Text>
      </View>
      <View style={styles.bottomBtnContainer}>
        <TouchableOpacity
          style={styles.btnContainer}
          // onPress={() =>
          //   props.navigation.navigate('ViewShippingAddress', {
          //     cartTotal,
          //     cartSaving,
          //   })
          // }
          onPress={() => refRBSheet.current.open()}>
          <Text style={styles.btnTxt}>Schedule Delivery</Text>
        </TouchableOpacity>
        {/*
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            if (cartTotal >= minCartValue) {
              props.navigation.navigate('ViewShippingAddress', {
                cartTotal,
                cartSaving,
              });
            } else {
              alert(
                `Minimum order value is ₹${minCartValue}. Please add more items.`,
              );
            }
          }}>
          <Text style={styles.btnTxt}>CONTINUE</Text>
        </TouchableOpacity> */}

        <View style={{marginHorizontal: 8}} />

        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            props.navigation.navigate('ViewShippingAddress', {
              cartTotal,
              cartSaving,
            });
          }}>
          <Text style={styles.btnTxt}>Get it Now</Text>
        </TouchableOpacity>
      </View>

      <RBSheet
        ref={refRBSheet}
        useNativeDriver={true}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={350}
        customStyles={styles.Rbsheet}>
        <View style={{padding: 10}}>
          <View style={{borderTopLeftRadius: 20}}>
            <Text style={styles.bsHeading}>Schedule Delivery</Text>
            <View style={styles.divider} />

            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <LabelDatePicker
                  placeholder="Delivery Date"
                  value={startDate}
                  onSelectDate={d => setStartDate(d)}
                />
              </View>
              <View style={{marginHorizontal: 7.5}} />
              <View style={{flex: 1}}>
                <LabelTimePicker
                  placeholder="Delivery Time"
                  value={startTime}
                  onSelectDate={d => setStartTime(d)}
                />
              </View>
            </View>
            <CustomBtn
              title="Continue"
              marginVertical={20}
              onPressIn={() => refRBSheet.current.close()}
              onPress={() =>
                props.navigation.navigate('ViewShippingAddress', {
                  cartTotal,
                  cartSaving,
                  setdate: startDate,
                  settime: startTime,
                })
              }
            />
          </View>
        </View>
      </RBSheet>
    </>
  );
}
