import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import ImageCarousel from '../../../components/image-carousel';
import {useIsFocused} from '@react-navigation/native';
import {AuthContext} from '../../../../auth-context';
import API from '../../../actions/api';
import styles from './style';
import ActivityLoader from '../../../components/activity-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastAlertMsg from '../../../components/toast-alert-msg';
import SearchInput from '../../../components/search-input';

export default function Home(props) {
  const isVisible = useIsFocused();

  const {updateUserProfile, signOut} =
    React.useContext(AuthContext).authContext;
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [banner, setBanner] = useState([]);

  async function fetchData() {
    try {
      const cat = await API.getCategories();

      const profile = await API.getCompanyProfile();
      const banner = await API.getBannerImages();

      if (profile.success === 'true') {
        updateUserProfile({userProfile: profile.extraData.profile});
      } else {
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('userType');
        signOut({});
      }

      if (banner.success === 'true') {
        setBanner(banner.extraData.banner);
      }

      if (cat.success === 'true') {
        setCategory(cat.extraData.category);
        setIsLoading(false);
      } else {
        ToastAlertMsg('Something Went Wrong');
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [isVisible]);

  return (
    <ScrollView
      style={styles.container}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}>
      {isLoading && <ActivityLoader isLoading={isLoading} />}
      <SearchInput title="Seacrh Product here" />
      <ImageCarousel banner={banner} />

      <View style={styles.infoContainer}>
        <View style={styles.flexRow}>
          <Text style={styles.heading}>Categories</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('More_')}>
            <Text style={styles.seeall}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.catContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {category.map((data, i) => (
            <TouchableOpacity
              style={styles.box}
              key={i}
              onPress={() =>
                props.navigation.navigate('SubCategory', {
                  catId: data.id,
                  catName: data.name,
                })
              }>
              <Image style={{height: 70}} source={{uri: data.image}} />
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{data.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <View style={{paddingHorizontal: 8}} />
        </ScrollView>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.flexRow}>
          <Text style={styles.heading}>Shop By Brands</Text>
          <TouchableOpacity
          //  onPress={() => props.navigation.navigate('CategoriesList', {})}
          >
            <Text style={styles.seeall}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.catContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {category.map((data, i) => (
            <TouchableOpacity
              style={styles.box}
              key={i}
              onPress={() =>
                props.navigation.navigate('SubCategory', {
                  catId: data.id,
                  catName: data.name,
                })
              }>
              <Image style={{height: 70}} source={{uri: data.image}} />
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{data.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <View style={{paddingHorizontal: 8}} />
        </ScrollView>
      </View>
    </ScrollView>
  );
}
