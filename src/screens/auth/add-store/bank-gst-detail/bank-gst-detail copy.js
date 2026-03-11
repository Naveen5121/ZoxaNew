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
import Feather from 'react-native-vector-icons/Feather';
import InputBox from '../../../../components/input-box';
import LabelTextarea from '../../../../components/label-textarea';
import LabelDropdown from '../../../../components/label-dropdown';
import CustomBtn from '../../../../components/custom-btn';
import {AuthContext} from '../../../../../auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import API from '../../../../actions/api';
import ToastAlertMsg from '../../../../components/toast-alert-msg';
import ActivityLoader from '../../../../components/activity-loader';

export default function BankGstDetail(props) {
  const {signIn} = React.useContext(AuthContext).authContext;
  const [isLoading, setIsLoading] = useState(false);
  const [panNumber, setPanNumber] = useState(null);
  const [entityName, setEntityName] = useState(null);
  const [entityAddr, setEntityAddr] = useState(null);
  const [panImage, setPanImage] = useState(null);
  const [bankAccNumber, setBankAccNumber] = useState(null);
  const [cBankAccNumber, setCBankAccNumber] = useState(null);
  const [accountType, setAccountType] = useState(null);

  const [ifscCode, setIfscCode] = useState(null);

  const [isGstReg, setIsGstReg] = useState(null);
  const [gstInNumber, setGstInNumber] = useState(null);
  const [gstImage, setGstImage] = useState(null);

  const {
    phoneNumber,
    emailId,
    password,
    accessToken,
    userId,
    storeName,
    addr,
    pinCode,
    state,
    district,
    storeImage,
  } = props.route.params;

  console.log(accessToken);

  async function selectPanImage() {
    try {
      launchImageLibrary({})
        .then(image => {
          console.log(image.assets[0]);
          setPanImage(image.assets[0]);
        })
        .catch(e => console.log(e));
    } catch (error) {
      console.log(error);
    }
  }

  async function selectGstImage() {
    try {
      launchImageLibrary({})
        .then(image => {
          console.log(image.assets[0]);
          setGstImage(image.assets[0]);
        })
        .catch(e => console.log(e));
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = async () => {
    try {
      if (panNumber && panNumber.toString().trim().length > 0) {
        if (entityName && entityName.toString().trim().length > 0) {
          if (entityAddr && entityAddr.toString().trim().length > 0) {
            if (panImage && panImage.toString().trim().length > 0) {
              if (bankAccNumber && bankAccNumber.toString().trim().length > 0) {
                if (bankAccNumber === cBankAccNumber) {
                  if (accountType && accountType.toString().trim().length > 0) {
                    if (ifscCode && ifscCode.toString().trim().length > 0) {
                      if (isGstReg && isGstReg.toString().trim().length > 0) {
                        if (
                          gstInNumber &&
                          gstInNumber.toString().trim().length > 0
                        ) {
                          if (
                            gstImage &&
                            gstImage.toString().trim().length > 0
                          ) {
                            if (accessToken && userId) {
                              console.log('onRegistration()');
                              onRegistration();
                            } else {
                              console.log('onRegistrationWithoutToken()');
                              onRegistrationWithoutToken();
                            }
                          } else {
                            ToastAlertMsg('Please Upload GSTIN Image');
                          }
                        } else {
                          ToastAlertMsg('Please Enter GSTIN Number');
                        }
                      } else {
                        ToastAlertMsg(
                          'Please Select is Business GST Registered or not',
                        );
                      }
                    } else {
                      ToastAlertMsg('Please Enter IFSC Code');
                    }
                  } else {
                    ToastAlertMsg('Please Select Account Type');
                  }
                } else {
                  ToastAlertMsg(
                    'Bank Account Number and Re-Enter Bank Account Number should be same',
                  );
                }
              } else {
                ToastAlertMsg('Please Enter Bank Account Number');
              }
            } else {
              ToastAlertMsg('Please Upload PAN Image');
            }
          } else {
            ToastAlertMsg('Please Enter Enity Address');
          }
        } else {
          ToastAlertMsg('Please Enter Enity Name');
        }
      } else {
        ToastAlertMsg('Please Enter PAN Number');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRegistration = async () => {
    try {
      setIsLoading(true);
      const data = await API.setRegistrationData(
        storeName,
        emailId,
        pinCode,
        password,
        password,
        addr,
        panNumber,
        entityName,
        entityAddr,
        isGstReg,
        gstInNumber,
        bankAccNumber,
        accountType,
        ifscCode,
        gstImage,
        panImage,
        storeImage,
      );
      console.log(data);
      if (data.success === 'true') {
        await AsyncStorage.setItem('userId', userId);
        signIn({token: accessToken, id: userId});
        setIsLoading(false);
        ToastAlertMsg(data.extraData);
      } else {
        ToastAlertMsg(data.extraData);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(emailId);

  const onRegistrationWithoutToken = async () => {
    try {
      setIsLoading(true);
      const data = await API.setRegistrationDataWithoutToken(
        storeName,
        emailId,
        pinCode,
        password,
        password,
        addr,
        panNumber,
        entityName,
        entityAddr,
        isGstReg,
        gstInNumber,
        bankAccNumber,
        accountType,
        ifscCode,
        gstImage,
        panImage,
        storeImage,
        phoneNumber,
      );
      console.log(data);
      if (data.success === 'true') {
        await AsyncStorage.setItem('userId', userId);
        signIn({token: accessToken, id: userId});
        setIsLoading(false);
        ToastAlertMsg(data.extraData);
      } else {
        ToastAlertMsg(data.extraData);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <ActivityLoader isLoading={isLoading} />}
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />

      <View style={{padding: 15, backgroundColor: '#f0f0f0', marginBottom: 5}}>
        <View style={styles.stepsContainer}>
          <TouchableOpacity
            style={styles.pendingStep}
            onPress={() => props.navigation.navigate('CreateAccount')}
          />
          <View style={styles.line} />
          <TouchableOpacity
            style={styles.pendingStep}
            onPress={() => props.navigation.navigate('StoreInfo')}
          />
          <View style={styles.line} />
          <TouchableOpacity
            style={styles.pendingStep}
            onPress={() => props.navigation.navigate('StoreImage')}
          />
          <View style={styles.line} />
          <View style={styles.completedStep}>
            <View style={styles.activestep} />
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text}>Create Account</Text>
          <Text style={styles.text}>Store Information</Text>
          <Text style={styles.text}>Store Images</Text>
          <Text style={styles.text}>Bank and GST{'\n'}Details</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          <Text style={styles.heading}>Upload PAN details</Text>
          <InputBox
            label="PAN Number of Legal Entity"
            defaultValue={panNumber}
            onChangeText={text => setPanNumber(text)}
          />
          <InputBox
            label="Legal Entity Name"
            defaultValue={entityName}
            onChangeText={text => setEntityName(text)}
          />
          <LabelTextarea
            label="Complete Address of the Legal Entity"
            defaultValue={entityAddr}
            onChangeText={text => setEntityAddr(text)}
          />
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <View style={{flex: 1}}>
              <InputBox
                label="Upload PAN CARD Image"
                placeholder="Select"
                defaultValue={panImage?.fileName}
                editable={false}
              />
            </View>
            {panImage ? (
              <TouchableOpacity
                style={styles.addImageContainer}
                onPress={() => setPanImage(null)}>
                <View style={{...styles.addCircle, backgroundColor: 'red'}}>
                  <Feather name="x" size={14} color={'white'} />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.addImageContainer}
                onPress={() => selectPanImage()}>
                <View style={styles.addCircle}>
                  <Feather name="plus" size={14} color={'white'} />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.heading}>Upload Bank details</Text>
          <InputBox
            label="Bank Account Number"
            defaultValue={bankAccNumber}
            onChangeText={text => setBankAccNumber(text)}
          />
          <InputBox
            label="Re-enter Account Number"
            placeholder="898765678909876"
            defaultValue={cBankAccNumber}
            onChangeText={text => setCBankAccNumber(text)}
          />

          <LabelDropdown
            items={[
              {label: 'Saving Account', value: '0'},
              {label: 'Current Account', value: '1'},
            ]}
            label="Account Type"
            defaultValue={accountType}
            onChangeItem={item => {
              console.log(item);
              setAccountType(item.value);
            }}
          />

          <InputBox
            label="Bank IFSC Code"
            defaultValue={ifscCode}
            onChangeText={text => setIfscCode(text)}
          />
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.heading}>Upload GST details</Text>
          <View>
            <Text style={styles.label}>Is your business GST registered</Text>
            <View style={styles.radioBtnContainer}>
              {[
                {title: 'Yes', value: '1'},
                {title: 'No', value: '0'},
              ].map((data, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.radioBtnRowContainer}
                  onPress={() => setIsGstReg(data.value)}>
                  <View style={styles.radioBtn}>
                    {isGstReg === data.value && (
                      <View style={styles.activeRadioBtn} />
                    )}
                  </View>
                  <Text style={styles.radioBtnTxt}>{data.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <InputBox
            label="GSTIN Number"
            defaultValue={gstInNumber}
            onChangeText={text => setGstInNumber(text)}
          />
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <View style={{flex: 1}}>
              <InputBox
                label="Upload GST Certificate Image"
                placeholder={'Upload'}
                defaultValue={gstImage?.fileName}
                editable={false}
              />
            </View>
            {gstImage ? (
              <TouchableOpacity
                style={styles.addImageContainer}
                onPress={() => setGstImage(null)}>
                <View style={{...styles.addCircle, backgroundColor: 'red'}}>
                  <Feather name="x" size={14} color={'white'} />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.addImageContainer}
                onPress={() => selectGstImage()}>
                <View style={styles.addCircle}>
                  <Feather name="plus" size={14} color={'white'} />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.heading}>Our Terms & Conditions</Text>
          <View>
            <View>
              {['', '', ''].map((data, i) => (
                <View key={i} style={styles.bulletContainer}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletTxt}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever{' '}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={{marginHorizontal: 10}}>
          <CustomBtn
            marginVertical={20}
            title="verify"
            onPress={() => onSubmit()}
          />
        </View>
      </ScrollView>
    </View>
  );
}
