import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../../../constants/colors';
import {FONT_FAMILY} from '../../../../../constants/font-family';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    padding: 15,
  },

  addressContainer: {
    padding: 15,
    backgroundColor: COLORS.EXTRALIGHT_GREY,
    marginVertical: 10,
  },

  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  heading: {
    fontFamily: FONT_FAMILY.primaryBold,
    fontSize: 14,
    marginBottom: 10,
    color: COLORS.BLACK,
    flex: 1,
  },

  address: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: 12,
    color: COLORS.DARK_GREY,
  },
  phoneNo: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.GREY,
  },

  checkBoxTitle: {
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 14,
    color: COLORS.BLACK,
  },

  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: -10,
  },

  addBtnContainer: {position: 'absolute', bottom: 0, right: 20},
  addBtn: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 40,
    elevation: 3,
    marginBottom: 20,
  },

  bottomContainer: {
    width: '100%',
    elevation: 50,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0,
    padding: 15,
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE,
  },

  price: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.PRIMARY,
    textTransform: 'uppercase',
  },

  save: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primaryLight,
    color: COLORS.GREY,
  },

  btn: {
    borderRadius: 5,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    elevation: 5,
  },

  btnTxt: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.WHITE,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
