import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import {
  CartIcon,
  DrawerMenu,
  LogoutIcon,
} from '../components/header-components';

// import {AuthContext} from '../../auth-context';
// import BillsNavigator from './bills-navigator';
// import BillsTopTabNavigator from './bills-top-tab-navigator';
import Home from '../screens/app/Home/home';
import {AuthContext} from '../../auth-context';
import TopTabNavigator from '../screens/app/order/order-top-tabs/top-tab-navigator';

const Stack = createNativeStackNavigator();

export default function BookingNavigator() {
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
        name="TopTabNavigator"
        component={TopTabNavigator}
        options={{
          title: 'MyOrders',
          // headerLeft: () => DrawerMenu(),
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <LogoutIcon />
            </View>
          ),
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

  iconStyleRight: {marginRight: 15},
});
