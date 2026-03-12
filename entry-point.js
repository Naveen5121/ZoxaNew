import * as React from 'react';
import {StatusBar} from 'react-native';
import {AuthContext} from './auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import AuthNavigator from './src/navigations/auth-navigator';
import AppNavigator from './src/navigations/app-navigator';
import API from './src/actions/api';

const authReducer = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        userId: action.id,
        isLoading: false,
        userProfile: action.userProfile,
        cartCount: action.cartCount,
      };
    case 'USER_PROFILE':
      return {
        ...prevState,
        userProfile: action.userProfile,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        userToken: action.token,
        userId: action.id,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        userToken: null,
        userId: null,
        userProfile: null,
        cartCount: 0,
      };
    case 'CART_COUNT':
      return {
        ...prevState,
        cartCount: action.cartCount,
      };
    default:
      return prevState;
  }
};

export default function EntryPoint() {
  const [state, dispatch] = React.useReducer(authReducer, {
    isLoading: true,
    userToken: null,
    userId: null,
    userProfile: null,
    cartCount: 0,
  });

  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('accessToken');
    } catch (e) {
      console.log('Logout error:', e);
    }
  };

  const checkAuthData = async () => {
    let userToken = null;
    let userId = null;
    let userProfile = null;
    let cartCount = 0;

    try {
      userToken = await AsyncStorage.getItem('accessToken');
      userId = await AsyncStorage.getItem('userId');

      if (userToken && userId) {
        try {
          const profile = await API.getCompanyProfile();
          if (profile.success === 'true') {
            userProfile = profile.extraData.profile;

            try {
              const cart = await API.getCartList('0');
              if (cart.success === 'true') {
                cartCount = cart.extraData.cart.length;
              }
            } catch (e) {
              console.log('Cart fetch error:', e);
            }
          } else {
            await logoutUser();
            userToken = null;
            userId = null;
          }
        } catch (e) {
          console.log('Profile fetch error:', e);
          await logoutUser();
          userToken = null;
          userId = null;
        }
      }
    } catch (e) {
      console.log('Auth data  error:', e);
    }

    SplashScreen.hide();

    dispatch({
      type: 'RESTORE_TOKEN',
      token: userToken,
      id: userId,
      userProfile,
      cartCount,
    });
  };

  React.useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      if (isMounted) {
        await checkAuthData();
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        dispatch({type: 'SIGN_IN', token: data.token, id: data.id});
      },
      signOut: async () => {
        await logoutUser();
        dispatch({type: 'SIGN_OUT'});
      },
      updateUserProfile: async data => {
        dispatch({type: 'USER_PROFILE', userProfile: data.userProfile});
      },
      updateCartCount: async data => {
        dispatch({type: 'CART_COUNT', cartCount: data.cartCount});
      },
    }),
    [],
  );

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <AuthContext.Provider
        value={{
          authContext,
          userProfile: state.userProfile,
          cartCount: state.cartCount,
        }}>
        {state.userToken == null || state.userId == null ? (
          <AuthNavigator />
        ) : (
          <AppNavigator />
        )}
      </AuthContext.Provider>
    </>
  );
}
