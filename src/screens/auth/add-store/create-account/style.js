import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONT_FAMILY} from '../../../../constants/font-family';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  stepsContainer: {
    flexDirection: 'row',
    //justifyContent: 'center',
    marginVertical: 5,
    alignItems: 'center',
    marginHorizontal: 30,
  },
  completedStep: {
    //  backgroundColor: COLORS.GREEN,
    borderRadius: 11,
    height: 11,
    justifyContent: 'center',
    alignItems: 'center',

    width: 11,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GREY,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.BLACK,
    borderRadius: 4,
  },
  completedStepTxt: {
    fontSize: 14,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primary,
  },
  activestep: {
    backgroundColor: COLORS.GREEN,
    borderRadius: 10,
    height: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    width: 7,
  },
  pendingStep: {
    //  backgroundColor: COLORS.GREEN,
    borderRadius: 11,
    height: 11,
    justifyContent: 'center',
    alignItems: 'center',

    width: 11,
    borderWidth: 1,
    borderColor: COLORS.BLACK,
  },

  pendingStepTxt: {
    fontSize: 14,
    color: '#E7E7E7',
    fontFamily: FONT_FAMILY.primary,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  text: {
    fontSize: 10,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primary,
    textAlign: 'center',
    marginHorizontal: 8,
    flex: 1,
  },
  inactivetext: {
    fontSize: 10,
    color: COLORS.LIGHT_GREY3,
    fontFamily: FONT_FAMILY.primary,
    textAlign: 'center',
    marginHorizontal: 8,
    flex: 1,
  },
  heading: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.primarySemiBold,
    color: COLORS.BLACK,
    marginBottom: 15,
  },
  modalContainer: {
    backgroundColor: COLORS.WHITE,
    padding: 25,
    borderRadius: 5,
    width: width - 50,
    justifyContent: 'center',
    paddingVertical: 35,
  },
  img: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 17,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
    textAlign: 'center',
    marginVertical: 5,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.DARK_GREY,
    fontFamily: FONT_FAMILY.primary,
    textAlign: 'center',
  },
  otpInput: {
    height: 100,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    // width: width - 100,
  },

  underlineStyleBase: {
    width: 35,
    height: 40,
    color: COLORS.BLACK,
    fontSize: 14,
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
    paddingTop: 15,
    // borderRadius: 10,
  },

  underlineStyleHighLighted: {
    borderColor: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.primaryBold,
  },
});
