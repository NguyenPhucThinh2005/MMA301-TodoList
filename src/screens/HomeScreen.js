import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Plus, Sun, Moon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { loadTodos, saveTodos } from '../utils/storage';
import TodoItem from '../components/TodoItem';
import { AnimatePresence } from 'moti';

export default function HomeScreen({ navigation }) {
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

  const handleDelete = async (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    await saveTodos(updatedTodos);
  };

  const handleEdit = (todo) => {
    navigation.navigate('Edit', { todo });
  };

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <View className="flex-1 bg-slate-50 dark:bg-slate-900" style={{ paddingTop: Math.max(insets.top, 20) }}>
      <View className="flex-row justify-between items-center mb-6 px-6 pt-4">
        <View>
          <Text className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
            My Tasks
          </Text>
          <Text className="text-slate-500 dark:text-slate-400 font-medium mt-1">
            {todos.length} total, {completedCount} completed
          </Text>
        </View>
        <TouchableOpacity 
          onPress={toggleColorScheme}
          className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 active:scale-95"
          style={Platform.OS === 'ios' ? { shadowOpacity: 0.1, shadowRadius: 8 } : { elevation: 2 }}
        >
          {colorScheme === 'dark' ? (
            <Sun size={24} color="#FBBF24" />
          ) : (
            <Moon size={24} color="#6366F1" />
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 100 }}
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
            <View className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-full items-center justify-center mb-6">
              <Text className="text-4xl">📝</Text>
            </View>
            <Text className="text-slate-500 dark:text-slate-400 text-lg text-center font-medium">
              No tasks yet.{'\n'}Add one to get started!
            </Text>
          </View>
        }
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Add')}
        className="absolute right-6 w-16 h-16 bg-indigo-500 dark:bg-indigo-600 rounded-full items-center justify-center active:bg-indigo-600 dark:active:bg-indigo-700"
        style={{ 
          bottom: Math.max(insets.bottom + 24, 24),
          elevation: 8,
          shadowColor: '#4F46E5',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        }}
      >
        <Plus size={32} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
}
