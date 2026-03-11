import React, {useRef, useState, useEffect} from 'react';
import Carousel from 'react-native-snap-carousel';
import {View, Dimensions, StyleSheet, Image} from 'react-native';
import {COLORS} from '../constants/colors';
import {IMAGES} from '../constants/images';

const {width} = Dimensions.get('window');

export default function ImageCarousel({banner}) {
  const carouselRef = useRef(null);

  const [_, setBanner] = useState([]);

  const renderItem = ({item}) => {
    return (
      <>
        <View style={styles.item} key={item.id}>
          <Image source={{uri: item.image}} style={styles.image} />
        </View>
        <View style={styles.dotContainer}>
          {banner.map((data, i) => (
            <View
              key={i}
              style={item.id === data.id ? styles.activeDot : styles.dot}
            />
          ))}
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={width - 20}
        sliderHeight={width}
        itemWidth={width - 60}
        data={banner}
        renderItem={renderItem}
        hasParallaxImages={true}
        autoplay={true}
        loop={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    // marginBottom: 10,
    paddingBottom: 10,
    paddingTop: 5,
  },
  item: {
    width: width - 60,
    height: 150,
    marginVertical: 10,
    elevation: 3,
    borderWidth: 0,
    borderRadius: 10,
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
    resizeMode: 'stretch',
    width: width - 60,
    height: 150,
  },

  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
