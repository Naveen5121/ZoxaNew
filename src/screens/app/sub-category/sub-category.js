import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './style';
import {useIsFocused} from '@react-navigation/native';
import API from '../../../actions/api';
import ToastAlertMsg from '../../../components/toast-alert-msg';
import ActivityLoader from '../../../components/activity-loader';
import ImageLoader from '../../../components/image-loader';
import NoData from '../../../components/no-data';

export default function SubCategory(props) {
  const {catId, catName} = props.route.params;
  console.log(catId, catName);

  const isVisible = useIsFocused();

  const [isLoading, setIsLoading] = useState(true);
  const [subcategory, setSubCategory] = useState([]);
  const [noData, setNoData] = useState(false);

  async function fetchData() {
    try {
      const cat = await API.getSubCategoriesByCatId(catId);

      if (cat.success === 'true') {
        setSubCategory(cat.extraData.sub_category);
        setIsLoading(false);
        setNoData(false);
      } else {
        // setSubCategory([]);
        setIsLoading(false);
        setNoData(true);
      }
    } catch (error) {
      alert(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [isVisible]);

  if (noData) {
    return <NoData title={'No SubCategory Found !'} />;
  }

  return (
    <View style={styles.container}>
      {isLoading && <ActivityLoader isLoading={isLoading} />}
      <ScrollView>
        <View style={styles.catContainer}>
          {subcategory.map((data, i) => (
            <TouchableOpacity
              style={styles.card}
              key={i}
              onPress={() =>
                props.navigation.navigate('ProductsList', {
                  catId: catId,
                  subcatId: data.id,
                  subcatName: data.name,
                })
              }>
              <ImageLoader image={data.image} style={styles.img} />
              <View style={{padding: 7.5}}>
                <Text style={styles.itemName}>{data.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
