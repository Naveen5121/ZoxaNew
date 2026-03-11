import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/font-family';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    paddingVertical: 30,
    paddingHorizontal: 15,
    backgroundColor: COLORS.WHITE,
  },
  logo: {
    height: 85,
    //  / width: 125,
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: 30,
    // backgroundColor: 'red',
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.PRIMARY,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.BLACK,
    marginBottom: 10,
  },
  otpTxt: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.GREY,
    paddingLeft: 5,
  },
  agreeTxt: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.BLACK,
    textAlign: 'center',
  },

  emailLogin: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primarySemiBold,
    color: COLORS.GREY,
    paddingLeft: 5,
    marginTop: -10,
    textAlign: 'center',
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7.5,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GREY,
    borderRadius: 6,
    marginVertical: 10,
    height: 48,
  },
  flag: {
    fontSize: 14,
    marginRight: 10,
  },
  callingCode: {
    fontSize: 12,
    marginRight: 5,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.BLACK,
  },
  countryName: {
    fontSize: 12,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
  phoneInputContainer: {
    flex: 1,
  },
  phoneInput: {
    borderBottomWidth: 1,
    borderColor: COLORS.GRAY,
    fontSize: 16,
    paddingVertical: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    maxHeight: '80%',
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  countryItemSeparator: {
    height: 1,
    backgroundColor: COLORS.GRAY,
    marginHorizontal: 15,
  },
  closeButton: {
    padding: 10.5,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: COLORS.GRAY,
  },
  closeButtonText: {
    color: COLORS.BLACK,
    fontSize: 14,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
});
