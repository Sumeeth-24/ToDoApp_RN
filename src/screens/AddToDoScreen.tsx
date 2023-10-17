import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {RootStackParamsList} from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ModalContainer from '../components/elements/ModalContainer';
import Icon from 'react-native-vector-icons/Ionicons';

interface AddToDoScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'AddToDoScreen'>;
}

const AddToDoScreen = ({navigation}: AddToDoScreenProps) => {
  return (
    <View>
      <ModalContainer type="add" navigation={navigation} />
    </View>
  );
};

export default AddToDoScreen;
