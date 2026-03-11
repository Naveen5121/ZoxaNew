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
    marginBottom: 5,
    alignItems: 'center',
    marginHorizontal: 25,
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
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primarySemiBold,
    marginBottom: 10,
  },
  cardContainer: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 15,
    paddingVertical: 15,
    // borderRadius: 10,
    marginBottom: 5,
    borderBottomWidth: 0.5,
    // elevation: 3,
    //  marginHorizontal: 5,
    borderColor: COLORS.DARK_GREY,
    borderStyle: 'dashed',
  },
});
