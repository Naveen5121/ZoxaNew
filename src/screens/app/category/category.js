import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import styles from './style';
import ActivityLoader from '../../../components/activity-loader';

import API from '../../../actions/api';
import {useIsFocused} from '@react-navigation/native';

import ToastAlertMsg from '../../../components/toast-alert-msg';
import SubCategoryCard from '../../../components/sub-categoory-card';
import NoRecords from '../../../components/no-records';

export default function CategoryProduct(props) {
  const isVisible = useIsFocused();
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const [items, setItems] = useState([]);
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [catId, setCatId] = useState(null);

  async function fetchData() {
    const data = await API.getCategories();

    if (data.success === 'true') {
      setCategory(data.extraData.category);
      getSubCategoryListById(data.extraData.category[0].id);
    } else {
      ToastAlertMsg('No Data');
      setIsLoading(false);
    }
  }

  async function getSubCategoryListById(categoryId) {
    try {
      setCatId(categoryId);
      setIsProductLoading(true);
      const data = await API.getSubCategoriesByCatId(categoryId);

      console.log(data);

      if (data.success === 'true') {
        setItems(data.extraData.sub_category);
        setIsProductLoading(false);
        setIsLoading(false);
        setNoData(false);
      } else {
        setItems([]); // Clear previous subcategory
        setIsLoading(false);
        setIsProductLoading(false);
        setNoData(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [isVisible]);

  if (isLoading) {
    return <ActivityLoader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerRow}>
        <View style={styles.catContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {category.map((item, i) =>
              catId === item.id ? (
                <TouchableOpacity
                  style={styles.activeTab}
                  key={i}
                  onPress={() => getSubCategoryListById(item.id)}>
                  <Image
                    source={{uri: item.image}}
                    style={styles.activeImage}
                  />
                  <View style={styles.borderLine} />
                  <Text style={styles.activeTabTitle}>{item.name}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.tab}
                  key={i}
                  onPress={() => getSubCategoryListById(item.id)}>
                  <Image source={{uri: item.image}} style={styles.image} />
                  <Text style={styles.tabTitle}>{item.name}</Text>
                </TouchableOpacity>
              ),
            )}

            <View style={styles.tabSpace} />
          </ScrollView>
        </View>
        <View style={{flex: 1}}>
          {isProductLoading ? (
            <ActivityLoader />
          ) : (
            <FlatList
              data={items}
              numColumns={2}
              keyExtractor={(item, index) =>
                item?.id?.toString() || index.toString()
              }
              renderItem={({item}) => (
                <SubCategoryCard item={item} catId={catId} />
              )}
              ListEmptyComponent={() => (
                <NoRecords title="SubCategories are not Availble for this Category" />
              )}
              contentContainerStyle={
                items.length === 0
                  ? {flexGrow: 1, justifyContent: 'center'}
                  : {paddingTop: 10}
              }
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </View>
  );
}
