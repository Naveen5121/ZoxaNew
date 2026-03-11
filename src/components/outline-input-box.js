import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

export default function OutlineInputBox(props) {
  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        maxLength={props.maxLength}
        label={props.label}
        activeOutlineColor={COLORS.SECONDARY}
        style={styles.input}
        defaultValue={props.defaultValue}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
        editable={props.editable}
        // value={'Juhi'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 7.5,
    //backgroundColor: 'red',
  },

  input: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: 13,
    color: COLORS.BLACK,
    backgroundColor: COLORS.WHITE,
  },
});
