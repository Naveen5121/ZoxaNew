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
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {launchImageLibrary} from 'react-native-image-picker';
// import API from '../../../../actions/api';
// import ToastAlertMsg from '../../../../components/toast-alert-msg';
import ActivityLoader from '../../../../components/activity-loader';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { pick } from '@react-native-documents/picker';
import LabelPickerBox from '../../../../components/label-picker-box';
import ImageMediaSelectModal from '../../../../components/image-media-select-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../../../../actions/api';
import ToastAlertMsg from '../../../../components/toast-alert-msg';

export default function BankGstDetail(props) {
  const {signIn} = React.useContext(AuthContext).authContext;
  const {
    phoneNo,
    ownerName,
    emailId,
    accessToken,
    userId,
    businessType,
    companyType,
    companyName,
    companyPersonName,
    primaryEmail,
    teamEmail,
    regAddress,
    shippingAddress,
    mapLink,
    storeImage,
  } = props.route.params;

  console.log(
    'BAnk Details ' + phoneNo,
    ownerName,
    emailId,
    accessToken,
    userId,
    businessType,
    companyType,
    companyName,
    companyPersonName,
    primaryEmail,
    teamEmail,
    regAddress,
    shippingAddress,
    mapLink,
    storeImage,
  );

  // const onSubmit = async () => {
  //   try {
  //     signIn({token: 'accessToken', id: 'userId'});
  //     await AsyncStorage.setItem('userId', 'userId');
  //     await AsyncStorage.setItem('accessToken', 'accessToken');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const [isLoading, setIsLoading] = useState(false);
  const [ownerImage, setOwnerImage] = useState(null);
  const [panNumber, setPanNumber] = useState(null);
  const [panImage, setPanImage] = useState(null);
  const [gstNumber, setGstNumber] = useState(null);
  const [gstImage, setGstImage] = useState(null);

  const [modalShow, setModalShow] = useState(false);

  const [currentImageType, setCurrentImageType] = useState(null);

  async function selectImage() {
    try {
      launchImageLibrary({}, res => {
        if (!res.didCancel && !res.errorCode) {
          const selectedImage = res.assets[0];
          console.log(selectedImage);

          if (currentImageType === 'ownerImage') {
            setOwnerImage(selectedImage);
          } else if (currentImageType === 'panImage') {
            setPanImage(selectedImage);
          } else if (currentImageType === 'gstImage') {
            setGstImage(selectedImage);
          }
        } else if (res.errorCode) {
          console.log('Image Picker Error:', res.errorMessage);
        }
      });
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  }

  // console.log('type ' + currentImageType);

  async function openCamera() {
    const options = {
      mediaType: 'photo',
      includeExtra: true,
    };

    launchCamera(options, res => {
      if (res.didCancel) {
        console.log('User cancelled camera picker');
      } else if (res.errorCode) {
        console.log('Camera picker error:', res.errorMessage);
      } else {
        const capturedImage = res.assets[0];
        console.log(capturedImage);

        if (currentImageType === 'ownerImage') {
          setOwnerImage(capturedImage);
        } else if (currentImageType === 'panImage') {
          setPanImage(capturedImage);
        } else if (currentImageType === 'gstImage') {
          setGstImage(capturedImage);
        }
      }
    });
  }

  const chooseFile = async () => {
    try {
      const pickedFile = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('Picked file:', pickedFile);
      setFile(pickedFile);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.log('File picker error:', err);
      }
    }
  };

  const onSubmit = async () => {
    try {
      if (gstNumber && gstNumber.toString().trim().length > 0) {
        if (panNumber && panNumber.toString().trim().length > 0) {
          if (gstImage) {
            if (panImage) {
              props.navigation.navigate('SubscriptionCard', {
                phoneNo,
                ownerName,
                emailId,
                accessToken,
                userId,
                businessType,
                companyType,
                companyName,
                companyPersonName,
                primaryEmail,
                teamEmail,
                regAddress,
                shippingAddress,
                mapLink,
                storeImage,
                gstNumber,
                panNumber,
                gstImage,
                panImage,
              });
            } else {
              ToastAlertMsg('Please upload Pan Image');
            }
          } else {
            ToastAlertMsg('Please upload GST Image');
          }
        } else {
          ToastAlertMsg('Please Enter PAN Number');
        }
      } else {
        ToastAlertMsg('Please Enter GST Number');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const onRegistration = async () => {
  //   try {
  //     setIsLoading(true);
  //     const data = await API.setRegistrationData(
  //       businessType,
  //       companyName,
  //       emailId,
  //       ownerName,
  //       shippingAddress,
  //       regAddress,
  //       companyType,
  //       gstNumber,
  //       panNumber,
  //       teamEmail,
  //       primaryEmail,
  //       companyPersonName,
  //       phoneNo,
  //       mapLink,
  //       storeImage,
  //       panImage,
  //       gstImage,
  //     );
  //     console.log(data);
  //     if (data.success === 'true') {
  //       await AsyncStorage.setItem('userId', userId);
  //       signIn({token: accessToken, id: userId});
  //       setIsLoading(false);
  //       ToastAlertMsg(data.extraData);
  //     } else {
  //       ToastAlertMsg(data.extraData);
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      {isLoading && <ActivityLoader isLoading={isLoading} />}
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
          <Text style={styles.text}>Business Images</Text>
          <Text style={styles.text}>Bank and GST{'\n'}Details</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          <Text style={styles.heading}>Upload PAN details</Text>

          <InputBox
            placeholder="Enter PAN Number"
            defaultValue={panNumber}
            onChangeText={text => setPanNumber(text)}
            maxLength={10}
          />

          <LabelPickerBox
            label={'Upload PAN Image'}
            image={panImage}
            onCancel={() => setPanImage(null)}
            onSelectFile={() => {
              setModalShow(true), setCurrentImageType('panImage');
            }} // Added ownerImage logic
          />

          <InputBox
            placeholder="Enter GST Number"
            defaultValue={gstNumber}
            onChangeText={text => setGstNumber(text)}
            maxLength={14}
          />

          <LabelPickerBox
            label={'Upload GST Image'}
            image={gstImage}
            onCancel={() => setGstImage(null)}
            onSelectFile={() => {
              setModalShow(true), setCurrentImageType('gstImage');
            }} // Added ownerImage logic
          />
        </View>

        {/* <View style={styles.cardContainer}>
          <Text style={styles.heading}>Upload Bank details</Text>
          <InputBox
            placeholder="Bank Account Number"
            // defaultValue={bankAccNumber}
            // onChangeText={text => setBankAccNumber(text)}
          />
          <InputBox
            placeholder="Re-enter Account Number"

            // defaultValue={cBankAccNumber}
            // onChangeText={text => setCBankAccNumber(text)}
          />

          <LabelDropdown
            items={[
              {label: 'Saving Account', value: '0'},
              {label: 'Current Account', value: '1'},
            ]}
            label="Account Type"
            // defaultValue={accountType}
            // onChangeItem={item => {
            //   console.log(item);
            //   setAccountType(item.value);
            // }}
          />

          <InputBox
            placeholder="Bank IFSC Code"
            // defaultValue={ifscCode}
            // onChangeText={text => setIfscCode(text)}
          />
        </View> */}

        <View style={{marginHorizontal: 10}}>
          <CustomBtn
            marginVertical={20}
            title="verify"
            onPress={() => onSubmit()}
          />
        </View>
      </ScrollView>
      <ImageMediaSelectModal
        onSkip={() => setModalShow(false)}
        visible={modalShow}
        onOpenCamera={() => openCamera()}
        onOpenImagePicker={() => selectImage()}
        isShowFileUpload={true}
        onOpenDocumentPicker={() => chooseFile()}
      />
    </View>
  );
}
