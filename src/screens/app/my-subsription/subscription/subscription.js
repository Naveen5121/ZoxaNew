import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS} from '../../../../constants/colors';
import moment from 'moment';
import {FONT_FAMILY} from '../../../../constants/font-family';
import CustomBtn from '../../../../components/custom-btn';
import {ICONS} from '../../../../constants/icons';
import API from '../../../../actions/api';
import ToastAlertMsg from '../../../../components/toast-alert-msg';
import {useIsFocused} from '@react-navigation/native';
import ActivityLoader from '../../../../components/activity-loader';

export default function Subscription(props) {
  const isVisible = useIsFocused();

  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [availableSubscription, setAvailableSubscription] = useState([]);
  const [availableCoins, setAvailableCoins] = useState(0);

  async function fetchProfile() {
    try {
      const user_profile = await API.getCompanyProfile();

      if (user_profile.success === 'true') {
        const profileData = user_profile.extraData.profile;
        setProfile(profileData);
        setAvailableSubscription(profileData.available_subscription || []);
        setAvailableCoins(profileData.available_coins || 0);
        setIsLoading(false);
      } else {
        ToastAlertMsg('Something went wrong');
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, [isVisible]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityLoader isLoading={isLoading} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.amountCard}>
          <Image source={ICONS.COINS} style={styles.icon} />
          <View style={{flex: 1}}>
            <Text style={styles.heading}>Available Coins</Text>
            <Text style={styles.amount}>{availableCoins}</Text>
          </View>
        </View>
        <View style={{height: 1}} />
      </View>

      {availableSubscription.length > 0 ? (
        availableSubscription.map((data, i) => (
          <View key={i} style={styles.card}>
            <View style={styles.listrow}>
              <Text style={styles.title}>Subscribe Amount -</Text>
              <Text style={{...styles.subtitle, color: COLORS.RED}}>
                ₹ {data.price}
              </Text>
            </View>

            <View style={styles.listrow}>
              <Text style={styles.title}>Discount -</Text>
              <Text style={{...styles.subtitle, color: COLORS.RED}}>
                {data.off_percent} %
              </Text>
            </View>

            <View style={styles.listrow}>
              <Text style={styles.title}>Valid from -</Text>
              <Text style={styles.subtitle}>
                {moment(data.subscription_start_date).format('ll')}
              </Text>
            </View>

            <View style={styles.listrow}>
              <Text style={styles.title}>Valid To -</Text>
              <Text style={{...styles.subtitle, color: COLORS.RED}}>
                {moment(data.subscription_end_date).format('ll')}
              </Text>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.container2}>
          <Text style={styles.nodata}>No Active Subscription</Text>
          <CustomBtn
            title="Buy Subscription"
            marginVertical={10}
            onPress={() => props.navigation.navigate('SubscriptionCard')}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    padding: 12.5,
  },
  container2: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    padding: 12.5,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  card: {
    borderWidth: 0.8,
    padding: 7.5,
    borderColor: COLORS.PRIMARY,
    borderRadius: 4,
    elevation: 2.5,

    backgroundColor: COLORS.WHITE,
  },
  title: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
    flex: 1,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.GREY,
    fontFamily: FONT_FAMILY.primaryMedium,
    flex: 1,
  },
  listrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nodata: {
    fontSize: 16,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
    textAlign: 'center',
  },
  topContainer: {
    // alignItems: 'center',
    overflow: 'hidden',

    elevation: 5,
    backgroundColor: COLORS.WHITE,
    // flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    // paddingVertical: 25,
  },

  amountCard: {
    padding: 15,
    flexDirection: 'row',
    // alignItems: 'center',
    // overflow: 'hidden',
    // padding: 15,
    // elevation: 5,
    //  backgroundColor: COLORS.WHITE,
    // flexDirection: 'row',
    // marginBottom: 10,
    // paddingVertical: 25,
  },
  amount: {
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBlack,
    fontSize: 20,
    // textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heading: {
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 12,
    letterSpacing: 0.5,
  },
  icon: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    marginRight: 15,
  },
});
