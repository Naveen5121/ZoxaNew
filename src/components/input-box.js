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

export default function InputBox(props) {
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
      {props.secureTextEntry ? (
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor={'#595757'}
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
          placeholderTextColor={'#595757'}
          style={styles.input}
          defaultValue={props.defaultValue}
          onChangeText={props.onChangeText}
          keyboardType={props.keyboardType}
          editable={props.editable}
          maxLength={props.maxLength}
        />
      )}

      {props.isShowBtn && (
        <TouchableOpacity onPress={props.onButtonPress} style={styles.eyeIcon}>
          <Text style={styles.btnTxt}>{props.btnTxt}</Text>
        </TouchableOpacity>
      )}

      {props.secureTextEntry ? (
        <TouchableOpacity
          onPress={updateSecureTextEntry}
          style={styles.eyeIcon}>
          {data.secureTextEntry ? (
            <Feather name="eye-off" size={16} color={'#595757'} />
          ) : (
            <Feather name="eye" size={16} color={'#595757'} />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: 10,
    //backgroundColor: 'red',
    borderRadius: 10,
    overflow: 'hidden',
  },
  icon: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
  },
  input: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: 12,
    paddingLeft: 20,
    borderColor: COLORS.EXTRALIGHT_GREY,
    borderRadius: 5,
    borderWidth: 0.2,
    backgroundColor: '#F3F3F3',
    color: COLORS.BLACK,
    //height: 55,
  },

  eyeIcon: {
    position: 'absolute',
    right: 20,
    zIndex: 1,
  },
  btnTxt: {
    fontSize: 10,
    color: COLORS.PRIMARY,
    // marginBottom: 5,
    fontFamily: FONT_FAMILY.primaryBold,
    // marginBottom: -1.5,
  },
});
