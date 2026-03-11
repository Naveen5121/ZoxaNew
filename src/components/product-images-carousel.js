import React, {useRef, useState, useEffect} from 'react';
import Carousel from 'react-native-snap-carousel';
import {View, Dimensions, StyleSheet, Image} from 'react-native';
import {COLORS} from '../constants/colors';
// import {IMAGES} from '../constants/images';
// import ImageLoader from './image-loader';
const {width} = Dimensions.get('window');

export default function ProductImagesCarousel({}) {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const banner = [
    {
      img: require('../assets/icons/tomato.png'),
      id: 0,
    },
    {
      img: require('../assets/icons/tomato.png'),
      id: 1,
    },
    {
      img: require('../assets/icons/tomato.png'),
      id: 2,
    },
    {
      img: require('../assets/icons/tomato.png'),
      id: 3,
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View style={styles.item} key={item.id}>
        <Image source={item.img} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={width}
        sliderHeight={width}
        itemWidth={width}
        data={banner}
        renderItem={renderItem}
        hasParallaxImages={true}
        autoplay={true}
        loop={true}
        onSnapToItem={x => {
          setActiveIndex(x);
        }}
      />
      <View style={styles.dotContainer}>
        {banner.map((data, i) => (
          <View
            key={i}
            style={
              activeIndex === parseInt(data.id) ? styles.activeDot : styles.dot
            }
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    // marginBottom: 10,
    //paddingBottom: 10,
    // paddingTop: 5,
  },
  item: {
    width: width,
    height: width + 25,
    marginBottom: 10,
    // elevation: 3,
    borderWidth: 0,
    borderRadius: 0,
    overflow: 'hidden',
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
  },
  image: {
    resizeMode: 'contain',
    width: width - 10,
    height: width + 25,
    //backgroundColor: 'pink',
  },

  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  activeDot: {
    height: 8,
    width: 8,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
  dot: {
    height: 5,
    width: 5,
    borderRadius: 3.5,
    backgroundColor: COLORS.GREY,

    marginHorizontal: 2.5,
  },
});
