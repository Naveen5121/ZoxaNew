import {StyleSheet, StatusBar, Dimensions} from 'react-native';
import {FONT_FAMILY} from '../../../../constants/font-family';
import {COLORS} from '../../../../constants/colors';
var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    // paddingTop: 10,
  },

  savingContainer: {
    padding: 4.5,
    backgroundColor: COLORS.LIGHT_BG,
  },
  savingTitle: {
    fontSize: 12,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
    textAlign: 'center',
  },

  divider: {
    height: 0.5,
    backgroundColor: COLORS.LIGHT_GREY,
    marginVertical: 10,
  },

  btnContainer: {
    padding: 10,
    width: 140,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 1.5,
    backgroundColor: COLORS.PRIMARY,
    height: 40,
  },
  btnTxt: {
    textAlign: 'center',
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 12,
    marginHorizontal: 5,
    textTransform: 'uppercase',
  },
  bottomBtnContainer: {
    width: '100%',
    elevation: 50,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
  },

  bottomBtnPrice: {
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
    fontSize: 18,
  },

  checkoutContainer: {
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
    marginBottom: 15,
    color: COLORS.PRIMARY,
  },

  couponTitle: {
    fontFamily: FONT_FAMILY.primaryBold,
    fontSize: 14,
    marginBottom: 5,
    color: COLORS.PRIMARY,
    paddingLeft: 15,
  },
  address: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: 12,
    color: COLORS.BLACK,
  },

  paymentType: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: 14,
    color: COLORS.BLACK,
  },
  onlinePayment: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: 11,
    color: COLORS.GREY,
  },

  amountContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: COLORS.LIGHT_BG,
    paddingTop: 5,
  },

  amountRowContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 2,
  },

  amountTitle: {
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 12,
    color: COLORS.GREY,
  },

  amount: {
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 12,
    color: COLORS.BLACK,
  },

  gst: {
    fontFamily: FONT_FAMILY.primaryMediumItalic,
    fontSize: 11,
    color: COLORS.BLACK,
  },
  removeText: {
    color: 'red',
    marginLeft: 10,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  summaryTxt: {
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 14,
    color: COLORS.GREY,
  },

  summaryAmount: {
    fontFamily: FONT_FAMILY.primarySemiBold,
    fontSize: 16,
    color: COLORS.BLACK,
  },

  methodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },

  selectedCircle: {
    height: 20,
    width: 20,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },

  circle: {
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'green',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.TRANSPARENT_BLACK,
    justifyContent: 'flex-end',
  },

  modalInnerContainer: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modalHeading: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
    flex: 1,
    textAlign: 'center',
  },
  buttonClose: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  modalHeadingContainer: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },

  couponContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: COLORS.LIGHT_BG,

    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 15,
  },

  couponImage: {
    height: 25,
    width: 25,

    marginRight: 10,
  },
  applyCoupon: {
    fontSize: 13,
    color: COLORS.DARK_GREY,
    fontFamily: FONT_FAMILY.primarySemiBold,
  },

  removeCoupon: {
    fontFamily: FONT_FAMILY.primaryBold,
    fontSize: 12,
    color: COLORS.PRIMARY,
  },

  couponMsg: {
    fontSize: 12,
    color: COLORS.RED,
    fontFamily: FONT_FAMILY.primarySemiBold,
    marginTop: -2,
    marginHorizontal: 2.5,
    marginBottom: 10,
  },
  save: {
    fontFamily: FONT_FAMILY.primarySemiBold,
    fontSize: 11,
    color: 'green',
  },

  modalHeaderContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: StatusBar.currentHeight + 55,
    backgroundColor: COLORS.WHITE,
    elevation: 5,
    marginBottom: 5,
    //justifyContent: 'flex-end',
  },

  couponModalContainer: {
    flex: 1,
    backgroundColor: COLORS.TRANSPARENT_BLACK,
  },
});
