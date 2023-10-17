import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {deleteTodo, updateTodo} from '../../slices/toDoSlice';
import {useDispatch} from 'react-redux';
import {showToast} from './toast/Toast';

interface TaskItemProps {
  task: TaskItem;
}

const TaskItem: React.FC<TaskItemProps> = ({task}) => {
  const completed = task?.completed;

  const dispatch = useDispatch();

  const toggleTaskStatus = () => {
    const updatedTask = {
      ...task,
      completed: !completed,
      time: new Date().toLocaleString(),
    };

    dispatch(updateTodo(updatedTask));
    showToast('Updated Task Successfully');
  };

  const handleDelete = () => {
    dispatch(deleteTodo(task?.id));
    showToast('Todo Deleted Successfully');
  };

  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={toggleTaskStatus}>
        {completed ? (
          <>
            <View style={styles.checkboxContainer}>
              <View style={styles.checkbox}>
                <Icon name="checkmark-outline" size={24} color="white" />
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.checkboxContainer}>
              <View style={styles.checkbox} />
            </View>
          </>
        )}
      </TouchableOpacity>
      <Text style={styles.taskName}>{task?.title}</Text>
      <TouchableOpacity onPress={handleDelete}>
        <View style={styles.deleteIconContainer}>
          <Icon name="trash-outline" size={24} color="red" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

TaskItem.defaultProps = {
  task: {
    id: '',
    title: '',
    completed: false,
  },
};

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: '#D9E3F0',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 15,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  checkboxContainer: {
    width: 30,
    height: 30,
    backgroundColor: 'gray',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskName: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    color: '#000000',
  },
  deleteIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TaskItem;
