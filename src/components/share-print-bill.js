import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {PermissionsAndroid, Platform} from 'react-native';
import {InvoiceHtmlData} from './invoice-html-data';

export const isPermitted = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message: 'App needs access to Storage data',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.log(err);
      return false;
    }
  } else {
    return true;
  }
};

export const sharePDF = async filePath => {
  const options = {
    title: 'PDF Example',
    url: filePath,
    type: 'application/pdf',
  };
  Share.open(options)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      err && console.log(err);
    });
};

export const createPDF = async (fileDetails, userProfile) => {
  try {
    let options = {
      html: InvoiceHtmlData(fileDetails, userProfile),
      fileName: fileDetails._id,
      directory: 'Downloads',
    };

    const fileInfo = await RNHTMLtoPDF.convert(options);
    console.log('PDF generated at:', fileInfo.filePath);

    const path = `file://${fileInfo.filePath}`;

    if (fileInfo) {
      return {
        success: true,
        message: 'File Created Successfully',
        data: fileInfo,
        filePath: path,
      };
    } else {
      return {
        success: false,
        message: 'Request failed',
        data: null,
        filePath: null,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
      data: null,
      filePath: null,
    };
  }
};
