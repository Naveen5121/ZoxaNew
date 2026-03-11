import React from 'react';
import {ActivityIndicator} from 'react-native';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
var {width} = Dimensions.get('window');

export default function GradientBtn(props) {
  return (
    <View style={{marginVertical: props.marginVertical, alignItems: 'center'}}>
      <TouchableOpacity style={styles.btnShadow} onPress={props.onPress}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          colors={[COLORS.PRIMARY, COLORS.WHITE]}
          style={styles.gradientBtn}>
          {props.isLoading ? (
            <ActivityIndicator size="small" color={COLORS.WHITE} />
          ) : (
            <Text style={styles.gradientBtnTxt}>{props.title}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnShadow: {
    backgroundColor: COLORS.WHITE,
    elevation: 5,
    borderRadius: 20,
  },

  gradientBtn: {
    borderRadius: 20,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  gradientBtnTxt: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontFamily: FONT_FAMILY.primaryBold,
    textAlign: 'center',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
