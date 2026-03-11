import * as React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CreateAccount from '../screens/auth/add-store/create-account/create-account';
import StoreInfo from '../screens/auth/add-store/store-info/store-info';
import StoreImage from '../screens/auth/add-store/store-images/store-images';
import BankGstDetail from '../screens/auth/add-store/bank-gst-detail/bank-gst-detail';
import OnBoarding from '../screens/auth/on-boarding/on-boarding';
import {GoBack} from '../components/header-components';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import SignIn from '../screens/auth/sign-in/sign-in';
import OtpLogin from '../screens/auth/otp-login/otp-login';
import OtpVerification from '../screens/auth/otp-verification/otp-verification';


const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          //  headerLeft: () => <GoBack />,
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: COLORS.PRIMARY,
          },
          headerTitleStyle: styles.headerTitle,
          headerTintColor: COLORS.WHITE,
        }}>
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="OtpLogin"
          component={OtpLogin}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="OtpVerification"
          component={OtpVerification}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{
            title: 'Create Account',
          }}
        />
        <Stack.Screen
          name="StoreInfo"
          component={StoreInfo}
          options={{
            title: 'Business Details',
          }}
        />
        <Stack.Screen
          name="StoreImage"
          component={StoreImage}
          options={{
            title: 'Add Images',
          }}
        />
        <Stack.Screen
          name="BankGstDetail"
          component={BankGstDetail}
          options={{
            title: 'Upload Document',
          }}
        />

     
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 16,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
});
