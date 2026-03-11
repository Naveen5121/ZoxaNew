import * as React from 'react';
import {Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../constants/colors';

import {FONT_FAMILY} from '../constants/font-family';
import {ICONS} from '../constants/icons';
import HomeNavigator from './home-navigator';
import BookingNavigator from './booking-navigator';
import CategoryNavigator from './category-navigator';
import ProfileNavigator from './profile-navigator';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        showLabel: true,
        headerShown: false,

        tabBarStyle: {
          backgroundColor: COLORS.WHITE,
        },
        tabBarLabelStyle: {
          fontFamily: FONT_FAMILY.primary,
          fontSize: 10,
          marginTop: -1,
          marginBottom: 3,
        },
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.GREY,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home_') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Parties_') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Items_') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Bills_') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          } else if (route.name === 'More_') {
            iconName = focused ? 'grid' : 'grid-outline';
          }

          // You can return any component that you like here!
          return (
            <Ionicons
              name={iconName}
              size={20}
              color={focused ? COLORS.PRIMARY : COLORS.GREY}
            />
          );
        },
      })}>
      <Tab.Screen
        name="Home_"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
        }}
      />

      <Tab.Screen
        name="More_"
        component={CategoryNavigator}
        options={{
          tabBarLabel: 'Categories',
        }}
      />

      <Tab.Screen
        name="Bills_"
        component={BookingNavigator}
        options={{
          tabBarLabel: 'My Orders',
        }}
      />

      <Tab.Screen
        name="Parties_"
        component={ProfileNavigator}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}
