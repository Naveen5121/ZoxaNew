import {
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect, useCallback, useContext} from 'react';
import styles from './style';
import {COLORS} from '../../../constants/colors';
import Feather from 'react-native-vector-icons/Feather';

import Ionicons from 'react-native-vector-icons/Ionicons';
import API from '../../../actions/api';
import {useNavigation} from '@react-navigation/native';

export default function Search(props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getSuggestions = useCallback(async q => {
    setSearchValue(q);
    setSuggestionsList([]);
    if (typeof q !== 'string' || q.length < 1) {
      return;
    }
    setLoading(true);

    const response = await API.getFilterData(q);

    if (response.success === 'true') {
      setSuggestionsList(response.extraData.product);
      setLoading(false);
      setNotFound(false);
    } else {
      setSuggestionsList([]);
      //  AlertMsg('No Records Found');
      setLoading(false);
      setNotFound(true);
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent={true}
      />
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Ionicons
              name={'chevron-back-outline'}
              size={22}
              color={COLORS.BLACK}
              style={styles.back}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              borderWidth: 1,
              borderRadius: 8,
              borderColor: COLORS.EXTRALIGHT_GREY,
              elevation: 2.5,
              backgroundColor: COLORS.WHITE,
            }}>
            <TextInput
              placeholder="Search Items..."
              style={styles.searchBox}
              defaultValue={searchValue}
              onChangeText={getSuggestions}
              autoFocus={true}
              placeholderTextColor={COLORS.GREY}
            />
            <Ionicons
              name={'search-outline'}
              size={20}
              color={COLORS.GREY}
              style={styles.search}
            />

            {searchValue.toString().trim().length > 0 &&
              (loading ? (
                <View style={styles.cancel}>
                  <ActivityIndicator color={COLORS.BLACK} size={20} />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.cancel}
                  onPress={() => [setSearchValue(''), setSuggestionsList([])]}>
                  <Feather name="x" size={19} color={COLORS.BLACK} />
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </View>

      <ScrollView>
        <View style={styles.flexWrapRow}>
          {suggestionsList.map((item, i) => (
            <View key={i}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('ProductDetails', item)}>
                <Image source={{uri: item.image[0]}} style={styles.imageicon} />
                <Text style={styles.producttitle} numberOfLines={1}>
                  {item.itemname}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {notFound && (
          <View style={{padding: 25}}>
            <Text style={styles.opps}>Oops!</Text>
            <Text style={styles.heading}>
              We could not understand what you mean, try rephrasing the query.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
