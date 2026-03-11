import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONT_FAMILY} from '../../../../constants/font-family';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    //padding: 15,
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
    color: COLORS.WHITE,
    fontSize: 14,
    fontFamily: FONT_FAMILY.primaryBold,
    textAlign: 'center',
    marginLeft: 5,
  },

  bottomBtnContainer: {
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    padding: 10,
  },

  heading: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.PRIMARY,
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
    color: COLORS.BLACK,
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
    color: COLORS.BLACK,
    marginBottom: 2.5,
  },

  info: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.BLACK,
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
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  headerText: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.BLACK,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  cellText: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.BLACK,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  tableContainer: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  tableHeader2: {
    flexDirection: 'row',
    backgroundColor: '#c2e0a4', // Light green
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText2: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
    flex: 1,
    textAlign: 'center',
  },
  tableRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    //justifyContent: 'center',
  },
  cellText2: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
});
