import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, ScrollView} from 'react-native';

import ActivityLoader from '../../../../components/activity-loader';
import ImageLoader from '../../../../components/image-loader';
import {COLORS} from '../../../../constants/colors';
import styles from './style';
import API from '../../../../actions/api';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {createPDF} from '../../../../components/share-print-bill';
import {AuthContext} from '../../../../../auth-context';
import ConvertIntoRupees from '../../../../components/convert-into-rupees';

export default function OrderDetails(props) {
  const isVisible = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const orderDetails = props.route.params;

  //  console.log('DAta ', orderDetails);
  const {userProfile} = React.useContext(AuthContext);

  console.log('PROFILE', userProfile);
  const [filePath, setFilePath] = useState(null);

  //console.log(orderDetails);

  const generatePdf = async () => {
    try {
      //  setIsLoading(true);
      const data = await createPDF(orderDetails, userProfile);

      // console.log(data);

      if (data.success) {
        setIsLoading(false);
        setFilePath(data?.filePath);
      } else {
        // props.navigation.goBack();
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  // console.log(filePath);
  useEffect(() => {
    generatePdf();
  }, []);

  return (
    <View style={styles.container}>
      {orderDetails.order_status === 'Delivered' ? (
        <TouchableOpacity
          style={styles.downloadBtn}
          // onPress={() => createPDF(bookingDetails)}
          onPress={() => props.navigation.navigate('ViewBillPdf', filePath)}>
          <Text style={styles.downlaod}>Download Invoice</Text>
          <AntDesign name="download" size={13} color={COLORS.WHITE} />
        </TouchableOpacity>
      ) : null}

      <ScrollView>
        <View style={styles.infoContainer}>
          <Text style={styles.orderNo}>Order ID #{orderDetails?.order_no}</Text>
          <Text style={styles.orderDate}>Date : {orderDetails?.date}</Text>

          <View style={styles.orderContainer}>
            <View style={styles.listConatiner}>
              <Text style={styles.listHeading}>Tracking number : </Text>
              <Text style={styles.listValue}> {orderDetails?.tracking_no}</Text>
            </View>
            {orderDetails?.order_status === 'Cancel' ? null : (
              <Text
                style={{
                  ...styles.status,
                  color:
                    orderDetails.order_status === 'Delivered'
                      ? '#2DAA4F'
                      : orderDetails.order_status === 'Cancel'
                      ? 'red'
                      : '#E19C42',
                }}>
                {orderDetails?.order_status === 'Ready For Delivery'
                  ? 'Dispatched'
                  : orderDetails?.order_status}
              </Text>
            )}
          </View>

          {orderDetails?.order_status === 'Cancel' && (
            <View style={{marginVertical: 15}}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.dotContainer}>
                  <View style={styles.dot} />
                </View>
                <View style={{flex: 1}}>
                  <Text style={[styles.cancelStatus]}>Cancelled</Text>
                  {/*  <Text style={styles.reason}>
                    {orderDetails?.cancel_order_reason}
                  </Text> */}
                </View>
              </View>
            </View>
          )}
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.orderInfoHeading}>
            {orderDetails?.product_list.length} Items in this order
          </Text>
          {orderDetails?.product_list.map((item, i) => (
            <View style={styles.card} key={i}>
              <View style={styles.imgContainer}>
                <ImageLoader image={item.product_image} style={styles.image} />
              </View>
              <View style={{flex: 1}}>
                <Text numberOfLines={2} style={styles.text}>
                  {item.product_name}
                </Text>
                <Text style={styles.text2}>Qty : {item.product_qty}</Text>
              </View>
              <Text style={styles.price}>
                {ConvertIntoRupees(item.product_salerate)}
              </Text>
            </View>
          ))}
        </View>

        {/* <View style={styles.infoContainer}>
          <Text style={styles.orderInfoHeading}>Shipping Details</Text>
          <View style={styles.orderInfoContainer}>
            <Text style={styles.orderInfo}>Name</Text>
            <Text style={styles.orderInfoValue}>
              {orderDetails?.addresse_name}
            </Text>
          </View>
          <View style={styles.orderInfoContainer}>
            <Text style={styles.orderInfo}>Phone Number</Text>
            <Text style={styles.orderInfoValue}>{orderDetails?.mobile}</Text>
          </View>
          <View style={styles.orderInfoContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.orderInfo}>Shipping Address:</Text>
            </View>
            <View style={{flex: 1.5}}>
              <Text style={[styles.orderInfo, {color: COLORS.BLACK}]}>
                {orderDetails?.address}
              </Text>
            </View>
          </View>
        </View> */}

        <View style={styles.infoContainer}>
          <Text style={styles.orderInfoHeading}>Bill Details</Text>

          <View style={styles.orderInfoContainer}>
            <Text style={styles.orderInfo}>Items price</Text>
            <Text style={styles.orderInfoValue}>
              {ConvertIntoRupees(orderDetails?.total_amt)}
            </Text>
          </View>

          <View style={styles.orderInfoContainer}>
            <Text style={styles.orderInfo}>GST</Text>
            <View>
              {parseFloat(orderDetails.igst) > 0 ? (
                <Text style={styles.orderInfoValueGst}>
                  IGST: {ConvertIntoRupees(orderDetails?.igst)}
                </Text>
              ) : (
                <>
                  <Text style={styles.orderInfoValueGst}>
                    CGST: {ConvertIntoRupees(orderDetails?.cgst)}
                  </Text>
                  <Text style={styles.orderInfoValueGst}>
                    SGST: {ConvertIntoRupees(orderDetails?.sgst)}
                  </Text>
                </>
              )}
            </View>
          </View>

          <View style={styles.orderInfoContainer}>
            <Text style={styles.orderInfo}>Subtotal</Text>
            <Text style={styles.orderInfoValue}>
              ₹
              {Math.round(
                parseFloat(orderDetails?.total_amt) +
                  parseFloat(orderDetails?.cgst) +
                  parseFloat(orderDetails?.sgst) +
                  parseFloat(orderDetails?.igst),
              )}
            </Text>
          </View>

          {/* <View style={styles.orderInfoContainer}>
         <Text style={styles.orderInfo}>Coupon Discount</Text>
         <Text style={[styles.orderInfoValue, {color: COLORS.RED}]}>
           (-) {'\u20B9' + 0}
         </Text>
       </View> */}
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.orderInfoHeading}>Payment Method</Text>

          <View style={styles.orderInfoContainer}>
            <Text style={styles.orderInfo}>Mode of Payment</Text>
            <Text style={styles.orderInfoValue}>
              {orderDetails?.payment_type}
            </Text>
          </View>

          {orderDetails?.payment_type !== 'Cash on Delivery' && (
            <View style={styles.orderInfoContainer}>
              <Text style={styles.orderInfo}>Payment ID</Text>
              <Text style={styles.orderInfoValue}>
                {orderDetails?.payment_id}
              </Text>
            </View>
          )}

          {/* <View style={styles.orderInfoContainer}>
         <Text style={styles.orderInfo}>Coupon Discount</Text>
         <Text style={[styles.orderInfoValue, {color: COLORS.RED}]}>
           (-) {'\u20B9' + 0}
         </Text>
       </View> */}
        </View>
      </ScrollView>
    </View>
  );
}
