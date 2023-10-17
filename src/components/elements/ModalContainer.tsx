import React, {useRef, useEffect, useState} from 'react';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addTodo} from '../../slices/toDoSlice';
import {showToast} from './toast/Toast';

interface ModalContainerProps {
  type: string;
  navigation: any;
}

const ModalContainer = ({type, navigation}: ModalContainerProps) => {
  const dispatch = useDispatch();

  const inputRef = useRef();
  const [title, setTitle] = useState('');

  useEffect(() => {
    inputRef?.current.focus();
  }, []);

  const handleSubmit = () => {
    if (title === '') {
      showToast('Please add something');
      return;
    }
    if (title) {
      if (type === 'add') {
        const id = uuidv4();
        const completed = false;
        const newTask = {
          id,
          completed,
          title,
          time: new Date().toLocaleString(),
        };
        dispatch(addTodo(newTask));
        showToast('Task added successfully');
        navigation.goBack();
      }
    }
    clearText();
  };

  const clearText = () => {
    setTitle('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter task..."
            placeholderTextColor={'gray'}
            label="Task Title"
            ref={inputRef}
            value={title}
            onChangeText={text => setTitle(text)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>ADD TASK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clearButton} onPress={clearText}>
              <Text style={styles.clearButtonText}>CLEAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: height,
  },
  modalContent: {
    width: 350,
    height: 170,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#000000',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  clearButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ModalContainer;
