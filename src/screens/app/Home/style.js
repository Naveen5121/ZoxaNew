import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/font-family';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    // padding: 15,
  },

  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
    marginHorizontal: 15,
  },

  heading: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
  seeall: {
    fontSize: 12,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.PRIMARY_SEMI_BOLD,
  },
  catContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  box: {
    // height: 100,
    backgroundColor: COLORS.WHITE,
    // flex: 1,
    // padding: 15,
    width: width / 4,
    margin: 5,
    // height: 100,
    borderRadius: 10,
    elevation: 2,
    overflow: 'hidden',
  },

  title: {
    fontSize: 12,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
    textAlign: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingVertical: 2.5,
  },
  infoContainer: {
    paddingBottom: 15,
  },
});
