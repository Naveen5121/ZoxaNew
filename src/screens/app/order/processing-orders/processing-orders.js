import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import styles from './style';

import {useIsFocused} from '@react-navigation/native';

import ActivityLoader from '../../../../components/activity-loader';

import {COLORS} from '../../../../constants/colors';
import NoData from '../../../../components/no-data';
import API from '../../../../actions/api';

export default function ProcessingOrders(props) {
  const isVisible = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [ordersList, setOrdersList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const data = await API.getAllOrders();
      console.log(data);

      if (data.success === 'true') {
        setOrdersList(data.extraData.ongoing_orders);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setOrdersList([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [isVisible]);

  return (
    <>
      {isLoading && <ActivityLoader isLoading={isLoading} />}
      {ordersList.length <= 0 ? (
        <NoData title={'No Orders Found !!'} />
      ) : (
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={[COLORS.PRIMARY, COLORS.SECONDARY]}
              onRefresh={onRefresh}
              progressBackgroundColor={COLORS.WHITE}
            />
          }>
          {ordersList.map((item, i) => (
            <View style={styles.card} key={i}>
              <View style={styles.orderContainer}>
                <Text style={styles.orderNo}>Order ID #{item.order_no}</Text>
              </View>

              <View style={styles.infoContainer}>
                <View style={{flex: 1}}>
                  <View style={styles.listConatiner}>
                    <Text style={styles.listHeading}>Order Date:</Text>
                    <Text style={styles.listValue}>{item.date}</Text>
                  </View>
                  <View style={styles.listConatiner}>
                    <Text style={styles.listHeading}>Payment Method:</Text>
                    <Text style={styles.listValue}>{item.payment_type}</Text>
                  </View>
                  <View style={styles.listConatiner}>
                    <Text style={styles.listHeading}>Status:</Text>
                    <Text
                      style={{
                        ...styles.status,
                        color:
                          item.order_status === 'Pending' ? 'red' : '#2DAA4F',
                      }}>
                      {item.order_status}
                    </Text>
                  </View>

                  <View style={styles.listConatiner}>
                    <Text style={styles.listHeading}>Total:</Text>
                    <Text style={styles.listValue}>
                      {'\u20B9' +
                        parseFloat(
                          item.total_amt.replace(/,/g, '') || 0,
                        ).toFixed(2)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.detailsBtn}
                  onPress={() =>
                    props.navigation.navigate('OrderDetails', item)
                  }>
                  <Text style={styles.details}>View Details {'>>'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <View style={{marginVertical: 10}} />
        </ScrollView>
      )}
    </>
  );
}
