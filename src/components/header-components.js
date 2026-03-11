import {DrawerActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import {ICONS} from '../constants/icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {AuthContext} from '../../auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GradientBackground = () => (
  <LinearGradient
    colors={[COLORS.PRIMARY, COLORS.GREY]}
    style={StyleSheet.absoluteFill}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 0}}
  />
);

const DrawerMenu = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.iconStyleRight}
      onPress={() => {
        navigation.dispatch(DrawerActions.toggleDrawer());
      }}>
      <FontAwesome name="bars" color={COLORS.WHITE} size={20} />
    </TouchableOpacity>
  );
};

const NotificationIcon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.iconStyleRight} onPress={() => {}}>
      <Ionicons name="notifications-outline" color={COLORS.PRIMARY} size={20} />
    </TouchableOpacity>
  );
};

const WalletIcon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.iconStyleRight}
      //  onPress={() => navigation.navigate('Wallet')}
    >
      <Fontisto name="wallet" size={22} color={COLORS.PRIMARY} />
    </TouchableOpacity>
  );
};

const CartIcon = () => {
  const navigation = useNavigation();
  const {cartCount} = React.useContext(AuthContext);
  console.log(cartCount);
  return (
    <TouchableOpacity
      style={styles.iconStyleRight}
      onPress={() => {
        navigation.navigate('Cart');
      }}>
      <Ionicons name="cart-outline" color={COLORS.WHITE} size={22} />
      <View style={styles.cartCountContainer}>
        {cartCount > 0 && <Text style={styles.cartCount}>{cartCount}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const GoBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
      style={styles.iconStyleLeft}>
      <Feather name="arrow-left" color={COLORS.WHITE} size={24} />
    </TouchableOpacity>
  );
};

const LogoutIcon = () => {
  const navigation = useNavigation();

  const {signOut} = React.useContext(AuthContext).authContext;

  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('accessToken');
      signOut({});
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <TouchableOpacity onPress={() => logoutUser()}>
      <Ionicons name={'log-out'} size={22} color={COLORS.WHITE} />
    </TouchableOpacity>
  );
};

export {
  GradientBackground,
  DrawerMenu,
  GoBack,
  CartIcon,
  NotificationIcon,
  WalletIcon,
  LogoutIcon,
};

const styles = StyleSheet.create({
  iconStyleLeft: {marginLeft: 10},
  iconStyleRight: {marginRight: 15},
  back: {height: 16, width: 15, marginLeft: 20},
  filter: {height: 17.5, width: 17.5, marginRight: 15, resizeMode: 'stretch'},
  menu: {marginLeft: 5},
  text: {
    fontFamily: FONT_FAMILY.primaryBold,
    fontSize: 15,
    color: COLORS.WHITE,
    marginLeft: 5,
  },

  cartCountContainer: {
    position: 'absolute',
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    height: 15,
    width: 15,
    alignItems: 'center',
    justifyContent: 'center',
    top: -5,
    right: -5,
  },

  cartCount: {
    fontSize: 9,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.BLACK,
  },
});
