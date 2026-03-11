import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import {
  CartIcon,
  DrawerMenu,
  LogoutIcon,
} from '../components/header-components';

import {AuthContext} from '../../auth-context';
import {IMAGES} from '../constants/images';

import Labels from '../screens/app/profile/labels/labels';

const Stack = createNativeStackNavigator();

export default function ProfileNavigator() {
  // const {userProfile} = React.useContext(AuthContext);
  // console.log(userProfile);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: styles.headerTitle,

        headerStyle: {
          backgroundColor: COLORS.PRIMARY,
        },
        headerTitleAlign: 'left',
      }}>
      <Stack.Screen
        name="Labels"
        component={Labels}
        options={{
          headerTitle: () => <Text style={styles.headerTitle}>My Profile</Text>,
          title: 'hello',
          headerRight: () => <LogoutIcon />,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 16,
    color: COLORS.WHITE,
    textTransform: 'capitalize',
    fontFamily: FONT_FAMILY.primaryMedium,
    paddingLeft: 8,
  },
  headerBtn: {
    fontSize: 10,
    color: COLORS.WHITE,
    textTransform: 'capitalize',
    fontFamily: FONT_FAMILY.primaryMedium,
    marginRight: 5,
    backgroundColor: COLORS.LIGHT_BLACK,
    marginTop: 1,
    paddingHorizontal: 10,
    paddingVertical: 1.5,
    borderRadius: 4,
  },

  iconStyleRight: {
    marginRight: 15,
    height: 50,
    width: 100,
    resizeMode: 'contain',
  },
});
