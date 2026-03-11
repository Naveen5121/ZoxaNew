import React from 'react';
import {ActivityIndicator, Image} from 'react-native';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import {ICONS} from '../constants/icons';

export default function CustomBtn(props) {
  return (
    <View style={{marginVertical: props.marginVertical}}>
      <TouchableOpacity
        disabled={props.disabled}
        style={styles.btnShadow}
        onPress={props.onPress}>
        <View style={props.disabled ? styles.disabledBtn : styles.btn}>
          {props.isLoading ? (
            <Image source={ICONS.LOADING} style={{width: 45, height: 30}} />
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={props.disabled ? styles.disabledBtnTxt : styles.btnTxt}>
                {props.title}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnShadow: {
    backgroundColor: COLORS.WHITE,
    elevation: 2,
    borderRadius: 12,
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },

  btn: {
    borderRadius: 12,
    backgroundColor: COLORS.PRIMARY,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  disabledBtn: {
    borderRadius: 12,
    backgroundColor: COLORS.LIGHT_GREY,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    opacity: 0.5,
  },

  btnTxt: {
    color: COLORS.WHITE,
    fontSize: 15,
    fontFamily: FONT_FAMILY.primaryMedium,
    textAlign: 'center',
    letterSpacing: 0.5,
    textTransform: 'capitalize',
    marginRight: 7.5,
    marginTop: 2,
  },
  disabledBtnTxt: {
    color: COLORS.DARK_GREY,
    fontSize: 15,
    fontFamily: FONT_FAMILY.primaryMedium,
    textAlign: 'center',
    letterSpacing: 0.5,
    // textTransform: 'uppercase',
    marginRight: 7.5,
    marginTop: 2,
  },
});
