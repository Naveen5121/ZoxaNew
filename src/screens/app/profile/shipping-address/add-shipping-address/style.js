import {StyleSheet, Dimensions} from 'react-native';
import {FONT_FAMILY} from '../../../../../constants/font-family';
import {COLORS} from '../../../../../constants/colors';
var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  innerContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },

  borderBtnContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginBottom: 10,
    marginTop: 10,
  },

  borderBtn: {
    borderWidth: 1,
    height: 20,
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 3,
    borderColor: COLORS.PRIMARY,
    marginRight: 20,
    backgroundColor: COLORS.WHITE,
  },

  borderBtnTxt: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.PRIMARY,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  inactiveBorderBtn: {
    borderWidth: 1,
    height: 20,
    alignContent: 'center',
    justifyContent: 'center',

    paddingHorizontal: 15,
    borderRadius: 3,
    borderColor: COLORS.EXTRALIGHT_GREY,
    marginRight: 20,
  },

  inactiveBorderBtnTxt: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.GREY,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
