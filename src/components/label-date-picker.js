import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Platform} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default function LabelDatePicker(props) {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [show, setShow] = useState(false);
  const [formattedDate, setFormattedDate] = useState(
    moment(today).format('DD-MM-YYYY'),
  );

  const onChange = (event, selectedDate) => {
    if (event.type === 'set' && selectedDate) {
      let newFormattedDate = moment(selectedDate).format('DD-MM-YYYY');
      setDate(selectedDate);
      setFormattedDate(newFormattedDate);
      props.onSelectDate(newFormattedDate);
    }
    // 🔹 Close picker immediately after selecting a date
    if (Platform.OS === 'android') {
      setShow(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.placeholder}</Text>
      <TouchableOpacity onPress={() => setShow(true)} style={styles.input}>
        <Text style={formattedDate ? styles.selectedDate : styles.placeholder}>
          {formattedDate || `Select ${props.placeholder}`}
        </Text>
        <Feather
          style={styles.icon}
          color={COLORS.BLACK}
          name={'calendar'}
          size={16}
        />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date}
          mode={'date'}
          display="default"
          minimumDate={today}
          onChange={onChange}
          onTouchCancel={() => setShow(false)} // 🔹 Close when user cancels
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: 10,
  },
  input: {
    paddingLeft: 15,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: COLORS.EXTRALIGHT_GREY,
    backgroundColor: COLORS.BG,
    color: COLORS.BLACK,
    height: 49,
    justifyContent: 'center',
  },
  selectedDate: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: 12,
    color: COLORS.BLACK,
  },
  placeholder: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: 12,
    color: '#999999',
  },
  icon: {
    marginRight: 5,
    position: 'absolute',
    right: 8.5,
  },
  label: {
    fontSize: 12,
    color: COLORS.BLACK,
    marginBottom: 5,
    fontFamily: FONT_FAMILY.primary,
    marginHorizontal: 3,
  },
});
