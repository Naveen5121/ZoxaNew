import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
const {height, width} = Dimensions.get('window');

export default function LabelDropdownItems({
  title,
  items,
  defaultValue,
  onChangeItem,
}) {
  const [visible, setVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [modal, setModal] = useState(false);
  const handleSelect = item => {
    setSelectedItems(prevSelected => {
      if (prevSelected.some(selected => selected.value === item.value)) {
        return prevSelected.filter(selected => selected.value !== item.value);
      } else {
        return [...prevSelected, item];
      }
    });
    onChangeItem(item);
  };

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <TouchableOpacity
        style={styles.dropdown}
        // onPress={() => setVisible(!visible)}
        onPress={() => setModal(!modal)}>
        {selectedItems.length > 0 ? (
          <View style={styles.selectedItemContainer}>
            {selectedItems.map(item => (
              <View key={item.value} style={styles.selectedItem}>
                <Text style={styles.selectedText} numberOfLines={1}>
                  {item.label},
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.placeholder}>Select</Text>
        )}
        <Feather
          name={visible ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={COLORS.GREY}
        />
      </TouchableOpacity>
      {visible && (
        <View style={styles.dropdownList}>
          <FlatList
            data={items}
            keyExtractor={item => item.value.toString()}
            numColumns={4}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.item,
                  selectedItems.some(selected => selected.value === item.value)
                    ? styles.selectedItemStyle
                    : null,
                ]}
                onPress={() => handleSelect(item)}>
                <View style={styles.itemcard}>
                  {item.image && (
                    <Image source={{uri: item.image}} style={styles.icon} />
                  )}
                  <Text style={styles.itemText}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

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
          <View style={styles.modalInnerContainer}>
            <View style={styles.dropdownList}>
              <FlatList
                data={items}
                keyExtractor={item => item.value.toString()}
                numColumns={4}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[
                      styles.item,
                      selectedItems.some(
                        selected => selected.value === item.value,
                      )
                        ? styles.selectedItemStyle
                        : null,
                    ]}
                    onPress={() => handleSelect(item)}>
                    <View style={styles.itemcard}>
                      {item.image && (
                        <Image source={{uri: item.image}} style={styles.icon} />
                      )}
                      <Text style={styles.itemText}>{item.label}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 12,
    color: COLORS.SKY_BLUE,
    marginBottom: 5,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.EXTRALIGHT_GREY,
    height: 46,
    backgroundColor: COLORS.BG,
  },
  selectedItemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
    marginBottom: 5,
    borderRadius: 100,
  },
  selectedText: {
    fontSize: 12,
    color: COLORS.BLACK,
  },
  placeholder: {
    fontSize: 12,
    color: COLORS.GREY,
    flex: 1,
  },
  dropdownList: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    marginTop: 5,
    elevation: 3,
    padding: 5,
  },
  item: {
    flexDirection: 'row',

    justifyContent: 'center',
  },
  itemcard: {
    width: width / 4 - 18,
    //height: width / 3,
    backgroundColor: COLORS.WHITE,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2.5,
    margin: 5,
    // borderRadius: 5,
    // elevation: 5,
    overflow: 'hidden',
  },
  selectedItemStyle: {
    backgroundColor: COLORS.EXTRALIGHT_GREY,
  },
  itemText: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.primary,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: COLORS.BROWN,
  },
  modalInnerContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    width: width - 18,
    justifyContent: 'center',
    overflow: 'hidden',
    maxHeight: width - 30,
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: COLORS.TRANSPARENT_BLACK,
  },
});
