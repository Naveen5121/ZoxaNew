import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import {COLORS} from '../../../../constants/colors';
import InputBox from '../../../../components/input-box';
import CustomBtn from '../../../../components/custom-btn';
import Modal from 'react-native-modal';
import {ICONS} from '../../../../constants/icons';
import OTPInputView from '@twotalltotems/react-native-otp-input';
export default function CreateAccount(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <View style={styles.stepsContainer}>
        <View style={styles.completedStep}>
          <View style={styles.activestep} />
        </View>
        <View style={styles.line} />
        <View style={styles.pendingStep}></View>
        <View style={styles.line} />
        <View style={styles.pendingStep}></View>
        <View style={styles.line} />
        <View style={styles.pendingStep}></View>
      </View>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            padding: 15,
            backgroundColor: '#f0f0f0',
            marginBottom: 5,
          }}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Create Account</Text>
            <Text style={styles.text}>Store Information</Text>
            <Text style={styles.text}>Store Images</Text>
            <Text style={styles.text}>Bank and GST{'\n'}Details</Text>
          </View>
        </View>

        <View style={{padding: 15, flex: 1}}>
          <Text style={styles.heading}>Create your merchant Id</Text>

          <InputBox label="Your phone number" placeholder="98767876567" />
          <InputBox
            label="Your email address"
            placeholder="mytycoon@gmal.com"
          />
          <InputBox
            label="Create Password"
            placeholder="*********"
            secureTextEntry={true}
          />
          <InputBox
            label="Confirm your Password"
            placeholder="********"
            secureTextEntry={true}
          />
        </View>
      </ScrollView>
      <View style={{margin: 15}}>
        <CustomBtn
          //  marginVertical={20}
          title="create account"
          onPress={() => setModalVisible(!isModalVisible)}
        />
      </View>
      <Modal
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        isVisible={isModalVisible}>
        <View style={{justifyContent: 'center'}}>
          <View style={styles.modalContainer}>
            <Image source={ICONS.VERIFY} style={styles.img} />
            <Text style={styles.title}>OTP Verification</Text>
            <Text style={styles.subtitle}>
              Please enter your 6 Digit One Time Password ( OTP ). This OTP is
              valid for 5 minutes
            </Text>
            <View>
              <OTPInputView
                style={styles.otpInput}
                pinCount={6}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                // onCodeFilled={code => setOtp(code)}
                autoFocusOnLoad={false}
              />
            </View>
            <CustomBtn
              title="Verify"
              onPress={() => props.navigation.navigate('StoreInfo')}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
