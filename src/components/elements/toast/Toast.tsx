import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Toast, {ErrorToast} from 'react-native-toast-message';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Toast_() {
  const [filterMsg, setFilterMsg] = useState('');
  const [message, setMessage] = useState('');

  const changeMsg = () => {
    let replacement = message.split('$#');
    let msg = replacement.shift();

    let message_ = msg;
    replacement.forEach(element => {
      message_ = message_.replace('$#', element);
    });
    setFilterMsg(message_);
  };

  useEffect(() => {
    if (message) {
      changeMsg();
    }
  }, [message]);

  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: ({text1, props}) => {
      useEffect(() => {
        setMessage(text1);
      }, [text1]);

      return (
        <View style={styles.container}>
          <Icon name="checkmark-circle" size={20} color={'green'} />
          <Text style={styles.text}>{text1}</Text>
        </View>
      );
    },

    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: props => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
  };

  return <Toast config={toastConfig} />;
}

export const showToast = msg => {
  Toast.show({
    type: 'success',
    text1: msg,
  });
};
