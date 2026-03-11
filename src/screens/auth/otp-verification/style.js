import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/font-family';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
  },
  logo: {
    height: 85,
    //  / width: 125,
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: 30,
    // backgroundColor: 'red',
    alignSelf: 'center',
  },
  title: {
    fontSize: 13.5,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.GREY,
    marginBottom: 30,
  },

  heading: {
    fontSize: 24,
    fontFamily: FONT_FAMILY.primarySemiBold,
    color: COLORS.BLACK,
  },

  otpInput: {
    height: 100,
    alignItems: 'center',
    marginHorizontal: 5,
    width: width - 180,
  },

  resendCode: {
    fontSize: 13,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
    textAlign: 'center',
  },

  underlineStyleBase: {
    width: 45,
    height: 55,
    color: COLORS.BLACK,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
    fontWeight: 'bold',
    borderColor: COLORS.PRIMARY,
    // fontFamily: FONT_FAMILY.primaryMedium,
  },

  underlineStyleHighLighted: {
    borderColor: COLORS.PRIMARY,
    color: COLORS.PRIMARY,
  },
});
