import {StyleSheet, Dimensions} from 'react-native';
import {FONT_FAMILY} from '../../../../constants/font-family';
import {COLORS} from '../../../../constants/colors';
var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    // paddingTop: 10,
  },

  deleteBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffcccc',
    margin: 15,
    padding: 20,
    borderRadius: 5,
    elevation: 1,
  },

  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },

  imageContainer: {
    overflow: 'hidden',
    alignSelf: 'center',
    // backgroundColor: 'pink',
    marginRight: 10,
    width: '15%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.EXTRALIGHT_GREY,
    aspectRatio: 1,
  },

  // btnContainer: {
  //   padding: 10,
  //   width: 140,
  //   justifyContent: 'space-around',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderRadius: 8,
  //   elevation: 5,
  //   backgroundColor: COLORS.PRIMARY,
  // },
  btnContainer: {
    padding: 7.5,
    width: width / 2.5,
    // justifyContent: 'space-around',
    //  flexDirection: 'row',
    // alignItems: 'center',
    borderRadius: 4,
    elevation: 2.5,
    backgroundColor: COLORS.PRIMARY,
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
    borderWidth: 0,
    backgroundColor: COLORS.WHITE,
  },

  bottomBtnPrice: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.PRIMARY,
    textTransform: 'uppercase',
  },

  save: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primaryMediumItalic,
    color: COLORS.GREY,
  },

  card: {
    // borderRadius: 5,
    backgroundColor: 'transparent',
    //  elevation: 3,
    //  margin: 15,
    backgroundColor: COLORS.WHITE,
    // padding: 12.5,
    flexDirection: 'row',
    // alignItems: 'flex-end',
    alignItems: 'center',
    // marginBottom: 5,
    overflow: 'hidden',
    borderBottomWidth: 4,
    borderColor: COLORS.EXTRALIGHT_GREY,
    padding: 15,
    //paddingVertical: 17.5,
  },

  text: {
    fontFamily: FONT_FAMILY.primarySemiBold,
    fontSize: 14,
    color: COLORS.BLACK,
    textTransform: 'capitalize',
  },
  rowCenter: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    marginTop: 40,
  },
  weight: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: 12,
    color: COLORS.GREY,
    marginBottom: 5,
  },
  price: {
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 14,
    color: COLORS.GREY,
  },

  qty: {
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.BLACK,
    width: 25,
    textAlign: 'center',
  },

  toggleBtn: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    // flex: 1,
    height: 25,
    width: 25,
    borderRadius: 5,
  },

  heading: {
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.GREY,
    fontSize: 10,
    marginLeft: 5,
  },
  deletBtn: {
    position: 'absolute',
    right: 40,
    top: 12,
    height: 30,
    width: 30,
    backgroundColor: COLORS.EXTRALIGHT_GREY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  Rbsheet: {
    wrapper: {
      backgroundColor: 'rgba(0, 0, 0, 0.49)',
    },
    draggableIcon: {
      backgroundColor: '#000',
      width: 50,
    },
    container: {
      height: 350,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
    },
    draggableIcon: {
      backgroundColor: COLORS.PRIMARY,
    },
  },
  bsHeading: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.primarySemiBold,
    color: COLORS.BLACK,
    // textAlign: 'center',
    // marginTop: 5,
    marginBottom: 10,
    // flex: 1,
    paddingLeft: 15,
  },
});
