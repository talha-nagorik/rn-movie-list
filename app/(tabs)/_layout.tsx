import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].navActive,
        headerStyle: { backgroundColor: Colors[colorScheme ?? 'light'].headerBackground },
        headerTintColor: Colors[colorScheme ?? 'light'].headerText,
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].surface,
          borderTopColor: Colors[colorScheme ?? 'light'].border,
        },
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].navInactive,
        tabBarButton: HapticTab,
        sceneStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trending',
          tabBarIcon: ({ color, focused }) => (
            <IconWithIndicator
              focused={focused}
              color={color}
              iconName="flame.fill"
              theme={colorScheme ?? 'light'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="popular"
        options={{
          title: 'Popular',
          tabBarIcon: ({ color, focused }) => (
            <IconWithIndicator
              focused={focused}
              color={color}
              iconName="star.fill"
              theme={colorScheme ?? 'light'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="now-playing"
        options={{
          title: 'Now Playing',
          tabBarIcon: ({ color, focused }) => (
            <IconWithIndicator
              focused={focused}
              color={color}
              iconName="play.circle.fill"
              theme={colorScheme ?? 'light'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <IconWithIndicator
              focused={focused}
              color={color}
              iconName="magnifyingglass"
              theme={colorScheme ?? 'light'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, focused }) => (
            <IconWithIndicator
              focused={focused}
              color={color}
              iconName="heart.fill"
              theme={colorScheme ?? 'light'}
            />
          ),
        }}
      />
    </Tabs>
  );
}

function IconWithIndicator({ focused, color, iconName, theme }: { focused: boolean; color: string; iconName: React.ComponentProps<typeof IconSymbol>['name']; theme: 'light' | 'dark' }) {
  const indicatorColor = Colors[theme].navActive;
  const size = focused ? 28 : 26;
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 6 }}>
      <IconSymbol size={size} name={iconName} color={color} />
      {focused ? (
        <View
          style={{
            marginTop: 6,
            width: 22,
            height: 6,
            borderRadius: 6,
            backgroundColor: indicatorColor,
          }}
        />
      ) : null}
    </View>
  );
}
