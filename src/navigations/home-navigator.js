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

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  const {userProfile} = React.useContext(AuthContext);
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
        name="Home"
        component={Home}
        options={{
          headerTitle: () => (
            <View style={{flex: 1}}>
              <Text style={styles.headerTitle}>
                {userProfile?.company_name || 'Your Business Name'}
              </Text>
              <Text style={styles.headerBtn}>
                {userProfile?.email_id || 'busines@gmail.com'}
              </Text>
            </View>
          ),
          title: 'hello',

          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <CartIcon />

              <View style={{marginHorizontal: 5}} />
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
    fontFamily: FONT_FAMILY.primaryMedium,

    paddingHorizontal: 8,
  },

  iconStyleRight: {marginRight: 15},
});
