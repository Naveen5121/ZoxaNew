import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
  StatusBar,
} from 'react-native';

import {COLORS} from '../../../../constants/colors';
import styles from './style';

import {IMAGES} from '../../../../constants/images';
import {ICONS} from '../../../../constants/icons';

export default function OrderSuccess(props) {
  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />

      <View style={styles.successContainer}>
        <View style={{alignItems: 'center'}}>
          <Image source={IMAGES.SUCCESS} style={styles.successImage} />
          <Text style={styles.success}>Order Placed Successfully!</Text>
          <Text style={styles.successMsg}>
            Your order will be delivered soon. {'\n'}Thank you for choosing our
            app!
          </Text>

          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => [props.navigation.navigate('HomeScreen')]}>
            <Text style={styles.btnTxt}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
