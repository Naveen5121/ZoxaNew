import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

export default function LabelTextarea(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        placeholder={'Enter ' + props.placeholder}
        placeholderTextColor={'#999999'}
        style={styles.input}
        secureTextEntry={props.secureTextEntry}
        autoCapitalize="none"
        defaultValue={props.defaultValue}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
        editable={props.editable}
        numberOfLines={5}
        multiline={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: 10,
  },

  input: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: 12,
    padding: 15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.EXTRALIGHT_GREY,
    backgroundColor: COLORS.WHITE,
    color: COLORS.BLACK,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 12,
    color: COLORS.BLACK,
    marginBottom: 5,
    fontFamily: FONT_FAMILY.primaryMedium,
    marginHorizontal: 3,
  },
});
