import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONT_FAMILY} from '../../../../constants/font-family';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingTop: 10,
  },

  indicatorConatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },

  addressContainer: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderColor: COLORS.GREY,
  },

  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  heading: {
    fontFamily: FONT_FAMILY.primaryBold,
    fontSize: 14,
    marginBottom: 10,
  },

  address: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: 12,
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

  bottomAddBtn: {
    paddingHorizontal: 15,
    borderRadius: 25,
    paddingVertical: 12,
    marginBottom: 20,
  },

  btnContainer: {
    paddingHorizontal: 20,
    width: 200,
    height: 42.5,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    marginVertical: 20,
    elevation: 5,
    backgroundColor: COLORS.PRIMARY,
  },
  btnTxt: {
    textAlign: 'center',
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  btnIcon: {
    color: COLORS.WHITE,
  },

  successContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
  },
  successImage: {
    height: 65,
    width: 65,
    alignSelf: 'center',
  },

  success: {
    fontFamily: FONT_FAMILY.primaryBold,
    fontSize: 20,
    color: COLORS.BLACK,
    marginVertical: 10,
  },

  successMsg: {
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 12,
    color: COLORS.GREY,
    marginBottom: 15,
  },

  addBtnContainer: {position: 'absolute', bottom: 0, right: 20},
  addBtnShadow: {
    borderRadius: 40,
    elevation: 3,
    width: 45,
    height: 45,
    marginBottom: 20,
  },

  addBtn: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 40,
  },
});
