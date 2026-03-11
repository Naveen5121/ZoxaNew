import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONT_FAMILY} from '../../../../constants/font-family';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  card: {
    // borderRadius: 3,
    //elevation: 3,
    // marginHorizontal: 5,
    marginTop: 8,
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    // borderRadius: 3,
    //padding: 10,
  },

  orderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },

  orderNo: {
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 16,
    marginBottom: 2.5,
  },

  orderDate: {
    color: COLORS.DARK_GREY,
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 14,
    marginBottom: 15,
  },
  imgContainer: {
    width: '15%',
    aspectRatio: 1,
    padding: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.EXTRALIGHT_GREY,
    overflow: 'hidden',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  image: {
    // flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 6,
    resizeMode: 'contain',
    // height: 60,
    // width: 50,
    // marginRight: 10,
    // resizeMode: 'contain',
  },

  listConatiner: {
    flexDirection: 'row',
    //marginBottom: 5,
  },

  listHeading: {
    color: COLORS.GREY,
    fontFamily: FONT_FAMILY.primary,
    fontSize: 14,
  },

  listValue: {
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 14,
  },

  listLightHeading: {
    color: COLORS.GREY,
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 14,
  },

  listDarkValue: {
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
    fontSize: 16,
  },

  detailsBtn: {
    borderWidth: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },

  details: {
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primary,
    fontSize: 13,
  },

  status: {
    color: COLORS.GREEN,
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 14,
  },

  text: {
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 11,
    marginRight: 7,
    color: COLORS.BLACK,
    textTransform: 'capitalize',
  },

  text2: {
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 11,
    marginRight: 7,
    color: COLORS.GREY,
  },

  price: {
    fontFamily: FONT_FAMILY.primaryMediumItalic,
    fontSize: 12,
    marginRight: 7,
    color: COLORS.BLACK,
  },

  orderInfo: {
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.GREY,
    fontSize: 13,
    flex: 1,
  },

  orderInfoValue: {
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.BLACK,
    fontSize: 13,
    // flex: 1.5,
  },

  orderInfoValueGst: {
    fontFamily: FONT_FAMILY.primaryMediumItalic,
    color: COLORS.BLACK,
    fontSize: 12,
    // flex: 1.5,
  },
  orderInfoHeading: {
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.BLACK,
    fontSize: 14,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: COLORS.EXTRALIGHT_GREY,
    paddingBottom: 5,
  },
  infoContainer: {
    padding: 20,
    borderBottomWidth: 4,
    borderColor: COLORS.EXTRALIGHT_GREY,
  },

  orderInfoContainer: {
    flexDirection: 'row',
    marginVertical: 2.5,
  },

  reason: {
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.DARK_GREY,
    fontSize: 12,
    marginBottom: 5,
  },

  dotContainer: {
    backgroundColor: '#ffcccc',
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginRight: 10,
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  cancel: {
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.GREY,
    fontSize: 13,
  },
  cancelStatus: {
    color: COLORS.RED,
    fontFamily: FONT_FAMILY.primaryBold,
    fontSize: 14,
    marginVertical: 2.5,
  },
  downlaod: {
    fontSize: 11,
    fontFamily: FONT_FAMILY.primaryExtraBold,
    color: COLORS.WHITE,
    marginRight: 5,
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#99D111',
    paddingHorizontal: 10,
    paddingVertical: 7.5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 10,
  },
});
