import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { loadTodos, saveTodos } from '../utils/storage';

export default function AddScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const { colorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();
  
  const isDark = colorScheme === 'dark';
  const textColor = isDark ? '#F8FAFC' : '#1E293B';
  const placeholderColor = isDark ? '#64748B' : '#94A3B8';

  const handleAdd = async () => {
    if (title.trim().length === 0) return;
    
    const todos = await loadTodos();
    const newTodo = {
      id: Date.now().toString(),
      title: title.trim(),
      detail: detail.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    await saveTodos([...todos, newTodo]);
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-slate-50 dark:bg-slate-900" style={{ paddingTop: Math.max(insets.top, 20) }}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 px-6"
        >
          <View className="flex-row items-center mb-8 pt-4">
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              className="mr-4 p-2.5 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <ArrowLeft size={24} color={textColor} />
            </TouchableOpacity>
            <Text className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">New Task</Text>
          </View>

          <View className="flex-1">
            <Text className="text-slate-500 dark:text-slate-400 font-semibold mb-3 ml-1 uppercase tracking-wider text-xs">
              What do you need to do?
            </Text>
            <TextInput
              className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xl font-medium p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm mb-6"
              style={Platform.OS === 'ios' ? { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 } : { elevation: 1 }}
              placeholder="e.g. Finish the assignment"
              placeholderTextColor={placeholderColor}
              value={title}
              onChangeText={setTitle}
              autoFocus
              onSubmitEditing={() => {}}
            />

            <Text className="text-slate-500 dark:text-slate-400 font-semibold mb-3 ml-1 uppercase tracking-wider text-xs">
              Details (Optional)
            </Text>
            <TextInput
              className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-base p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm min-h-[100px]"
              style={Platform.OS === 'ios' ? { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 } : { elevation: 1 }}
              placeholder="Add some details..."
              placeholderTextColor={placeholderColor}
              value={detail}
              onChangeText={setDetail}
              multiline
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            onPress={handleAdd}
            disabled={title.trim().length === 0}
            className={`py-4 rounded-2xl items-center justify-center shadow-lg active:scale-[0.98] transition-transform ${
              title.trim().length > 0 ? 'bg-indigo-500 dark:bg-indigo-600' : 'bg-indigo-200 dark:bg-indigo-900'
            }`}
            style={{ 
              marginBottom: Math.max(insets.bottom, 20),
              shadowColor: title.trim().length > 0 ? '#4F46E5' : 'transparent',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
            }}
          >
            <Text className={`font-bold text-2xl ${title.trim().length > 0 ? 'text-white' : 'text-indigo-400 dark:text-indigo-500'}`}>
              Add
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
