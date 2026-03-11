import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
const SearchInput = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.continer}>
      <TouchableOpacity
        style={styles.input}
        onPress={() => navigation.navigate('Search')}>
        <Text style={styles.text}>{props.title}</Text>
      </TouchableOpacity>
      <Feather
        name={'search'}
        size={17}
        color={COLORS.PRIMARY}
        style={styles.icon}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  continer: {
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    // elevation: 3,
    padding: 15,
    // paddingTop: 0,
  },
  input: {
    backgroundColor: COLORS.WHITE,
    height: 40,
    borderRadius: 5,
    paddingLeft: 40,
    elevation: 3,
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    left: 30,
    top: 25,
  },

  text: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.GREY,
  },
});
