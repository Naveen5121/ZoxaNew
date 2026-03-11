import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import styles from './style';

import {useIsFocused} from '@react-navigation/native';
import API from '../../../../actions/api';
import ActivityLoader from '../../../../components/activity-loader';
import AllProductCard from '../../../../components/all-product-card';
import NoRecords from '../../../../components/no-records';
import ToastAlertMsg from '../../../../components/toast-alert-msg';
import {AuthContext} from '../../../../../auth-context';

export default function ProductsList(props) {
  const {catId, subcatId} = props.route.params;

  console.log(catId, subcatId);

  const {userProfile} = React.useContext(AuthContext);

  const isVisible = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [noRecords, setNoRecords] = useState(false);
  const [qty, setQty] = useState('1');

  const {updateCartCount} = useContext(AuthContext).authContext;

  async function updateCart() {
    try {
      const cart = await API.getCartList('0');

      if (cart.success === 'true') {
        updateCartCount({cartCount: cart.extraData.cart.length});
      } else {
        updateCartCount({cartCount: 0});
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    try {
      const data = await API.getProductListByCatSubcatId(catId, subcatId);

      // console.log(catId, subcatId);
      if (data.success === 'true') {
        setItems(data.extraData.product);
        console.log(data.extraData.product);

        setIsLoading(false);
        setNoRecords(false);
      } else {
        // ToastAlertMsg('No Service Found');
        setItems([]);
        setIsLoading(false);
        setNoRecords(true);
      }
    } catch (error) {
      alert(error);
    }
  }

  function getPricePerUnit(itemRates, qty) {
    for (let rate of itemRates) {
      const min = parseInt(rate.min_qty);
      const max = parseInt(rate.max_qty);
      if (qty >= min && qty <= max) {
        return rate.price_per_unit;
      }
    }
    return itemRates[0]?.price_per_unit || 0;
  }

  async function addToCart(product, qty, seller, gst, type) {
    try {
      setIsLoading(true);

      const rate = getPricePerUnit(product.item_rate, qty);

      const data = await API.setAddToCart(
        product.id,
        qty,
        rate,
        seller,
        gst,
        type,
      );

      if (data.success === 'true') {
        updateCart();
        ToastAlertMsg('Product Added To Cart');
        setIsLoading(false);
      } else {
        setIsLoading(false);
        ToastAlertMsg('Something Went Wrong');
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [isVisible]);

  if (noRecords) {
    return <NoRecords title={'No Items Found..!'} />;
  }
  return (
    <ScrollView style={styles.container}>
      {isLoading && <ActivityLoader isLoading={isLoading} />}

      <View style={styles.rowWrap}>
        {items.map((data, i) => (
          <AllProductCard
            key={i}
            item={data}
            addToCart={() => addToCart(data, qty, '1', data?.gst, '0')}
            removeQty={() => qty > 1 && setQty(qty - 1)}
            addQty={() => qty < 10 && setQty(qty + 1)}
            qty={qty}
          />
        ))}
      </View>
    </ScrollView>
  );
}
