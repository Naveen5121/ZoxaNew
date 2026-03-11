import React, {useState} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {COLORS} from '../constants/colors';
import {ICONS} from '../constants/icons';
import {IMAGES} from '../constants/images';

export default function ImageLoader(props) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const noImage =
    props.image === 'https://test3.easytipsntricks.com/product-images/'
      ? true
      : false;

  return (
    <>
      {isImageLoading && noImage === false ? (
        <View style={[props.style, styles.loader]}>
          <Image source={IMAGES.LOADER} style={{height: 30, width: 30}} />
        </View>
      ) : null}

      <Image
        source={{
          uri: props.image,
        }}
        style={props.style}
        resizeMode="stretch"
        onLoadEnd={() => setIsImageLoading(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
  },
});
