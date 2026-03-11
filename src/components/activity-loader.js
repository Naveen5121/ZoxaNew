import React from 'react';
import {View, StyleSheet, Image, Modal} from 'react-native';
import {COLORS} from '../constants/colors';
import {ICONS} from '../constants/icons';
import {IMAGES} from '../constants/images';

export default function ActivityLoader({isLoading}) {
  return (
    <Modal
      statusBarTranslucent={true}
      animationType="fade"
      transparent
      visible={isLoading}>
      <View style={styles.container}>
        <View style={styles.loaderContainer}>
          <Image source={IMAGES.LOADER} style={styles.loader} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.TRANSPARENT_BLACK,
  },
  loader: {height: 60, width: 60},
  loaderContainer: {
    height: 100,
    width: 100,
    backgroundColor: COLORS.WHITE,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
