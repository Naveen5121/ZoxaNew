import React, {useState} from 'react';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import {TextInput} from 'react-native-paper';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function AnimatedInputBox(props) {
  const [data, setData] = useState({
    secureTextEntry: true,
  });

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        // placeholder={props.placeholder}
        label={props.label}
        value={props.defaultValue}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
        secureTextEntry={
          props.secureTextEntry ? (data.secureTextEntry ? true : false) : false
        }
        editable={props.editable}
        theme={{
          colors: {
            text: COLORS.BLACK,
            primary: COLORS.PRIMARY,
            underlineColor: 'transparent',
            background: '#003489',
          },
          fonts: {
            regular: {
              fontFamily: FONT_FAMILY.primary,
            },
          },
        }}
        underlineColor="transparent"
        style={{
          backgroundColor: COLORS.WHITE,
          fontSize: 13,
          height: 60,
          elevation: 2,
        }}
      />

      {props.secureTextEntry ? (
        <TouchableOpacity
          onPress={updateSecureTextEntry}
          style={styles.eyeIcon}>
          {data.secureTextEntry ? (
            <Feather name="eye-off" size={16} color={COLORS.BLACK} />
          ) : (
            <Feather name="eye" size={16} color={COLORS.BLACK} />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    justifyContent: 'center',
    marginHorizontal: 2.5,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 30,
    zIndex: 1,
  },
});
