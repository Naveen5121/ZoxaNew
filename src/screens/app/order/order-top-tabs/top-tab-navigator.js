import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import ProcessingOrders from '../processing-orders/processing-orders';
import HistoryOrders from '../history-orders/history-orders';
import {COLORS} from '../../../../constants/colors';
import {FONT_FAMILY} from '../../../../constants/font-family';
import DeliveredOrders from '../delivered-orders/delivered-orders';

const Tab = createMaterialTopTabNavigator();

export default function TopTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: true,
        scrollEnabled: true,

        tabBarIndicatorStyle: {
          backgroundColor: COLORS.PRIMARY,
          height: 3,
          bottom: 0,
          backgroundColor: COLORS.PRIMARY,
          // borderRadius: 10,
          // width: 5,
          // left: '24%',
        },
        tabBarLabelStyle: {
          fontFamily: FONT_FAMILY.primaryBold,
          fontSize: 13,
          textTransform: 'capitalize',
        },
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.GREY,
        tabBarStyle: {
          //  backgroundColor: 'red',
          elevation: 0,
        },
      }}>
      <Tab.Screen
        name="Courses"
        component={ProcessingOrders}
        options={{tabBarLabel: 'On Going'}}
      />
      <Tab.Screen
        name="HistoryOrders"
        component={HistoryOrders}
        options={{tabBarLabel: 'Cancelled'}}
      />

      <Tab.Screen
        name="DeliveredOrders"
        component={DeliveredOrders}
        options={{tabBarLabel: 'Delivered'}}
      />
    </Tab.Navigator>
  );
}
