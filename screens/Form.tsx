import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { add } from '../Redux/todo/todoSliceAsyncStorage';
import { NavigationProps } from '../types/RootStackParams';
import styles from './styles';

export const Form = ({ navigation }: NavigationProps) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [urgent, setUrgent] = useState(false);
  const dispatch = useAppDispatch();
  const { todoList } = useAppSelector((state) => state.todoAsyncStorage);

  const addTask = async () => {
    // Create todo obj
    const id = todoList?.length ? todoList[todoList.length - 1].id + 1 : 1;
    const todoItem = { id, title, body, urgent };
    // Update state
    dispatch(add(todoItem));
    // Check if todos in storage
    const previous = await AsyncStorage.getItem('todoList');
    const updated = previous
      ? JSON.stringify([...JSON.parse(previous), todoItem])
      : JSON.stringify([todoItem]);
    // Update storage
    await AsyncStorage.setItem('todoList', updated);
    navigation.navigate('home');
  };

  return (
    <ScrollView>
      <View style={styles.back}>
        <Button
          title="< Back"
          color="black"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.add}>Add a task</Text>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.title} value={title} onChangeText={setTitle} />
        <Text style={styles.label}>Body</Text>
        <TextInput
          style={styles.body}
          value={body}
          onChangeText={setBody}
          multiline
        />
        <View style={styles.checkboxContainer}>
          <BouncyCheckbox
            style={styles.checkbox}
            isChecked={urgent}
            iconStyle={{ borderRadius: 0, borderColor: 'black' }}
            onPress={() => setUrgent(!urgent)}
          />
          <Text style={styles.urgentText}>Urgent</Text>
        </View>
        <View style={styles.submit}>
          <Button title="Submit" color="black" onPress={() => addTask()} />
        </View>
      </View>
    </ScrollView>
  );
};
