import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {CartIcon, GoBack} from '../components/header-components';
import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/app/Home/home';
import BottomTabNavigator from './bottom-tab-navigator';
import SubCategory from '../screens/app/sub-category/sub-category';
import ProductsList from '../screens/app/products/product-list/product-list';
import ProductDetails from '../screens/app/products/product-detail/product-detail';
import Cart from '../screens/app/cart/cart/cart';
import AddShippingAddress from '../screens/app/profile/shipping-address/add-shipping-address/add-shipping-address';
import ViewShippingAddress from '../screens/app/profile/shipping-address/view-shipping-address/view-shipping-address';
import CartCheckout from '../screens/app/cart/cart-checkout/cart-checkout';
import OrderDetails from '../screens/app/order/order-details/order-details';
import TopTabNavigator from '../screens/app/order/order-top-tabs/top-tab-navigator';
import Subscription from '../screens/app/my-subsription/subscription/subscription';
import ViewBillPdf from '../screens/app/order/view-bill-pdf/view-bill-pdf';
import SubscriptionCard from '../screens/app/subscription-card/subscription-card';
import Search from '../screens/app/search/search';

const Stack = createStackNavigator();

export default function AppNavigator({userProfile}) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerLeft: () => <GoBack />,
          headerTitleStyle: styles.headerTitle,
        }}>
        <Stack.Screen
          name="App"
          component={AppStackNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AppStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'left',
        headerLeft: () => <GoBack />,
        headerStyle: {
          backgroundColor: COLORS.PRIMARY,
        },
        headerTitleStyle: styles.headerTitle,
      }}>
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="SubCategory"
        component={SubCategory}
        options={({route}) => ({
          title: route.params.catName,
          headerRight: () => <CartIcon />,
        })}
      />

      <Stack.Screen
        name="ProductsList"
        component={ProductsList}
        options={({route}) => ({
          title: route.params.subcatName,
          headerRight: () => <CartIcon />,
        })}
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          title: 'Products Details',
          headerRight: () => <CartIcon />,
        }}
      />

      <Stack.Screen name="Cart" component={Cart} options={{title: 'My Cart'}} />

      <Stack.Screen
        name="AddShippingAddress"
        component={AddShippingAddress}
        options={{title: 'Add Shipping Address'}}
      />

      <Stack.Screen
        name="ViewShippingAddress"
        component={ViewShippingAddress}
        options={{title: 'Saved Addresses'}}
      />

      <Stack.Screen
        name="CartCheckout"
        component={CartCheckout}
        options={{title: 'Checkout'}}
      />

      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{title: 'Order Details'}}
      />
      <Stack.Screen
        name="TopTabNavigator"
        component={TopTabNavigator}
        options={{title: 'My Orders'}}
      />

      <Stack.Screen
        name="Subscription"
        component={Subscription}
        options={{title: 'My Subscription'}}
      />

      <Stack.Screen
        name="ViewBillPdf"
        component={ViewBillPdf}
        options={{title: 'Pdf '}}
      />

      <Stack.Screen
        name="SubscriptionCard"
        component={SubscriptionCard}
        options={{
          title: 'Select Subscription',
        }}
      />

      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 15,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primaryBold,
  },
});
