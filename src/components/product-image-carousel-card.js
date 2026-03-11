import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import Ionicons from 'react-native-vector-icons/Ionicons';
var {width} = Dimensions.get('window');
import {useNavigation} from '@react-navigation/native';

import Carousel from 'react-native-snap-carousel';

export default function ProductImageCarouselCard({image}) {
  const navigation = useNavigation();
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const banner = [0, 1, 2, 3];
  const renderItem = ({item}) => {
    return (
      <View style={styles.imageContainer} key={item}>
        <Image
          source={{
            uri:
              image ||
              'https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/y/s/l/-original-imagtnqjjuc6dh6v.jpeg?q=70',
          }}
          style={styles.image}
        />
      </View>
    );
  };
  return (
    <View style={styles.card}>
      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          sliderWidth={width / 2 - 25}
          // sliderHeight={width / 2}
          itemWidth={width / 2 - 25}
          data={banner}
          renderItem={renderItem}
          hasParallaxImages={true}
          loop={false}
          onSnapToItem={x => {
            setActiveIndex(x);
          }}
        />
        <View style={styles.dotContainer}>
          {banner.map((data, i) => (
            <View
              key={i}
              style={
                activeIndex === parseInt(data) ? styles.activeDot : styles.dot
              }
            />
          ))}
        </View>
        <TouchableOpacity style={styles.wishlist}>
          <Ionicons name={'heart'} size={16} color={COLORS.RED} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetails')}
        style={styles.infoContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text numberOfLines={2} style={styles.productName}>
            Samsung Galaxy S21 FE 5G with Snapdragon 888 (Lavender, 128 GB) (8
            GB RAM)
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name={'star'} size={10} color={'#ffcc00'} />
            <Text style={styles.rating}>4.5</Text>
          </View>
        </View>
        <Text style={styles.price}>500</Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <Text style={styles.mrp}>700</Text>
          <Text style={styles.productInfo}>34% OFF</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: width / 4,
    width: width / 4,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 40,
    marginTop: 30,
  },

  productName: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.DARK_GREY,
    marginBottom: 5,
    flex: 1,
  },
  productInfo: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.primaryBold,
    color: 'green',
  },

  price: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.primaryBlack,
    color: COLORS.BLACK,
    marginBottom: 2.5,
  },
  mrp: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.DARK_GREY,
    textDecorationLine: 'line-through',
    marginRight: 5,
  },

  card: {
    width: width / 2 - 25,
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 7.5,
    backgroundColor: COLORS.WHITE,
    //elevation: 2,
    //overflow: 'hidden',
  },

  imageContainer: {
    width: width / 2 - 25,
    // height: 145,
    // elevation: 3,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'orange',
  },

  wishlist: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.WHITE,
    elevation: 2,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  ratingContainer: {
    backgroundColor: COLORS.PRIMARY,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    //marginTop: 5,
    paddingHorizontal: 7.5,
    paddingVertical: 2.5,
    alignItems: 'center',
    borderRadius: 5,
  },
  rating: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primarySemiBold,
    color: COLORS.WHITE,
    marginLeft: 5,
  },

  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    // marginTop: -2.5,
  },
  activeDot: {
    height: 6,
    width: 6,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 7,
    marginHorizontal: 4,
  },
  dot: {
    height: 6,
    width: 6,
    borderRadius: 3.5,
    backgroundColor: COLORS.DARK_GREY,
    marginHorizontal: 4,
    opacity: 0.4,
  },
  carouselContainer: {
    backgroundColor: COLORS.BACKGROUNG,
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  infoContainer: {
    paddingVertical: 10,
    paddingHorizontal: 2.5,
    backgroundColor: COLORS.WHITE,
  },
});
