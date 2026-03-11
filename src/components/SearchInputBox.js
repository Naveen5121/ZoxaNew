import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  StickyView,
  useCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import {COLORS} from '../constants/colors';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RollingBar from 'react-native-rolling-bar';
import {FONT_FAMILY} from '../constants/font-family';

export default function SearchInputBox() {
  const {scrollY} = useCollapsibleContext();

  const animatedShadow = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 140], [0, 1]);
    return {opacity};
  });

  const bgColorChnages = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 180], [0, 1]);
    return {backgroundColor: `rgba(255,255,255,${opacity})`};
  });

  return (
    <StickyView style={[bgColorChnages]}>
      <TouchableOpacity style={styles.searchContainer} activeOpacity={0.8}>
        <Ionicons name="search" size={20} color={COLORS.BLACK} />
        <RollingBar
          defaultStyle={false}
          customStyle={styles.rolingtxt}
          interval={3000}>
          <Text style={styles.searchtxt}>Search Sweets</Text>
          <Text style={styles.searchtxt}>Search for ata,dal,rice</Text>
          <Text style={styles.searchtxt}>Search milk</Text>
          <Text style={styles.searchtxt}>Search choclate</Text>
        </RollingBar>
        <View style={styles.devider} />
        <Ionicons name="mic" size={20} color={COLORS.BLACK} />
      </TouchableOpacity>
      <Animated.View style={[styles.container, animatedShadow]}></Animated.View>
    </StickyView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 15,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT_GREY,
  },
  searchContainer: {
    backgroundColor: '#f6f7f8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 0.6,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    overflow: 'hidden',
    marginTop: 15,
    borderColor: COLORS.EXTRALIGHT_GREY,
    elevation: 2.5,
  },
  rolingtxt: {width: '90%', height: 50, paddingLeft: 10},
  searchtxt: {
    fontSize: 12,
    color: COLORS.GREY,
    fontFamily: FONT_FAMILY.primary,
  },
  devider: {
    width: 1,
    height: 24,
    backgroundColor: '#ddd',
  },
});
