import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import {useNavigation} from '@react-navigation/native';
import ImageLoader from './image-loader';
import ConvertIntoRupees from './convert-in-rupees';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

export default function AllProductCard({
  item,
  addToCart,
  addQty,
  removeQty,
  qty,
}) {
  const navigation = useNavigation();

  const lastItemRate = item.item_rate?.[item.item_rate.length - 1];

  const discountUnit = lastItemRate?.discount_percent;
  const minqty = lastItemRate?.min_qty;
  const pricePerUnit = lastItemRate?.price_per_unit;

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetails', item)}>
        {item.stock === 0 ? (
          <Image
            source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/002/191/994/non_2x/sorry-temporarily-out-of-stock-sign-vector.jpg',
            }}
            style={styles.img}
          />
        ) : (
          <ImageLoader image={item.image[0]} style={styles.img} />
        )}
        <Text style={styles.offertxt}>
          {discountUnit} %{'\n'}off
        </Text>
      </TouchableOpacity>

      <View style={{justifyContent: 'space-between', flex: 1, padding: 10}}>
        <View>
          <Text style={styles.name} numberOfLines={2}>
            {item.itemname}
          </Text>

          {item.stock === 0 ? (
            <Text style={{...styles.price, color: 'red'}}>Out of Stock</Text>
          ) : (
            <>
              <Text style={styles.price}>
                {ConvertIntoRupees(
                  item.item_rate?.[0]?.price_per_unit || item.salerate,
                )}
              </Text>
              {/*<Text style={styles.price}>{ConvertIntoRupees(item.salerate)}</Text> */}
            </>
          )}

          {/*  <View style={styles.slabrowcontainer}>
          <Text style={styles.pcs}>
            {minqty}+pc{'    '}
          </Text>
          <Text style={styles.slabprice}>
            {ConvertIntoRupees(pricePerUnit)}{' '}
          </Text>
          <Text style={styles.off}>{discountUnit}% OFF</Text>
           </View> */}

          {item.item_rate?.slice(0, 3).map((rate, index) => (
            <View key={index} style={styles.slabrowcontainer}>
              <Text style={styles.pcs}>
                {rate.min_qty} - {rate.max_qty} Units
              </Text>
              <Text style={styles.slabprice}>
                {ConvertIntoRupees(rate.price_per_unit)}
              </Text>
              <Text style={styles.off}>{rate.discount_percent}% OFF</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.Btnrow2}>
        <View style={styles.Btnrow}>
          <TouchableOpacity style={styles.toggleBtn} onPress={removeQty}>
            <Ionicons name="remove-outline" color={COLORS.WHITE} size={16} />
          </TouchableOpacity>
          <Text style={styles.qty}>{qty || '1'}</Text>
          <TouchableOpacity style={styles.toggleBtn} onPress={addQty}>
            <Ionicons name="add-outline" color={COLORS.WHITE} size={16} />
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 3.5}} />
        <TouchableOpacity style={styles.addBtn} onPress={addToCart}>
          <Text style={styles.addBtnTxt}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width / 2 - 10.5,

    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: COLORS.WHITE,
    elevation: 2.5,
    borderWidth: 1,
    borderColor: COLORS.EXTRALIGHT_GREY,
    margin: 2,
  },
  img: {
    height: 125,
    width: width / 2 - 17.5,
    // resizeMode: 'contain',
  },
  name: {
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.BLACK,
    fontSize: 13,
  },

  price: {
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.BLACK,
    fontSize: 14,
    marginTop: 2.5,
  },
  iconBox: {
    backgroundColor: COLORS.PRIMARY,
    padding: 5,
    borderRadius: 5,
  },
  addBtn: {
    height: 30,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 6,
  },
  addBtnTxt: {
    fontSize: 12.5,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primary,
  },
  offertxt: {
    fontSize: 10,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primaryMedium,
    textAlign: 'center',
    transform: [{rotate: '360deg'}],
    paddingHorizontal: 10.5,
    paddingVertical: 5,
    backgroundColor: COLORS.PRIMARY,
    position: 'absolute',
    //borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    textTransform: 'uppercase',
  },
  slabrowcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pcs: {
    paddingHorizontal: 2.5,
    paddingVertical: 1,
    backgroundColor: COLORS.LIGHT_BG,
    fontSize: 10,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
    //width: 35,
    // marginRight: 5,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  slabprice: {
    fontSize: 10,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
  off: {
    fontSize: 10,
    color: COLORS.GREEN,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
  toggleBtn: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
  },
  Btnrow: {
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: COLORS.PRIMARY,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    borderRadius: 5,
    overflow: 'hidden',
  },
  Btnrow2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    padding: 5,
  },
  qty: {
    fontSize: 12,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
    marginHorizontal: 15,
  },
});
