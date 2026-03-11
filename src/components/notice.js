import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NoticeHeight} from '../constants/notice';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

export default function Notice() {
  return (
    <View style={{height: NoticeHeight}}>
      <View style={styles.container}>
        <View style={styles.noticeContainer}>
          <SafeAreaView style={{padding: 10}}>
            <Text style={styles.title}>Its Raining near this location.</Text>
            <Text style={styles.subtxt}>
              Our delivery parter may take longer toreach you{' '}
            </Text>
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CCD5E4',
    paddingTop: 35,
  },
  noticeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCD5E4',
  },
  title: {
    fontSize: 12,
    color: '#2D3875',
    fontFamily: FONT_FAMILY.primaryMedium,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtxt: {
    textAlign: 'center',

    fontSize: 10,
    fontFamily: FONT_FAMILY.primary,
  },
});
