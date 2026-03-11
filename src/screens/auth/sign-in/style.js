import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/font-family';

const {height} = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: COLORS.WHITE,
    padding: 20,
    paddingVertical: 40,
    height: height,
  },
  logo: {
    height: 40,
    resizeMode: 'contain',
    marginBottom: 20,
    width: 130,
    //backgroundColor: 'red',
    marginTop: 10,
    // alignSelf: 'center',
    marginBottom: 30,
  },
  heading: {
    fontSize: 28,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primarySemiBold,
    marginBottom: 5,
    textAlign: 'center',
  },

  subHeading: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.BLACK,
    marginBottom: 30,
  },
  welcome: {
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.BLACK,
    fontSize: 24,
  },
  signin: {
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.BLACK,
    fontSize: 20,
    marginBottom: 15,
  },
  forgot: {
    fontSize: 13,
    color: COLORS.SECONDARY,
    fontFamily: FONT_FAMILY.primary,
    marginTop: 5,
    paddingLeft: 5,
    marginBottom: 50,
    textAlign: 'right',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    justifyContent: 'center',
    marginBottom: 40,
  },
  already: {
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.BLACK,
    fontSize: 13,
  },
  account: {
    fontSize: 13,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primary,
  },
  btnTxt: {
    fontSize: 13,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primarySemiBold,
    marginLeft: 10,
  },
  btn: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#3F3939',
    // elevation: 2,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12.5,
    marginHorizontal: 2,
    marginBottom: 10,
  },
});
