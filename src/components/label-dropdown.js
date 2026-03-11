import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
  TextInput,
  FlatList,
} from 'react-native';
import {COLORS} from '../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import {FONT_FAMILY} from '../constants/font-family';
var {width} = Dimensions.get('window');

export default function LabelDropdown(props) {
  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(items || []);
  const {items} = props;

  const handleSearch = text => {
    setQuery(text);
    const filteredData = items?.filter(item =>
      item.label.toLowerCase().startsWith(text.toLowerCase()),
    );
    setResults(filteredData);
  };

  let defaultValue = items?.find(obj => {
    return obj.value === props.defaultValue;
  });

  let disabled = items?.length <= 0;

  const Item = ({data}) => (
    <TouchableOpacity
      onPress={() => [props.onChangeItem(data), setModal(!modal), setQuery('')]}
      style={
        data.value === defaultValue?.value
          ? styles.modalSelectedListContainer
          : styles.modalListContainer
      }>
      <Text style={styles.modalList}>{data.label}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    setResults(props.items);
  }, [props]);

  return (
    <>
      <View style={styles.container}>
        {props.label ? <Text style={styles.title}>{props.label}</Text> : null}
        <Pressable
          disabled={disabled}
          style={styles.input}
          onPress={() => setModal(!modal)}>
          {defaultValue ? (
            <Text style={styles.selectedValue}>{defaultValue.label}</Text>
          ) : (
            <Text style={styles.value}>Select {props.title}</Text>
          )}

          <Feather size={18} color={COLORS.GREY} name={'chevron-down'} />
        </Pressable>
      </View>
      <Modal
        transparent
        animationType="fade"
        statusBarTranslucent={true}
        onRequestClose={() => setModal(!modal)}
        visible={modal}>
        <TouchableOpacity
          onPress={() => setModal(!modal)}
          activeOpacity={1}
          style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalInnerContainer}>
              {props.search ? (
                <TextInput
                  style={styles.searchInput}
                  placeholderTextColor={COLORS.EXTRALIGHT_GREY}
                  placeholder="Search.."
                  value={query}
                  onChangeText={handleSearch}
                />
              ) : (
                <Text style={styles.modalHeading}>
                  Select {props.placeholder}
                </Text>
              )}

              {results?.length <= 0 && (
                <Text style={styles.notFound}>Not Results Found...</Text>
              )}
              <FlatList
                data={results}
                renderItem={({item}) => <Item data={item} />}
                keyExtractor={(_, i) => i}
              />
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: 10,
  },

  input: {
    paddingHorizontal: 14,

    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.EXTRALIGHT_GREY,
    height: 46,
    color: COLORS.BLACK,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BG,
  },
  title: {
    fontSize: 12,
    color: COLORS.BLACK,
    marginBottom: 5,
    fontFamily: FONT_FAMILY.primaryMedium,
    marginHorizontal: 3,
    // marginHorizontal: 3,
  },

  notFound: {
    fontFamily: FONT_FAMILY.primaryMedium,
    padding: 15,
    textAlign: 'center',
    color: COLORS.BLACK,
    fontSize: 12,
    fontFamily: FONT_FAMILY.primaryMedium,
  },

  value: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: 12,
    color: COLORS.GREY,
    flex: 1,
  },

  selectedValue: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: 12,
    color: COLORS.BLACK,
    flex: 1,
  },

  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: COLORS.TRANSPARENT_BLACK,
  },
  modalInnerContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    width: width - 60,
    justifyContent: 'center',
    overflow: 'hidden',
    maxHeight: width - 30,
  },

  modalHeading: {
    fontFamily: FONT_FAMILY.primarySemiBold,
    color: COLORS.WHITE,
    fontSize: 14,
    backgroundColor: COLORS.PRIMARY,
    padding: 15,
    paddingTop: 17.5,
  },

  searchInput: {
    fontFamily: FONT_FAMILY.primarySemiBold,
    color: COLORS.WHITE,
    fontSize: 14,
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 15,
    height: 50,
    paddingTop: 15,
  },

  modalListContainer: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: COLORS.EXTRALIGHT_GREY,
  },
  modalSelectedListContainer: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: COLORS.EXTRALIGHT_GREY,
    backgroundColor: COLORS.BG,
  },

  modalList: {
    textTransform: 'capitalize',
    color: COLORS.BLACK,
    fontSize: 12,
    fontFamily: FONT_FAMILY.primary,
  },
});
