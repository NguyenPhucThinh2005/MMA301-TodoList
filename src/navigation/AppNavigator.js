import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { List, Check } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../screens/HomeScreen';
import CompletedScreen from '../screens/CompletedScreen';
import AddScreen from '../screens/AddScreen';
import EditScreen from '../screens/EditScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { colorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === 'dark';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#1E293B' : '#FFFFFF', // slate-800 or white
          borderTopWidth: 1,
          borderTopColor: isDark ? '#334155' : '#E2E8F0', // slate-700 or slate-200
          paddingBottom: Math.max(insets.bottom, 10),
          paddingTop: 10,
          height: 60 + Math.max(insets.bottom, 10),
        },
        tabBarActiveTintColor: isDark ? '#818CF8' : '#6366F1', // indigo-400 or indigo-500
        tabBarInactiveTintColor: isDark ? '#64748B' : '#94A3B8', // slate-500 or slate-400
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen 
        name="All" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <List size={size} color={color} />
        }}
      />
      <Tab.Screen 
        name="Completed" 
        component={CompletedScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Check size={size} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Add" component={AddScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
    </Stack.Navigator>
  );
}
