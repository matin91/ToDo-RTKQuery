import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ScrollView, Text, View } from 'react-native';
import { NavigationProps } from '../types/RootStackParams';
import { useAppSelector } from '../Redux/hooks';
import { fetchTodos } from '../Redux/slices/todoSliceAsyncStorage';
import styles from './components/styles';
import { TodoItem } from './components';

export const Home = ({ navigation }: NavigationProps) => {
  const { todoList } = useAppSelector((state) => state.todoAsyncStorage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>To Do List</Text>
        <View style={styles.colourKeyContainer}>
          <View style={styles.colourKey} />
          <Text style={styles.urgent}>Urgent</Text>
        </View>
        {todoList?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}

        <View style={styles.button}>
          <Button
            title="New Task"
            color="black"
            onPress={() => navigation.navigate('form')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
