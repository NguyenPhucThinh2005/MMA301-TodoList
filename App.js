import './global.css';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { useColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const theme = await AsyncStorage.getItem('theme');
        if (theme) {
          setColorScheme(theme);
        } else {
          setColorScheme('light');
        }
      } catch (e) {
        console.error('Failed to load theme', e);
      } finally {
        setIsReady(true);
      }
    };
    loadTheme();
  }, []);

  if (!isReady) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
