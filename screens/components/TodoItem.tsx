import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Text, View } from 'react-native';
import { useAppDispatch } from '../../Redux/hooks';
import { remove } from '../../Redux/todo/todoSliceAsyncStorage';
import { TodoObject } from '../../types/TodoObject';
import styles from './styles';

type TodoItemProps = {
  todo: TodoObject;
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  const dispatch = useAppDispatch();
  const handleDelete = async () => {
    dispatch(remove(todo));
    const stored = await AsyncStorage.getItem('todoList');
    if (stored) {
      const updated = JSON.parse(stored).filter(
        (n: TodoObject) => n.id! !== todo.id
      );
      await AsyncStorage.setItem('todoList', JSON.stringify(updated));
    }
  };

  const todoNumberStyle = todo.urgent
    ? { ...styles.todoNumberContainer, ...styles.red }
    : { ...styles.todoNumberContainer };

  return (
    <View style={styles.todoItem}>
      <View style={todoNumberStyle}>
        <Text style={styles.todoNumber}>Task {todo.id}</Text>
      </View>
      <View>
        <Text style={styles.title}>{todo.title}</Text>
        <Text>{todo.body}</Text>
      </View>
      <View style={styles.close}>
        <FontAwesome.Button
          name="close"
          color="black"
          backgroundColor="transparent"
          onPress={handleDelete}
        />
      </View>
    </View>
  );
};
