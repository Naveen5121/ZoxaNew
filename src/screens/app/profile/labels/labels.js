import {
  Image,
  StyleSheet,
  Dimensions,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import {FONT_FAMILY} from '../../../../constants/font-family';
import {IMAGES} from '../../../../constants/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../../../../../auth-context';

var {width} = Dimensions.get('window');

export default function Labels(props) {
  const {userProfile} = React.useContext(AuthContext);
  //console.log(userProfile);
  const options = [
    {
      icon: 'user',
      title: 'Personal Info',
      onPress: () => {},
    },
    {
      icon: 'truck',
      title: 'Shipping Address',
      onPress: () => {},
    },
    {
      icon: 'file-text',
      title: 'Tax Information',
      onPress: () => {},
    },
    {
      icon: 'folder',
      title: 'My Subscription',
      onPress: () => props.navigation.navigate('Subscription', userProfile),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          <Image
            style={styles.logo}
            source={{uri: userProfile.business_photo}}
          />

          <View>
            <View style={styles.row}>
              <Text style={styles.name}>{userProfile.owner_name}</Text>
              {userProfile.available_subscription.length >= 1 && (
                <Text style={styles.premium}>Premium User</Text>
              )}
            </View>
            <View>
              <Text style={styles.userid}>ZOXA ID ZOXA000102510</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardContainer}>
          {options.map((data, i) => (
            <TouchableOpacity
              style={styles.card}
              key={i}
              onPress={data.onPress}>
              <View style={{alignItems: 'center'}}>
                <Feather name={data.icon} size={32} color={COLORS.PRIMARY} />
              </View>
              <Text style={styles.txt}>{data.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View>
          <TouchableOpacity style={styles.Btn}>
            <Text style={styles.btnTxt}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Btn}>
            <Text style={styles.btnTxt}>Return & Refund</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Btn}>
            <Text style={styles.btnTxt}>Privacy & Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Btn}>
            <Text style={styles.btnTxt}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width / 4 - 25,
    borderColor: COLORS.LIGHT_GREY,

    marginVertical: 10,
    marginHorizontal: 10,
    //backgroundColor: 'red',
  },
  textBg: {
    backgroundColor: COLORS.PRIMARY,
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  txt: {
    fontSize: 10.5,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.BLACK,
    textAlign: 'center',
    marginTop: 5,
  },
  heading: {
    fontSize: 15,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.BLACK,
    marginLeft: 5,
    marginVertical: 5,
  },
  icon: {
    height: 30,
    width: 30,
    //borderRadius: 20,
    marginBottom: 3.5,
    marginTop: 3.5,
    // resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  cardContainer: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    paddingHorizonta: 5,
    paddingVertical: 10,
    marginVertical: 7.5,
    marginHorizontal: 10,
  },
  logo: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
    marginRight: 5,
    marginLeft: 5,
  },
  name: {
    fontSize: 16,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
  userid: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primary,
  },
  Btn: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',

    //borderRadius: 5,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.EXTRALIGHT_GREY,
  },
  btnTxt: {
    fontSize: 13,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
  premium: {
    fontSize: 12,
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.primary,
    paddingHorizontal: 5,
    //paddingVertical: 1,
    backgroundColor: COLORS.LIGHT_SKY_BLUE,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    textAlign: 'center',
    marginHorizontal: 2.5,
    borderRadius: 5,
  },
  row: {flexDirection: 'row', alignItems: 'center', flex: 1},
});
