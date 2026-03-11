import React, {useRef, useState, useEffect} from 'react';
import Carousel from 'react-native-snap-carousel';
import {
  View,
  Dimensions,
  StyleSheet,
  Modal,
  TouchableHighlight,
} from 'react-native';
import {COLORS} from '../constants/colors';
import ImageLoader from './image-loader';
import ImageViewer from 'react-native-image-zoom-viewer';
const {width} = Dimensions.get('window');

export default function ProductImageCarousel({banner}) {
  const carouselRef = useRef(null);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = banner.map(option => ({
    id: option.id,
    url: option.image,
  }));

  const renderItem = ({item}) => {
    return (
      <>
        <TouchableHighlight
          onPressIn={() => setCurrentIndex(item.id)}
          onPress={() => [setIsImageVisible(true)]}
          style={styles.item}
          key={item.id}>
          <ImageLoader image={item.image} style={styles.image} />
        </TouchableHighlight>

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
      <Modal
        transparent={true}
        visible={isImageVisible}
        onRequestClose={() => setIsImageVisible(false)}>
        <ImageViewer
          backgroundColor={'rgba(0, 0, 0, 0.8)'}
          index={currentIndex}
          imageUrls={images}
        />
      </Modal>
      <Carousel
        ref={carouselRef}
        sliderWidth={width}
        sliderHeight={width}
        itemWidth={width - 20}
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
    backgroundColor: COLORS.BG,
  },
  item: {
    width: width - 20,
    marginVertical: 10,
    elevation: 3,
    borderWidth: 0,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: COLORS.BLACK,
  },

  image: {
    resizeMode: 'cover',
    width: width - 20,
    height: 275,
  },

  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  activeDot: {
    height: 6,
    width: 6,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 7,
    marginHorizontal: 3,
  },
  dot: {
    height: 4,
    width: 4,
    backgroundColor: COLORS.WHITE,
    borderRadius: 6,
    marginHorizontal: 3,
  },
});
