import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import InputBox from '../../../../components/input-box';
import LabelDropdown from '../../../../components/label-dropdown';
import CustomBtn from '../../../../components/custom-btn';
import ToastAlertMsg from '../../../../components/toast-alert-msg';
// import API from '../../../../actions/api';
import ActivityLoader from '../../../../components/activity-loader';

export default function StoreInfo(props) {
  const {
    phoneNo,
    ownerName,
    emailId,
    state,
    city,
    pincode,
    accessToken,
    userId,
  } = props.route.params;
  console.log('StoreInfo ' + phoneNo, ownerName, emailId);
  const [isLoading, setIsLoading] = useState(false);
  const [businessType, setBusinessType] = useState(null);
  const [companyType, setCompanyType] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [companyPersonName, setCompanyPersonName] = useState(null);
  const [primaryEmail, setPrimaryEmail] = useState(null);
  const [teamEmail, setTeamEmail] = useState(null);
  const [regAddress, setRegAddress] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [mapLink, setMapLink] = useState(null);

  const onSubmit = async () => {
    try {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (businessType && businessType.toString().trim().length > 0) {
        if (companyType && companyType.toString().trim().length > 0) {
          if (companyName && companyName.toString().trim().length > 0) {
            if (
              companyPersonName &&
              companyPersonName.toString().trim().length > 0
            ) {
              if (primaryEmail && primaryEmail.toString().trim().length > 0) {
                if (teamEmail && teamEmail.toString().trim().length > 0) {
                  if (regAddress && regAddress.toString().trim().length > 0) {
                    if (
                      shippingAddress &&
                      shippingAddress.toString().trim().length > 0
                    ) {
                      if (mapLink && mapLink.toString().trim().length > 0) {
                        props.navigation.navigate('StoreImage', {
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
                        });
                      } else {
                        ToastAlertMsg('Please Paste Map Link here');
                      }
                    } else {
                      ToastAlertMsg('Please Enter Company Shipping Address');
                    }
                  } else {
                    ToastAlertMsg('Please Enter Company Registered Address');
                  }
                } else {
                  ToastAlertMsg('Please Enter Team Email');
                }
              } else {
                ToastAlertMsg('Please Enter Primary Email');
              }
            } else {
              ToastAlertMsg('Please Enter Your Company Person Name');
            }
          } else {
            ToastAlertMsg('Please Enter Your Company Name');
          }
        } else {
          ToastAlertMsg('Please Select Your Compaany Type');
        }
      } else {
        ToastAlertMsg('Please Select Your Business Type');
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <View style={styles.completedStep}>
            <View style={styles.activestep} />
          </View>
          <View style={styles.line} />
          <View style={styles.pendingStep}></View>
          <View style={styles.line} />
          <View style={styles.pendingStep}></View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.inactivetext}>Create Account</Text>
          <Text style={styles.text}>Company Information</Text>
          <Text style={styles.inactivetext}>Business Images</Text>
          <Text style={styles.inactivetext}>Bank and GST{'\n'}Details</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          <Text style={styles.heading}>Tells us about your business</Text>

          {/* <LabelDropdown
            items={[
              {label: 'Fashion', value: '0'},
              {label: 'Store', value: '1'},
            ]}
            label="Business Type"
            defaultValue={businessType}
            onChangeItem={item => {
              console.log(item);
              setBusinessType(item.value);
            }}
          /> */}

          <InputBox
            placeholder="Business Type"
            defaultValue={businessType}
            onChangeText={text => setBusinessType(text)}
          />

          <InputBox
            placeholder="Company Name"
            defaultValue={companyName}
            onChangeText={text => setCompanyName(text)}
          />

          {/* <LabelDropdown
            items={[
              {label: 'Fashion', value: '0'},
              {label: 'Store', value: '1'},
            ]}
            label="Company Type"
            defaultValue={companyType}
            onChangeItem={item => {
              //console.log(item);
              setCompanyType(item.value);
            }}
          /> */}

          <InputBox
            placeholder="Company Type"
            defaultValue={companyType}
            onChangeText={text => setCompanyType(text)}
          />

          <InputBox
            placeholder="Contact No. Company*"
            defaultValue={phoneNo}
            //  onChangeText={text => setPhoneNo(text)}
            editable={false}
          />

          <InputBox
            placeholder="Registered Address"
            defaultValue={regAddress}
            onChangeText={text => setRegAddress(text)}
          />

          <InputBox
            placeholder="Shipping Address*"
            defaultValue={shippingAddress}
            onChangeText={text => setShippingAddress(text)}
          />

          <InputBox
            placeholder="Address/Map Link*"
            defaultValue={mapLink}
            onChangeText={text => setMapLink(text)}
          />
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.heading}>Other details</Text>
          <InputBox
            placeholder="Company Person Name*"
            defaultValue={companyPersonName}
            onChangeText={text => setCompanyPersonName(text)}
          />

          <InputBox
            placeholder="Primary Email"
            defaultValue={primaryEmail}
            onChangeText={text => setPrimaryEmail(text)}
            keyboardType="email-address"
          />

          <InputBox
            placeholder="Account Team Email*"
            defaultValue={teamEmail}
            onChangeText={text => setTeamEmail(text)}
            keyboardType="email-address"
          />
        </View>
      </ScrollView>
      <View style={{padding: 15}}>
        <CustomBtn
          title="Continue"
          //  onPress={() => props.navigation.navigate('StoreImage')}
          onPress={() => onSubmit()}
        />
      </View>
    </View>
  );
}
