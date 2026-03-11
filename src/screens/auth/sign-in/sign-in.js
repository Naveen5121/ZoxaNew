import {View, Text, StatusBar, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './style';
import {IMAGES} from '../../../constants/images';
import CustomBtn from '../../../components/custom-btn';

import {COLORS} from '../../../constants/colors';
import {ICONS} from '../../../constants/icons';
import AnimatedInputBox from '../../../components/animated-input-box';
import LabelInputBox from '../../../components/label-input-box';

export default function SignIn(props) {
  // const {signIn} = React.useContext(AuthContext).authContext;

  // const onSubmit = async () => {
  //   try {
  //     signIn({token: 'accessToken', id: 'userId'});
  //     await AsyncStorage.setItem('userId', 'userId');
  //     await AsyncStorage.setItem('accessToken', 'accessToken');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <View showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={{flex: 1}}>
          <Text style={styles.heading}>Sign In</Text>

          <LabelInputBox
            placeholder="Please enter your email address"
            label="Email"
          />
          <LabelInputBox
            placeholder="Please enter your Password"
            label="Password"
            secureTextEntry={true}
          />
          <TouchableOpacity
          // onPress={() => props.navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgot}>Forgot the password?</Text>
          </TouchableOpacity>
          <View style={{backgroundColor: COLORS.WHITE}}>
            <CustomBtn
              marginVertical={15}
              title="Sign In"
              // onPress={() => onSubmit()}
            />

            <View style={styles.flexRow}>
              <Text style={styles.account}>Don’t have an account?</Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('CreateAccount')}>
                <Text style={styles.already}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={{...styles.btn, backgroundColor: '#4267B2'}}>
            <Image style={{height: 18, width: 18}} source={ICONS.FB} />
            <Text style={{...styles.btnTxt}}>Continue With facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            //  onPress={() => props.navigation.navigate('OtpLogin')}
          >
            <Image style={{height: 18, width: 18}} source={ICONS.GOOGLE} />
            <Text style={styles.btnTxt}>Continue With Apple ID</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            //  onPress={() => props.navigation.navigate('OtpLogin')}
          >
            <Image style={{height: 18, width: 18}} source={ICONS.GOOGLE} />
            <Text style={styles.btnTxt}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
