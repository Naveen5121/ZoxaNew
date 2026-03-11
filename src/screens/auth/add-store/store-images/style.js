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
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30,
    justifyContent: 'center',
  },

  cardHeading: {
    fontSize: 13,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primarySemiBold,
    marginTop: 10,
    marginBottom: -1.5,
  },
  cardSubHeading: {
    fontSize: 12,
    color: COLORS.DARK_GREY,
    fontFamily: FONT_FAMILY.primary,
  },

  image: {
    height: width / 2 - 22,
    width: width / 2 - 22,
  },

  imageContainer: {
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },

  addImageContainer: {
    margin: 5,
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 0.5,
    height: 175,
    //  width: width / 3 - 40,
    borderColor: '#BDBDBD',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    marginTop: 25,
  },

  storeImage: {
    height: 175,
    width: width - 40,
    // backgroundColor: 'red',
    // resizeMode: 'contain',
  },

  delete: {
    height: 35,
    width: 35,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 10,
    zIndex: 1,
  },
  addCircle: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.LIGHT_GREY,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
