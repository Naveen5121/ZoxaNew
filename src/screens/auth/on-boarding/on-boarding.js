import React, {useRef} from 'react';
import {View, Text, Image, TouchableOpacity, StatusBar} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {IMAGES} from '../../../constants/images';
import styles from './style';
import {COLORS} from '../../../constants/colors';
import {ICONS} from '../../../constants/icons';

const slides = [
  {
    key: 1,
    heading: 'Discover Your Style',
    info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: ICONS.LOGO,
  },
  {
    key: 2,
    heading: 'Shop with Ease',
    info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: ICONS.LOGO,
  },
  {
    key: 3,
    heading: 'Secure Checkout',
    info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry..',
    image: ICONS.LOGO,
  },
];

export default function OnBoarding(props) {
  const slider = useRef();

  const _renderItem = ({item}) => {
    return (
      <View style={styles.innerContainer}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            style={{height: 300, width: 300, alignSelf: 'center'}}
            source={item.image}
          />
        </View>
        <Text style={styles.heading}>Wholesale Solutions</Text>
        <Text style={styles.subHeading}>{item.info}</Text>
        <View style={styles.dotContainer}>
          {slides.map((data, i) => {
            return (
              <View
                key={i}
                style={item.key === data.key ? styles.activeDot : styles.dot}
              />
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <AppIntroSlider
        renderItem={_renderItem}
        data={slides}
        showSkipButton={false}
        showNextButton={false}
        showDoneButton={false}
        activeDotStyle={{backgroundColor: COLORS.WHITE}}
        dotStyle={{backgroundColor: COLORS.WHITE}}
        ref={ref => (slider.current = ref)}
        renderPagination={() => null}
      />
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => props.navigation.navigate('OtpLogin')}>
          <Text style={styles.btnTxt}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
