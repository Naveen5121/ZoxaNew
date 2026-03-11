import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

export default function ShadowInputBox(props) {
  return (
    <View style={styles.container}>
      {props.secureTextEntry ? (
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor={'#595757'}
          style={styles.input}
          autoCapitalize="none"
          defaultValue={props.defaultValue}
          onChangeText={props.onChangeText}
          keyboardType={props.keyboardType}
          editable={props.editable}
        />
      ) : (
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor={'#595757'}
          style={styles.input}
          defaultValue={props.defaultValue}
          onChangeText={props.onChangeText}
          keyboardType={props.keyboardType}
          editable={props.editable}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: 10,
    //backgroundColor: 'red',
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 3.5,
    marginHorizontal: 5,
  },

  input: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: 12,
    paddingLeft: 20,
    borderColor: COLORS.EXTRALIGHT_GREY,
    borderRadius: 5,
    borderWidth: 0.2,
    backgroundColor: COLORS.WHITE,
    color: COLORS.BLACK,
    height: 40,
  },
});
