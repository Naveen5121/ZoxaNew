import {StyleSheet, Dimensions, Platform} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/font-family';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    flex: 1,
    padding: 30,
    justifyContent: 'flex-end',
    // alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.22,
    marginBottom: 10,
    overflow: 'hidden',
    paddingBottom: 45,
  },

  image: {
    height: width - 115,
    width: width - 115,
    // resizeMode: 'contain',
    marginVertical: 30,
    alignSelf: 'center',
    // backgroundColor: 'red',
  },

  bottomContainer: {
    padding: 30,
    backgroundColor: COLORS.WHITE,
  },

  topContainer: {},

  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //  marginTop: 30,
  },

  activeDot: {
    width: 15,
    height: 5,
    backgroundColor: COLORS.BLACK,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: COLORS.WHITE,
    borderRadius: 6,
    marginHorizontal: 4,
    borderWidth: 1,
  },

  heading: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.primaryBold,
    //  textTransform: 'uppercase',
    textAlign: 'center',
    color: COLORS.BLACK,
    marginBottom: 5,
  },

  subHeading: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.primary,
    textAlign: 'center',
    marginBottom: 30,
    color: COLORS.BLACK,
    // marginHorizontal: 8,
  },

  borderBtn: {
    backgroundColor: COLORS.PRIMARY,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginVertical: 10,
    elevation: 3,
    borderWidth: 2,
  },

  btn: {
    backgroundColor: COLORS.PRIMARY,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
    flexDirection: 'row',
    elevation: 3,
    // borderWidth: 1.5,
  },
  borderBtnTxt: {
    fontSize: 12.5,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.BLACK,
    textTransform: 'uppercase',
  },

  btnTxt: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.WHITE,
    textTransform: 'uppercase',
  },

  or: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.BLACK,
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  signup: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});
