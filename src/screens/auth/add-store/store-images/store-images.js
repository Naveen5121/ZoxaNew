import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import Feather from 'react-native-vector-icons/Feather';

import ImagePicker from 'react-native-image-crop-picker';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import CustomBtn from '../../../../components/custom-btn';
import ToastAlertMsg from '../../../../components/toast-alert-msg';
import ImageMediaSelectModal from '../../../../components/image-media-select-modal';

export default function StoreImage(props) {
  //console.log(accessToken);
  const {
    phoneNo,
    ownerName,
    emailId,
    state,
    city,
    pincode,
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
  } = props.route.params;

  // console.log(
  //   'StoreImage ' + phoneNo,
  //   ownerName,
  //   emailId,
  //   accessToken,
  //   userId,
  //   businessType,
  //   companyType,
  //   companyName,
  //   companyPersonName,
  //   primaryEmail,
  //   teamEmail,
  //   regAddress,
  //   shippingAddress,
  //   mapLink,
  // );

  const [multipleImages, setMultipleImages] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [storeImage, setStoreImage] = useState(null);

  async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      if (
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Camera permission granted.');
      } else {
        console.log('Camera permission denied.');
      }
    } catch (err) {
      console.warn('Error requesting camera permission:', err);
    }
  }

  // console.log(multipleImages);

  async function selectStoreImage() {
    try {
      launchImageLibrary({})
        .then(image => {
          console.log(image.assets[0]);
          setStoreImage(image.assets[0]);
        })
        .catch(e => console.log(e));
    } catch (error) {
      console.log(error);
    }
  }

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
        const image = res.assets[0];
        console.log(image);
        setStoreImage(image);
      }
    });
  }

  const onSubmit = async () => {
    try {
      if (storeImage) {
        props.navigation.navigate('BankGstDetail', {
          phoneNo,
          ownerName,
          emailId,
          state,
          city,
          pincode,
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
        });
      } else {
        ToastAlertMsg('Please Upload Image');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  return (
    <View style={styles.container}>
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
          <View style={styles.completedStep}>
            <View style={styles.activestep} />
          </View>
          <View style={styles.line} />
          <View style={styles.pendingStep}></View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.inactivetext}>Create Account</Text>
          <Text style={styles.inactivetext}>Company Information</Text>
          <Text style={styles.text}>Business Images</Text>
          <Text style={styles.inactivetext}>Bank and GST{'\n'}Details</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{padding: 15}}>
          <Text style={styles.heading}>Upload your store images</Text>

          {storeImage ? (
            <View style={styles.addImageContainer}>
              <TouchableOpacity
                style={styles.delete}
                onPress={() => setStoreImage(null)}>
                <Feather name="trash-2" size={16} color={'white'} />
              </TouchableOpacity>
              <Image
                source={{uri: storeImage?.uri}}
                style={styles.storeImage}
              />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addImageContainer}
              onPress={() => setModalShow(true)}>
              <View style={styles.addCircle}>
                <Feather name="plus" size={22} color={'white'} />
              </View>
              <Text style={styles.cardHeading}>Upload image</Text>
              <Text style={styles.cardSubHeading}>
                Image should be in jpg,jpeg or png
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <ImageMediaSelectModal
        onSkip={() => setModalShow(false)}
        visible={modalShow}
        onOpenCamera={() => openCamera()}
        onOpenImagePicker={() => selectStoreImage()}
        // isShowFileUpload={true}
        //  onOpenDocumentPicker={() => chooseFile()}
      />
      <View style={{marginHorizontal: 15}}>
        <CustomBtn
          title="Continue"
          marginVertical={20}
          onPress={() => onSubmit()}
          // onPress={() => props.navigation.navigate('BankGstDetail')}
        />
      </View>
    </View>
  );
}
