import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../../constants/colors';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});
