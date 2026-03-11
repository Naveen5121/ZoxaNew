import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Pdf from 'react-native-pdf';
import ActivityLoader from '../../../../components/activity-loader';
import styles from './style';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from '../../../../constants/colors';
import {sharePDF} from '../../../../components/share-print-bill';

export default function ViewBillPdf(props) {
  const [isLoading, setIsLoading] = useState(true);
  const filePath = props.route.params;

  React.useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => sharePDF(filePath)}
          style={{marginRight: 15}}>
          <Feather name="share-2" size={20} color={COLORS.WHITE} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && <ActivityLoader isLoading={isLoading} />}
      <Pdf
        trustAllCerts={false}
        source={{
          uri: filePath,
          cache: true,
        }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
          setIsLoading(false);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
          // setIsLoading(false);
        }}
        onError={error => {
          console.log(error);
          props.navigation.goBack();
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
}
