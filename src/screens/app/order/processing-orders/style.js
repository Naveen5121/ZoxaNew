import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONT_FAMILY} from '../../../../constants/font-family';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    // padding: 10,
  },

  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 12.5,
    paddingHorizontal: 15,
  },

  card: {
    backgroundColor: COLORS.WHITE,
    // borderRadius: 3,
    overflow: 'hidden',
    //borderBottomWidth: 10,
    borderColor: COLORS.BG,
    borderBottomWidth: 1,
  },

  orderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12.5,
    paddingHorizontal: 15,
    backgroundColor: COLORS.BG,
  },

  orderNo: {
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
    fontSize: 14,
  },

  listConatiner: {
    flexDirection: 'row',
    marginVertical: 2,
  },

  listHeading: {
    color: COLORS.GREY,
    fontFamily: FONT_FAMILY.primary,
    fontSize: 13,
  },

  listValue: {
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 13,
    marginHorizontal: 5,
  },

  detailsBtn: {
    // paddingVertical: 5,
    // paddingHorizontal: 15,
    // borderRadius: 20,
    // marginRight: 10,
    //  backgroundColor: COLORS.PRIMARY,
    // backgroundColor: COLORS.BG,
  },

  details: {
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 12,
  },

  status: {
    color: '#2AA952',
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 12,
    marginHorizontal: 5,
  },
});
