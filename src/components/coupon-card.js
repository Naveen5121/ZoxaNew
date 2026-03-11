import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';
import {IMAGES} from '../constants/images';
import {FONT_FAMILY} from '../constants/font-family';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

export default function CouponCard({
  data,
  selectCoupon,
  minCartValue,
  onApplyCoupon,
  onRemoveCoupon,
}) {
  const isDisabled = minCartValue < parseFloat(data.purchase_of);
  const isSelected = selectCoupon?.id === data.id;

  return (
    <View style={isDisabled ? styles.disabledCard : styles.card}>
      <Image source={IMAGES.LOGO} style={styles.logoimg} />

      <View>
        <Text style={styles.get}>
          {data.coupon_type === '1'
            ? `Get ${data.coins_apply_percentage}% coins OFF on min order of ₹${data.purchase_of}`
            : `Flat ${data.coins} coins OFF on min order of ₹${data.purchase_of}`}
        </Text>
      </View>

      <View style={styles.flexRow}>
        {data.coupon_code && (
          <View style={styles.coupon}>
            <Text style={styles.couponcode}>{data.coupon_code}</Text>
          </View>
        )}

        {isSelected ? (
          <TouchableOpacity style={styles.removeBtn} onPress={onRemoveCoupon}>
            <Text style={styles.remove}>Remove</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.applyBtn}
            disabled={isDisabled}
            onPress={() => onApplyCoupon(data)}>
            <Text style={styles.apply}>Apply</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    // borderWidth: 1,
    borderColor: COLORS.EXTRALIGHT_GREY,
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    marginBottom: 10,
    marginRight: 5,
  },
  disabledCard: {
    borderWidth: 1,
    borderColor: COLORS.EXTRALIGHT_GREY,
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
    opacity: 0.6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    marginRight: 5,
  },
  logoimg: {
    height: 24,
    width: 80,
    resizeMode: 'contain',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginLeft: -5,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingVertical: 8,
    // borderBottomWidth: 1,
    // borderBlockEndColor: COLORS.LIGHT_PURPLE,
    marginBottom: 4,
  },
  coupon: {
    paddingHorizontal: 10,
    paddingVertical: 2.5,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.PINK,
    borderStyle: 'dashed',
  },
  applyBtn: {
    height: 28,
    borderRadius: 6,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  apply: {
    fontSize: 12,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primary,
  },
  couponcode: {
    fontSize: 12.5,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
    textTransform: 'uppercase',
  },
  get: {
    fontSize: 12,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
  valid: {
    fontSize: 14,
    color: COLORS.TEXT_COLOR,
    fontFamily: FONT_FAMILY.primary,
  },
  removeBtn: {
    height: 28,
    borderRadius: 6,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  remove: {
    fontSize: 12,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primary,
  },
});
