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

export default function IconInput(props) {
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
    <>
      <View style={styles.container}>
        <Text style={styles.label}>{props.label}</Text>
        {props.secureText ? (
          <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={COLORS.GREY}
            style={styles.input}
            secureTextEntry={data.secureTextEntry ? true : false}
            autoCapitalize="none"
            defaultValue={props.defaultValue}
            onChangeText={props.onChangeText}
            keyboardType={props.keyboardType}
            editable={props.editable}
            maxLength={props.maxLength}
          />
        ) : (
          <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={COLORS.GREY}
            style={styles.input}
            defaultValue={props.defaultValue}
            onChangeText={props.onChangeText}
            keyboardType={props.keyboardType}
            editable={props.editable}
            maxLength={props.maxLength}
          />
        )}

        <TouchableOpacity style={styles.icon}>
          <Feather name={props.icon} size={18} color={COLORS.BLACK} />
        </TouchableOpacity>

        {props.secureText ? (
          <TouchableOpacity
            onPress={updateSecureTextEntry}
            style={styles.eyeIcon}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" size={16} color={COLORS.GREY} />
            ) : (
              <Feather name="eye" size={16} color={COLORS.GREY} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: 10,
  },
  icon: {
    position: 'absolute',
    left: 17.5,
    zIndex: 1,
    bottom: 15,
  },
  input: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: 12,
    paddingLeft: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.EXTRALIGHT_GREY,
    color: COLORS.BLACK,
    height: 46,
    backgroundColor: COLORS.BG,
  },

  eyeIcon: {
    position: 'absolute',
    right: 17.5,
    zIndex: 1,
  },
  label: {
    fontSize: 12,
    color: COLORS.BLACK,
    marginBottom: 5,
    fontFamily: FONT_FAMILY.primaryMedium,
    marginHorizontal: 3,
  },
});
