import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Header({showNotice, logOut}) {
  return (
    <View style={styles.subContainer}>
      <TouchableOpacity activeOpacity={0.8} onPress={showNotice}>
        <Text style={styles.delivery}>Delivery in</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.subtxt}>10 minutes</Text>
        </View>
        <View style={styles.addresContainer}>
          <Text style={styles.address} numberOfLines={1}>
            DLF Phase 3,Gurgaon
          </Text>
          <MaterialCommunityIcons
            name="menu-down"
            color={COLORS.PRIMARY}
            size={20}
            style={{bottom: -1}}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={logOut}>
        <MaterialCommunityIcons
          name="account-circle-outline"
          color={COLORS.PRIMARY}
          size={36}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'ios' ? 10 : 15,
    justifyContent: 'space-between',
  },
  delivery: {
    fontSize: 16,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  subtxt: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primarySemiBold,
    color: '#3B4886',
  },
  address: {
    fontSize: 14,
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
  addresContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    //width: '70%',
  },
});
