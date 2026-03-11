import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import ProductImageCarousel from '../../../../components/product-image-carousel';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../../constants/colors';
//import API from '../../../../action/api';
import ToastAlertMsg from '../../../../components/toast-alert-msg';
import ActivityLoader from '../../../../components/activity-loader';
import {AuthContext} from '../../../../../auth-context';
import ConvertIntoRupees from '../../../../components/convert-in-rupees';
import {RadioButton} from 'react-native-paper';
import API from '../../../../actions/api';

export default function ProductDetails(props) {
  const productDetails = props.route.params;

  const {updateCartCount} = React.useContext(AuthContext).authContext;
  const {userProfile} = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);

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

  const onSubmit = async () => {
    if (!selectedRate) {
      ToastAlertMsg('Please select a price option first');
      return;
    }

    try {
      setIsBtnLoading(true);

      const data = await API.setAddToCart(
        productDetails.id,
        selectedRate.min_qty,
        selectedRate.price_per_unit,
        '1',
        productDetails?.gst,
        '0',
      );

      if (data.success === 'true') {
        setIsBtnLoading(false);
        updateCart();
        ToastAlertMsg('Product Added To Cart');
      } else {
        setIsBtnLoading(false);
        ToastAlertMsg('Something Went Wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {isBtnLoading && <ActivityLoader isLoading={isBtnLoading} />}
        <View>
          <ProductImageCarousel
            banner={productDetails.image.map((option, i) => ({
              id: i,
              image: option,
            }))}
          />
          <View style={{padding: 15}}>
            <Text numberOfLines={1} style={styles.productName}>
              {productDetails?.itemname}
            </Text>
            {/* <Text style={styles.price}>
              {ConvertIntoRupees(productDetails.salerate)}
            </Text>
 */}
            <Text style={styles.heading}>Description</Text>
            <Text style={styles.info}>{productDetails.disc}</Text>

            {productDetails?.description &&
              productDetails.description.some(
                item =>
                  Object.keys(item)[0]?.trim() !== '' ||
                  Object.values(item)[0]?.trim() !== '',
              ) && (
                <View>
                  <Text style={styles.heading}>Product Description</Text>
                  <View style={styles.table}>
                    <View style={styles.tableHeader}>
                      <Text style={styles.headerText}>Title</Text>
                      <Text style={styles.headerText}>Details</Text>
                    </View>
                    <FlatList
                      data={productDetails.description}
                      keyExtractor={(item, index) => index.toString()}
                      nestedScrollEnabled={true}
                      renderItem={({item}) => (
                        <View style={styles.tableRow}>
                          <Text style={styles.cellText}>
                            {Object.keys(item)[0]}
                          </Text>
                          <Text style={styles.cellText}>
                            {Object.values(item)[0]}
                          </Text>
                        </View>
                      )}
                    />
                  </View>
                </View>
              )}

            {productDetails?.feature &&
              productDetails.feature.some(
                item =>
                  Object.keys(item)[0]?.trim() !== '' ||
                  Object.values(item)[0]?.trim() !== '',
              ) && (
                <View>
                  <Text style={styles.heading}>Product Features</Text>
                  <View style={styles.table}>
                    <View style={styles.tableHeader}>
                      <Text style={styles.headerText}>Title</Text>
                      <Text style={styles.headerText}>Details</Text>
                    </View>
                    <FlatList
                      data={productDetails.feature}
                      keyExtractor={(item, index) => index.toString()}
                      nestedScrollEnabled={true}
                      renderItem={({item}) => (
                        <View style={styles.tableRow}>
                          <Text style={styles.cellText}>
                            {Object.keys(item)[0]}
                          </Text>
                          <Text style={styles.cellText}>
                            {Object.values(item)[0]}
                          </Text>
                        </View>
                      )}
                    />
                  </View>
                </View>
              )}

            {productDetails?.specification &&
              productDetails.specification.some(
                item =>
                  Object.keys(item)[0]?.trim() !== '' ||
                  Object.values(item)[0]?.trim() !== '',
              ) && (
                <View>
                  <Text style={styles.heading}>Product Specifications</Text>
                  <View style={styles.table}>
                    <View style={styles.tableHeader}>
                      <Text style={styles.headerText}>Title</Text>
                      <Text style={styles.headerText}>Details</Text>
                    </View>
                    <FlatList
                      data={productDetails.specification}
                      keyExtractor={(item, index) => index.toString()}
                      nestedScrollEnabled={true}
                      renderItem={({item}) => (
                        <View style={styles.tableRow}>
                          <Text style={styles.cellText}>
                            {Object.keys(item)[0]}
                          </Text>
                          <Text style={styles.cellText}>
                            {Object.values(item)[0]}
                          </Text>
                        </View>
                      )}
                    />
                  </View>
                </View>
              )}

            <Text style={styles.heading}>Price</Text>

            {productDetails ? (
              <View style={styles.tableContainer}>
                {/* Table Header */}
                <View style={styles.tableHeader2}>
                  <Text style={styles.headerText2}>Select</Text>
                  <Text style={styles.headerText2}>Quantity</Text>
                  <Text style={styles.headerText2}>Price</Text>
                </View>

                {/* Table Rows */}
                <FlatList
                  data={productDetails.item_rate}
                  keyExtractor={(item, index) => index.toString()}
                  nestedScrollEnabled={true}
                  renderItem={({item, index}) => (
                    <View style={styles.tableRow2}>
                      {/* Radio Button */}
                      <RadioButton
                        value={index}
                        status={selectedRate === item ? 'checked' : 'unchecked'}
                        onPress={() => setSelectedRate(item)}
                      />

                      {/* Quantity */}
                      <Text style={styles.cellText2}>
                        {item.min_qty}-{item.max_qty}
                      </Text>

                      {/* Discounted Price */}
                      <Text style={styles.cellText2}>
                        ₹{parseFloat(item.price_per_unit).toFixed(2)}
                      </Text>
                    </View>
                  )}
                />
              </View>
            ) : (
              <Text style={styles.loadingText}>Loading...</Text>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBtnContainer}>
        {productDetails.stock > 0 ? (
          <TouchableOpacity style={styles.btn} onPress={() => onSubmit()}>
            <Ionicons name={'cart'} size={18} color={COLORS.WHITE} />
            <Text style={styles.bottomBtnTxt}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => ToastAlertMsg('Product Availble Soon')}>
            <Ionicons name={'cart'} size={18} color={COLORS.WHITE} />
            <Text style={styles.bottomBtnTxt}>Out Of Stock</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}
