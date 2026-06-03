import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Check, Edit2, Trash2 } from 'lucide-react-native';
import { MotiView } from 'moti';

export default function TodoItem({ todo, onToggle, onEdit, onDelete, colorScheme }) {
  const isDark = colorScheme === 'dark';
  const primaryColor = isDark ? '#818CF8' : '#6366F1'; // Indigo 400 / 500
  const redColor = isDark ? '#F87171' : '#EF4444'; // Red 400 / 500

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.95, translateY: 10 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      exit={{ opacity: 0, scale: 0.9, translateX: -20 }}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      className="flex-row items-center bg-white dark:bg-slate-800 p-4 rounded-2xl mb-4 border border-slate-100 dark:border-slate-700/50"
      style={Platform.OS === 'ios' ? { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 } : { elevation: 1 }}
    >
      <TouchableOpacity 
        onPress={() => onToggle(todo.id)}
        activeOpacity={0.7}
        className="flex-1 flex-row items-center"
      >
        <View
          className={`w-7 h-7 rounded-full border-[2.5px] flex items-center justify-center mr-4 ${
            todo.completed 
              ? 'bg-indigo-500 border-indigo-500 dark:bg-indigo-500 dark:border-indigo-500' 
              : 'border-slate-300 dark:border-slate-600'
          }`}
        >
          {todo.completed && <Check size={16} color="#ffffff" strokeWidth={3} />}
        </View>
        
        <View className="flex-1 pr-2">
          <Text
            className={`text-lg font-semibold ${
              todo.completed ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-800 dark:text-slate-100'
            }`}
            numberOfLines={1}
          >
            {todo.title}
          </Text>
          {todo.detail ? (
            <Text 
              className={`text-sm mt-0.5 ${
                todo.completed ? 'text-slate-400/70 dark:text-slate-500/70 line-through' : 'text-slate-500 dark:text-slate-400'
              }`}
              numberOfLines={2}
            >
              {todo.detail}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>

      <View className="flex-row gap-3 ml-3">
        <TouchableOpacity 
          onPress={() => onEdit(todo)} 
          className="p-2.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 active:bg-indigo-100 dark:active:bg-indigo-500/20"
        >
          <Edit2 size={18} color={primaryColor} />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => onDelete(todo.id)} 
          className="p-2.5 rounded-full bg-red-50 dark:bg-red-500/10 active:bg-red-100 dark:active:bg-red-500/20"
        >
          <Trash2 size={18} color={redColor} />
        </TouchableOpacity>
      </View>
    </MotiView>
  );
}
