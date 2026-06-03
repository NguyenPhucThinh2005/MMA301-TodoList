import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Platform, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Sun, Moon, CalendarDays } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { loadTodos, saveTodos } from '../utils/storage';
import TodoItem from '../components/TodoItem';
import { AnimatePresence } from 'moti';

export default function CompletedScreen({ navigation }) {
  const [todos, setTodos] = useState([]);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();

  const fetchTodos = async () => {
    const storedTodos = await loadTodos();
    setTodos(storedTodos);
  };

  useFocusEffect(
    useCallback(() => {
      fetchTodos();
    }, [])
  );

  const handleToggle = async (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    await saveTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this completed task?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: async () => {
            const updatedTodos = todos.filter((todo) => todo.id !== id);
            setTodos(updatedTodos);
            await saveTodos(updatedTodos);
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleEdit = (todo) => {
    navigation.navigate('Edit', { todo });
  };

  const completedTodos = todos.filter(t => t.completed);

  return (
    <View className="flex-1 bg-[#E9E9F3] dark:bg-slate-900">
      <View 
        className="flex-row justify-between items-center px-6 pb-6 pt-4 bg-[#A3A3DF] dark:bg-indigo-900"
        style={{ paddingTop: Math.max(insets.top, 20) }}
      >
        <View>
          <Text className="text-2xl font-black text-white tracking-widest mt-2">
            TODO APP
          </Text>
        </View>
        <View className="mt-2 relative items-center justify-center">
          <CalendarDays size={32} color="#ffffff" strokeWidth={1.5} />
        </View>
      </View>

      <FlatList
        data={completedTodos}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24, paddingTop: 20 }}
        renderItem={({ item }) => (
          <AnimatePresence>
            <TodoItem
              key={item.id}
              todo={item}
              onToggle={handleToggle}
              onEdit={handleEdit}
              onDelete={handleDelete}
              colorScheme={colorScheme}
            />
          </AnimatePresence>
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-32">
            <View className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full items-center justify-center mb-6">
              <Text className="text-4xl">🏆</Text>
            </View>
            <Text className="text-slate-500 dark:text-slate-400 text-lg text-center font-medium">
              No completed tasks yet.{'\n'}Keep up the good work!
            </Text>
          </View>
        }
      />
    </View>
  );
}
