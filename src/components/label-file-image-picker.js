import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  Linking,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {FONT_FAMILY} from '../constants/font-family';
import {ICONS} from '../constants/icons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; // Import for media selection

import ToastAlertMsg from './toast-alert-msg';
import { pick } from '@react-native-documents/picker';
import {Divider} from 'react-native-elements';
import {COLORS} from '../constants/colors';
import {AuthContext} from '../../auth-context';

export default function LabelFileImagePicker(props) {
  const [modalShow, setModalShow] = useState(false);
  const {translatedData} = React.useContext(AuthContext);
  async function selectImage() {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });

      if (!result.didCancel && result.assets && result.assets.length > 0) {
        const image = result.assets[0];

        uploadImagesToServer(image);
      } else {
        result;
      }
    } catch (error) {
      console.error(error);
    }
    setModalShow(false);
  }

  async function openCamera() {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
      });

      if (!result.didCancel && result.assets && result.assets.length > 0) {
        const image = result.assets[0];
        uploadImagesToServer(image);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
    setModalShow(false);
  }

  const chooseFile = async () => {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      console.log(file);

      uploadImagesToServer({fileName: file[0].name, ...file[0]});
    } catch (err) {
      console.log(err);
    }
  };

  async function uploadImagesToServer2(image) {
    try {
      const json = await setUploadImageToServer(image);

      if (json.error) {
        ToastAlertMsg(json.message);
      } else {
        props.onSelectFile(json.fileName);
      }

      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }

  async function uploadImagesToServer(image) {
    try {
      console.log(image);
      props.onSelectFile(image);
    } catch (error) {
      console.log(error);
    }
  }

  const getFileExtension = uri => uri?.split('.')?.pop()?.toLowerCase();

  const isImage = extension => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    return imageExtensions.includes(extension);
  };

  const fileExtension = getFileExtension(props.file?.uri);

  console.log(fileExtension);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>

      <View style={styles.uploadBtn}>
        {props.file ? (
          <>
            <Text style={styles.fileName} numberOfLines={1}>
              {props.file?.uri}
            </Text>

            <TouchableOpacity style={styles.cancel} onPress={props.onCancel}>
              <Feather name="x" size={12} color={COLORS.WHITE} />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.selectContainer}
            onPress={() => setModalShow(true)}>
            <Text style={styles.select}>{translatedData.select}</Text>
          </TouchableOpacity>
        )}
      </View>

      {props.file &&
        (isImage(fileExtension) ? (
          <Image source={{uri: props.file.uri}} style={styles.selectedImage} />
        ) : (
          <TouchableOpacity onPress={() => Linking.openURL(props.file.uri)}>
            <Image source={ICONS.PDF} style={styles.selectedImage} />
          </TouchableOpacity>
        ))}

      <Modal
        statusBarTranslucent={true}
        onRequestClose={() => setModalShow(false)}
        animationType="fade"
        transparent={true}
        visible={modalShow}>
        <View style={styles.modalView}>
          <View style={{backgroundColor: COLORS.WHITE}}>
            <View style={{backgroundColor: COLORS.PRIMARY}}>
              <Text style={styles.modalHeading}>Choose an Action</Text>
            </View>

            <TouchableOpacity
              style={styles.modalBtn}
              onPress={selectImage}
              onPressOut={() => setModalShow(false)}>
              <Feather name="image" size={22} color={COLORS.BLACK} />
              <Text style={styles.modalBtnTxt}>{translatedData.gallery}</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={openCamera}
              onPressOut={() => setModalShow(false)}>
              <Feather name="camera" size={22} color={COLORS.BLACK} />
              <Text style={styles.modalBtnTxt}>{translatedData.camera}</Text>
            </TouchableOpacity>

            {props?.isShowFileUpload && (
              <>
                <Divider />
                <TouchableOpacity
                  style={styles.modalBtn}
                  onPress={chooseFile}
                  onPressOut={() => setModalShow(false)}>
                  <Feather name="file-text" size={22} color={COLORS.BLACK} />
                  <Text style={styles.modalBtnTxt}>
                    {translatedData.upload_file}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 12,
    color: COLORS.BLACK,
    marginBottom: 5,
    fontFamily: FONT_FAMILY.primarySemiBold,
    marginHorizontal: 3,
  },
  uploadBtn: {
    backgroundColor: COLORS.DARK_GREY,
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: COLORS.EXTRALIGHT_GREY,
    backgroundColor: COLORS.BG,
    color: COLORS.BLACK,
    height: 50,
  },
  select: {
    fontSize: 11,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
  selectContainer: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.GREY,
    paddingVertical: 5,
    borderRadius: 5,
  },
  fileName: {
    fontSize: 12,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primary,
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
  selectedImage: {
    height: 108,
    width: 120,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 20,
    marginHorizontal: 5,
  },
  modalView: {
    flex: 1,
    backgroundColor: COLORS.TRANSPARENT_BLACK,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalHeading: {
    fontSize: 15,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.WHITE,
    padding: 15,
  },
  modalBtnTxt: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.BLACK,
    marginTop: 2.5,
    flex: 1,
    paddingHorizontal: 10,
  },
  modalBtn: {
    padding: 15,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: COLORS.WHITE,
  },
});
