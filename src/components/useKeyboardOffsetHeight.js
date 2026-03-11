import {View, Text, Keyboard} from 'react-native';
import React, {useState, useEffect} from 'react';

export default function useKeyboardOffsetHeight() {
  const [useKeyboardOffsetHeight, setKeyboardOffsetHeight] = useState(0);

  useEffect(() => {
    const keyboardWillAndroidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardOffsetHeight(e.endCoordinates.height);
      },
    );

    const keyboardWillAndroidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      e => {
        setKeyboardOffsetHeight(0);
      },
    );

    return () => {
      keyboardWillAndroidShowListener.remove();
      keyboardWillAndroidHideListener.remove();
    };
  }, []);

  return useKeyboardOffsetHeight;
}
