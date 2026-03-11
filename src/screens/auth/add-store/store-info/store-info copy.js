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
import InputBox from '../../../../components/input-box';
import LabelDropdown from '../../../../components/label-dropdown';
import CustomBtn from '../../../../components/custom-btn';

export default function StoreInfo(props) {
  const {phoneNumber, emailId, password, accessToken, userId} =
    props.route.params;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />

      <View style={{padding: 15, backgroundColor: '#f0f0f0', marginBottom: 5}}>
        <View style={styles.stepsContainer}>
          <View style={styles.pendingStep}></View>
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
          <Text style={styles.text}>Create Account</Text>
          <Text style={styles.text}>Store Information</Text>
          <Text style={styles.text}>Store Images</Text>
          <Text style={styles.text}>Bank and GST{'\n'}Details</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{padding: 15, flex: 1}}>
          <Text style={styles.heading}>Tells us about your business</Text>
          <InputBox label="Store Name" placeholder="My Tycoon Tracker" />

          <LabelDropdown
            title="Select Category"
            data={[
              {label: 'Category 1', id: 1},
              {label: 'Category 2', id: 2},
            ]}
          />

          <InputBox label="Enter Mobile Number" placeholder="987654321234" />

          <InputBox
            label="Street Address"
            placeholder="Court More, Burnpur Road,Burnpur"
          />

          <LabelDropdown
            title="State"
            data={[
              {label: 'State 1', id: 1},
              {label: 'State 2', id: 2},
            ]}
          />
          <LabelDropdown
            title="District"
            data={[
              {label: 'District 1', id: 1},
              {label: 'District 2', id: 2},
            ]}
          />
          <InputBox label="Pincode" placeholder="713303" />

          <CustomBtn
            title="Continue"
            marginVertical={20}
            onPress={() => props.navigation.navigate('StoreImage')}
          />
        </View>
      </ScrollView>
    </View>
  );
}
