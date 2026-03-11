import {ToastAndroid, Platform} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

export default function ToastAlertMsg(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Snackbar.show({
      text: msg,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: COLORS.PRIMARY,
      fontFamily: FONT_FAMILY.primaryMedium,
    });
  }
}
