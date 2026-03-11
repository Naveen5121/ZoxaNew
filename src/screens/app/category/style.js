import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/font-family';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  catContainer: {
    //width: width / 3.5,
    width: '22%',
    marginRight: 3,
  },

  activeImage: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginBottom: 10,
  },

  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
  },

  subCatImage: {
    width: 40,
    height: 40,
    resizeMode: 'stretch',
    alignSelf: 'center',
  },

  imageContainer: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  containerRow: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
  },

  tab: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 5,
    paddingVertical: 17.5,
    borderWidth: 0.25,
    borderColor: COLORS.LIGHT_GREY,
    alignItems: 'center',
  },
  tabSpace: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
    borderWidth: 0.5,
    borderColor: COLORS.LIGHT_GREY,
  },
  activeTab: {
    backgroundColor: COLORS.WHITE,
    paddingVertical: 17.5,
    // borderColor: COLORS.PRIMARY,
    // borderLeftWidth: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
    overflow: 'hidden',
  },
  borderLine: {
    backgroundColor: COLORS.PRIMARY,
    flex: 1,
    width: 5,
    position: 'absolute',
    right: 0,
    height: 110,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  activeTabTitle: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.PRIMARY,
    textAlign: 'center',
    textTransform: 'capitalize',
  },

  tabTitle: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.BLACK,
    textAlign: 'center',
  },

  subCatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: COLORS.LIGHT_GREY,
    paddingVertical: 15,
  },

  subCatTitle: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.BLACK,
    flex: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
