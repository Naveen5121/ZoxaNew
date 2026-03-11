import React from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

export default function NoRecords({title}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },

  title: {
    fontSize: 15,
    fontFamily: FONT_FAMILY.primarySemiBold,
    color: COLORS.PRIMARY,
    textAlign: 'center',
  },
});
