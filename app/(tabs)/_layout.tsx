import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/haptic-tab';
import { COLORS } from '@/utils/theme';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.gold,
        tabBarInactiveTintColor: COLORS.muted,

        tabBarButton: HapticTab,

        tabBarStyle: {
          backgroundColor: COLORS.primary,
          borderTopColor: 'rgba(212, 175, 55, 0.2)',
          borderTopWidth: 1,

          // Fixed height calculation
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,

          elevation: 2,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'My Products',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'grid' : 'grid-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="add-product"
        options={{
          title: 'Add Product',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'add-circle' : 'add-circle-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}