import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONT_FAMILY} from '../../../../constants/font-family';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    padding: 5,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // margin: 5.5,
    // justifyContent: 'center',
  },

  favBtn: {
    height: 45,
    width: 50,
    backgroundColor: COLORS.BG_LIGHT,
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn: {
    backgroundColor: COLORS.PRIMARY,
    elevation: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    flex: 1,
  },

  bottomBtnTxt: {
    color: COLORS.BLACK,
    fontSize: 14,
    fontFamily: FONT_FAMILY.primaryBold,
    textAlign: 'center',
    marginLeft: 5,
  },

  bottomBtnContainer: {
    backgroundColor: COLORS.BLACK,
    flexDirection: 'row',
    padding: 10,
  },

  heading: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.WHITE,
    marginTop: 15,
    marginBottom: 5,
  },

  card: {
    borderWidth: 0.5,
    borderColor: COLORS.DARK_GREY,
    borderRadius: 2.5,
    overflow: 'hidden',
    marginTop: 5,
  },

  listHeading: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.WHITE,
    flex: 1,
    padding: 10,
    borderWidth: 0.5,
    borderColor: COLORS.DARK_GREY,
  },
  listValue: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.LIGHT_GREY,
    flex: 2,
    padding: 10,
    borderWidth: 0.5,
    borderColor: COLORS.DARK_GREY,
  },

  list: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: COLORS.GREY,
  },

  productName: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.WHITE,
    marginBottom: 2.5,
  },

  info: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.EXTRALIGHT_GREY,
    marginBottom: 5,
    //  marginLeft: 2.5,
  },

  price: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.PRIMARY,
    marginBottom: 15,
  },

  btnTxt: {
    textAlign: 'center',
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primary,
    fontSize: 13,
    marginHorizontal: 5,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
