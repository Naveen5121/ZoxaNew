import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

export default function LabelPickerBox({image, label, onCancel, onSelectFile}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {image?.uri && (
        <Image
          source={{
            uri: image?.uri,
          }}
          style={styles.selectedimage}
        />
      )}
      <View style={styles.uploadBtn}>
        {image ? (
          <>
            <Text style={styles.fileName} numberOfLines={1}>
              {image.fileName || image.uri}
            </Text>

            <TouchableOpacity style={styles.cancel} onPress={onCancel}>
              <Feather name="x" size={12} color={COLORS.WHITE} />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.selectContainer}
            onPress={onSelectFile}>
            <Text style={styles.select}>Select File</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 5,
  },

  label: {
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 12,
    color: COLORS.BLACK,
    marginBottom: 2.5,
  },

  uploadBtn: {
    height: 48,
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  select: {
    fontSize: 11,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primaryMedium,
  },

  selectContainer: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 5,
    borderRadius: 5,
  },
  fileName: {
    fontSize: 12,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primary,
    // marginBottom: -2,
    flex: 1,
  },

  cancel: {
    height: 20,
    width: 20,
    backgroundColor: COLORS.RED,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedimage: {
    height: 108,
    width: 120,
    //alignSelf: 'center',
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 5,
  },
});
