import {
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
const {height, width} = Dimensions.get('window');

export default function CategoryCard({data}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.box}
      onPress={() =>
        navigation.navigate('SubCategory', {
          catId: data.id,
          catName: data.name,
        })
      }>
      <Image style={styles.img} source={{uri: data.image}} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{data.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    // height: 100,
    backgroundColor: COLORS.WHITE,
    // flex: 1,
    // padding: 15,
    width: width / 3 - 13.5,
    margin: 5,
    // height: 100,
    borderRadius: 10,
    elevation: 2,
    overflow: 'hidden',
  },

  title: {
    fontSize: 12,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
    textAlign: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingVertical: 3.5,
    paddingHorizontal: 2.5,
  },
  img: {
    height: 100,
    width: width / 3 - 13.5,
  },
});
