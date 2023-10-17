import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParamsList} from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import TaskItem from '../components/elements/TaskItem';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {setTodoList} from '../slices/toDoSlice';
import Loading from '../components/elements/loading';

interface MainScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'MainScreen'>;
}

interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
}

const MainScreen = ({navigation}: MainScreenProps) => {
  const dispatch = useDispatch();
  const [itemsToDisplay, setItemsToDisplay] = useState<TaskItem[]>([]);
  const [totalTodos, setTotalTodos] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeTodos, setActiveTodos] = useState(0);

  const [completedTodos, setCompletedTodos] = useState(0);
  const [sortBy, setSortBy] = useState('recent'); // Default sorting by most recent

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/todos',
        );

        if (response.status === 200) {
          const data = response.data;
          dispatch(setTodoList(data));
        } else {
          console.error('API request failed');
        }
      } catch (error) {
        console.error('Error while fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false in the finally block
      }
    };

    fetchTodoList();
  }, [dispatch]);

  const todoList = useSelector(state => state.todo.todoList);

  useEffect(() => {
    filterTasks(activeButton);
    countTodos();
  }, [activeButton, todoList]);

  const [activeButton, setActiveButton] = useState('ALL');

  const handleButtonPress = (buttonName: string) => {
    setActiveButton(buttonName);
    filterTasks(buttonName);
  };

  const filterTasks = (buttonName: string) => {
    let filteredList: TaskItem[] = [];
    switch (buttonName) {
      case 'ALL':
        filteredList = [...todoList];
        break;
      case 'ACTIVE':
        filteredList = todoList.filter(task => !task.completed);
        break;
      case 'DONE':
        filteredList = todoList.filter(task => task.completed);
        break;
      default:
        filteredList = [...todoList];
    }
    sortTasks(filteredList);
  };

  const sortTasks = (taskList: TaskItem[]) => {
    let sortedList = [...taskList];
    if (sortBy === 'recent') {
      sortedList.sort((a, b) => b.id - a.id); // Sort by most recent (descending order of ID)
    } else if (sortBy === 'id') {
      sortedList.sort((a, b) => a.id - b.id); // Sort by ID (ascending order of ID)
    }
    setItemsToDisplay(sortedList);
  };

  const countTodos = () => {
    setTotalTodos(todoList.length);
    setCompletedTodos(todoList.filter(task => task?.completed).length);
    setActiveTodos(todoList.filter(task => !task.completed).length);
  };

  const [currentPage, setCurrentPage] = useState(1);

  // Function to load more items when reaching the end of the list.
  const loadMoreItems = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  const onAddButton = () => {
    navigation.navigate('AddToDoScreen');
  };

  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.todoListTitle}>YOUR TODO LIST</Text>
      <View style={styles.headerTop}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              activeButton === 'ALL' && styles.activeButton,
            ]}
            onPress={() => handleButtonPress('ALL')}>
            <Text
              style={[
                styles.buttonText,
                activeButton === 'ALL' && styles.activeButtonText,
              ]}>
              ALL
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              activeButton === 'ACTIVE' && styles.activeButton,
            ]}
            onPress={() => handleButtonPress('ACTIVE')}>
            <Text
              style={[
                styles.buttonText,
                activeButton === 'ACTIVE' && styles.activeButtonText,
              ]}>
              ACTIVE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              activeButton === 'DONE' && styles.activeButton,
            ]}
            onPress={() => handleButtonPress('DONE')}>
            <Text
              style={[
                styles.buttonText,
                activeButton === 'DONE' && styles.activeButtonText,
              ]}>
              DONE
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sortButtonContainer}>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortBy === 'recent' && styles.activeSortButton,
            ]}
            onPress={() => setSortBy('recent')}>
            <Icon name="calendar" style={styles.sortIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortBy === 'id' && styles.activeSortButton,
            ]}
            onPress={() => setSortBy('id')}>
            <Icon name="funnel" style={styles.sortIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.headerCount}>
        <Text style={styles.totalCountText}>
          Total: {totalTodos} {', '}
          {activeButton === 'ALL' || activeButton === 'DONE' ? (
            <Text style={styles.completedCountText}>
              Completed: {completedTodos}
            </Text>
          ) : activeButton === 'ACTIVE' ? (
            <Text style={styles.activeCountText}>Active: {activeTodos}</Text>
          ) : null}
        </Text>
      </View>

      <View style={styles.taskContainer}>
        <View style={styles.taskList}>
          <FlatList
            data={itemsToDisplay}
            renderItem={({item}) => <TaskItem task={item} />}
            keyExtractor={item => item?.id.toString()}
            onEndReached={loadMoreItems}
            onEndReachedThreshold={0.1}
          />
        </View>
      </View>
      <View style={styles.iconContainer}>
        <Icon
          name="add-outline"
          style={styles.addButtonIcon}
          onPress={onAddButton}
        />
      </View>

      <Loading loading={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  todoListTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#FF6900',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#000000',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeButtonText: {
    // color: '#e50914',
  },
  sortButtonContainer: {
    flexDirection: 'row',
  },
  sortButton: {
    backgroundColor: 'lightgray',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  activeSortButton: {
    backgroundColor: '#000000',
  },
  sortIcon: {
    fontSize: 20,
    color: '#ffffff',
  },
  taskList: {
    marginTop: 20,
  },
  taskContainer: {
    flex: 1,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    backgroundColor: '#FFFFFF',
    width: 80,
    height: 80,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonIcon: {
    fontSize: 60,
    color: '#000000',
  },
  headerCount: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
    marginTop: 20,
  },
  totalCountText: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
  },
  completedCountText: {
    color: 'green',
    marginLeft: 10,
  },
  activeCountText: {
    color: 'red',
    marginLeft: 10,
  },
});

export default MainScreen;
