import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

export default function NoData({title}) {
  return (
    <View style={styles.noDataConatiner}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noDataConatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },

  title: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.BLACK,
  },
});
