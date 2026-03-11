import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/font-family';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  catContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 7.5,
    paddingVertical: 5,
  },
  card: {
    width: width / 3 - 15,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    overflow: 'hidden',
    margin: 5,
  },
  itemName: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.BLACK,
    marginVertical: 10,
    textAlign: 'center',
  },
  img: {
    height: 110,
    width: width / 3 - 17,
    resizeMode: 'stretch',
  },
});
