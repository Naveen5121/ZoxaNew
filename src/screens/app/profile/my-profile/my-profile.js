import {View, Text} from 'react-native';
import React from 'react';
import styles from './style';

export default function MyProfile(props) {
  const userProfile = props.route.parms;
  console.log('Subs ', userProfile);

  return (
    <View style={styles.conatiner}>
      <Text>my-profile</Text>
    </View>
  );
}
