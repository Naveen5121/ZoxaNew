import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Animated,
} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import Ionicons from 'react-native-vector-icons/Ionicons';
var {width, height} = Dimensions.get('window');
import {useNavigation} from '@react-navigation/native';

//import ImageLoader from './image-loader';
import {AirbnbRating} from 'react-native-elements';

export default function SubCategoryCard({item, catId}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductsList', {
          catId: catId,
          subcatId: item.id,
          subcatName: item.name,
        })
      }
      activeOpacity={1}

      // style={styles.card}
    >
      <Animated.View style={[styles.card]}>
        <View style={styles.imgContainer}>
          <ImageBackground source={{uri: item.image}} style={styles.image} />
        </View>

        <View style={{padding: 7.5}}>
          <Text numberOfLines={1} style={styles.productName}>
            {item.name}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imgContainer: {
    width: '100%',
    aspectRatio: 1,
    padding: 4,
    // padding: 6,
  },
  productName: {
    fontSize: 11,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.BLACK,
  },
  qty: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.GREY,
  },

  price: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.PRIMARY,
  },

  mrp: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.DARK_GREY,
    textDecorationLine: 'line-through',
  },

  card: {
    width: width / 2 - 58,
    // height: width / 1.55,
    margin: 4,
    overflow: 'hidden',
    backgroundColor: COLORS.WHITE,
    borderWidth: 0.5,
    borderColor: COLORS.EXTRALIGHT_GREY,
    elevation: 2,
  },

  wishlist: {
    backgroundColor: COLORS.WHITE,

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    position: 'absolute',
    right: 10,
    top: 10,
  },

  btnTxt: {
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.WHITE,
    fontSize: 12,
    marginLeft: 5,
  },

  btn: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 27.5,
  },
  wieght: {
    fontSize: 12,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primary,
  },
  addBtn: {
    // padding: 7.5,
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    // borderBottomLeftRadius: 5,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -25,
    width: 65,
    height: 30,
    alignSelf: 'flex-end',
    marginRight: 1.5,
    borderColor: COLORS.PRIMARY,
    borderWidth: 0.8,
  },
  addBtnTxt: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.primarySemiBold,
    color: COLORS.PRIMARY,
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratenumber: {
    fontSize: 8,
    color: COLORS.GREY,
    fontFamily: FONT_FAMILY.primary,
  },
});
