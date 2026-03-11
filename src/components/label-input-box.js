// import React, {useState} from 'react';
// import {
//   View,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
// } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import {COLORS} from '../constants/colors';
// import {FONT_FAMILY} from '../constants/font-family';

// export default function LabelInputBox(props) {
//   const [data, setData] = useState({
//     secureTextEntry: true,
//   });

//   const updateSecureTextEntry = () => {
//     setData({
//       ...data,
//       secureTextEntry: !data.secureTextEntry,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>{props.label}</Text>
//       {props.secureTextEntry ? (
//         <TextInput
//           placeholder={props.placeholder}
//           placeholderTextColor={'#595757'}
//           style={styles.input}
//           secureTextEntry={data.secureTextEntry ? true : false}
//           autoCapitalize="none"
//           defaultValue={props.defaultValue}
//           onChangeText={props.onChangeText}
//           keyboardType={props.keyboardType}
//           editable={props.editable}
//         />
//       ) : (
//         <TextInput
//           placeholder={props.placeholder}
//           placeholderTextColor={'#595757'}
//           style={styles.input}
//           defaultValue={props.defaultValue}
//           onChangeText={props.onChangeText}
//           keyboardType={props.keyboardType}
//           editable={props.editable}
//         />
//       )}

//       {props.isShowBtn && (
//         <TouchableOpacity onPress={props.onButtonPress} style={styles.eyeIcon}>
//           <Text style={styles.btnTxt}>{props.btnTxt}</Text>
//         </TouchableOpacity>
//       )}

//       {props.secureTextEntry ? (
//         <TouchableOpacity
//           onPress={updateSecureTextEntry}
//           style={styles.eyeIcon}>
//           {data.secureTextEntry ? (
//             <Feather name="eye-off" size={16} color={'#595757'} />
//           ) : (
//             <Feather name="eye" size={16} color={'#595757'} />
//           )}
//         </TouchableOpacity>
//       ) : null}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     marginVertical: 10,
//     //backgroundColor: 'red',
//     borderRadius: 10,
//     overflow: 'hidden',
//   },

//   icon: {
//     position: 'absolute',
//     left: 20,
//     zIndex: 1,
//   },
//   input: {
//     fontFamily: FONT_FAMILY.primary,
//     fontSize: 12,
//     paddingLeft: 20,
//     borderColor: COLORS.EXTRALIGHT_GREY,
//     borderRadius: 8,
//     borderWidth: 0.2,
//     backgroundColor: '#F3F3F3',
//     color: COLORS.BLACK,
//     height: 46,
//   },

//   eyeIcon: {
//     position: 'absolute',
//     right: 20,
//     zIndex: 1,
//   },
//   btnTxt: {
//     fontSize: 10,
//     color: COLORS.PRIMARY,
//     //marginBottom: 5,
//     fontFamily: FONT_FAMILY.primaryBold,
//     // marginBottom: -100,
//     marginTop: 25,
//   },
//   label: {
//     fontSize: 12,
//     color: COLORS.BLACK,
//     marginBottom: 5,
//     fontFamily: FONT_FAMILY.primarySemiBold,
//     marginHorizontal: 3,
//   },
// });

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

export default function LabelInputBox(props) {
  const [data, setData] = useState({
    secureTextEntry: true,
    text: '',
  });

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleTextChange = text => {
    setData({...data, text});
    if (props.onChangeText) {
      props.onChangeText(text);
    }
  };

  const clearText = () => {
    setData({...data, text: ''});
    if (props.onChangeText) {
      props.onChangeText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={'#595757'}
        style={styles.input}
        secureTextEntry={props.secureTextEntry ? data.secureTextEntry : false}
        autoCapitalize="none"
        value={data.text}
        onChangeText={handleTextChange}
        keyboardType={props.keyboardType}
        editable={props.editable}
        maxLength={props.maxLength}
      />

      {data.text.length > 0 && (
        <TouchableOpacity onPress={clearText} style={styles.clearIcon}>
          <Feather name="x-circle" size={16} color={COLORS.RED} />
        </TouchableOpacity>
      )}

      {props.secureTextEntry && (
        <TouchableOpacity
          onPress={updateSecureTextEntry}
          style={styles.eyeIcon}>
          {data.secureTextEntry ? (
            <Feather name="eye-off" size={16} color={'#595757'} />
          ) : (
            <Feather name="eye" size={16} color={'#595757'} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  input: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: 12,
    paddingLeft: 20,
    borderColor: COLORS.EXTRALIGHT_GREY,
    borderRadius: 8,
    borderWidth: 0.2,
    backgroundColor: '#F3F3F3',
    color: COLORS.BLACK,
    height: 46,
    paddingRight: 40, // To avoid overlapping icons
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    zIndex: 1,
    bottom: 15,
  },
  clearIcon: {
    position: 'absolute',
    right: 20,
    zIndex: 1,
    bottom: 15,
  },
  label: {
    fontSize: 12,
    color: COLORS.BLACK,
    marginBottom: 5,
    fontFamily: FONT_FAMILY.primarySemiBold,
    marginHorizontal: 3,
  },
});
