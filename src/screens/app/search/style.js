import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/font-family';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingTop: 18,
  },
  search: {
    position: 'absolute',
    top: 10,
    left: 10,
  },

  searchBox: {
    backgroundColor: COLORS.WHITE,
    height: 44,
    paddingLeft: 35,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.BLACK,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    color: COLORS.BLACK,
    fontSize: 12,
  },

  header: {
    height: 85,
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: COLORS.WHITE,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancel: {
    position: 'absolute',
    right: 10,
  },
  imageicon: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    marginRight: 8,
  },
  card: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  producttitle: {
    fontSize: 12,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
  opps: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.primarySemiBold,
    color: COLORS.BLACK,
    textAlign: 'center',
    marginBottom: 10,
  },

  heading: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.GREY,
    textAlign: 'center',
    marginBottom: 10,
  },
});
