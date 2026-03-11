import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {COLORS} from '../constants/colors';
import Modal from 'react-native-modal';
import {FONT_FAMILY} from '../constants/font-family';
var {width} = Dimensions.get('window');

export default function ModalAlert(props) {
  return (
    <Modal
      onBackdropPress={props.onSkip}
      onBackButtonPress={props.onSkip}
      backdropOpacity={0.5}
      isVisible={props.isVisible}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>{props.heading}</Text>
          <Text style={styles.modalTxt}>{props.txt}</Text>
          <View style={styles.modalBtnContainer}>
            <TouchableOpacity onPress={props.onClose}>
              <Text style={styles.modalBtn}>{props.btnTxt}</Text>
            </TouchableOpacity>
            <View style={{marginHorizontal: 15}} />
            <TouchableOpacity onPress={props.onConfirm}>
              <Text style={styles.modalBtn}>{props.redBtnTxt}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.WHITE,
    padding: 30,
    borderRadius: 10,
    width: width - 60,
    justifyContent: 'center',
  },

  modalBtn: {
    fontFamily: FONT_FAMILY.primaryBold,
    textTransform: 'uppercase',
    color: COLORS.PRIMARY,
    fontSize: 14,
    marginTop: 2.5,
  },

  modalHeading: {
    fontFamily: FONT_FAMILY.primarySemiBold,
    color: COLORS.BLACK,
    fontSize: 16,
    marginBottom: 10,
  },

  modalTxt: {
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.GREY,
    fontSize: 14,
  },

  modalBtnContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'flex-end',
  },
});
