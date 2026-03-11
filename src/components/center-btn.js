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

export default function CenterBtn(props) {
  return (
    <View style={{marginVertical: props.marginVertical}}>
      <TouchableOpacity style={styles.btnShadow} onPress={props.onPress}>
        <View style={styles.gradientBtn}>
          {props.isLoading ? (
            <ActivityIndicator size="small" color={COLORS.WHITE} />
          ) : (
            <Text style={styles.gradientBtnTxt}>{props.title}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnShadow: {
    backgroundColor: COLORS.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 40,
    alignSelf: 'center',
  },

  gradientBtn: {
    borderRadius: 40,
    backgroundColor: COLORS.SECONDARY,
    paddingHorizontal: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  gradientBtnTxt: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontFamily: FONT_FAMILY.primaryBold,
    textAlign: 'center',
    letterSpacing: 1.5,
    textTransform: 'none',
  },
});
