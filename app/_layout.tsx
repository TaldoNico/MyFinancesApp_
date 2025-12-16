// app/_layout.tsx
// @ts-nocheck
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import 'react-native-reanimated';

import SplashScreen from '@/components/splash-screen';
import { ReportsProvider } from '@/context/ReportsContext';
import { StatsProvider } from '@/context/StatsContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* 👇 AGORA O APP TODO TEM ACESSO A RELATÓRIOS E A CONQUISTAS */}
      <StatsProvider>
        <ReportsProvider>
          {showSplash ? (
            <SplashScreen onFinish={() => setShowSplash(false)} />
          ) : (
            <Stack screenOptions={{ headerShown: false }}>
              {/* Telas de Autenticação */}
              <Stack.Screen name="index" />
              <Stack.Screen name="register" />
              <Stack.Screen name="forgot_password" />

              {/* Telas do App */}
              <Stack.Screen name="profile" />

              {/* App Principal com Abas */}
              <Stack.Screen name="goals" />
              <Stack.Screen name="(tabs)" />

              {/* Modal */}
              <Stack.Screen
                name="modal"
                options={{ presentation: 'modal', title: 'Modal' }}
              />
            </Stack>
          )}
        </ReportsProvider>
      </StatsProvider>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
