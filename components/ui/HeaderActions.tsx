import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { Pressable, View } from 'react-native';

type Props = {
  onPressSearch?: () => void;
  onPressFavorites?: () => void;
};

export function HeaderActions({ onPressSearch, onPressFavorites }: Props) {
  const theme = useColorScheme() ?? 'light';
  const color = Colors[theme].headerText;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <Pressable onPress={onPressSearch} hitSlop={10} accessibilityRole="button" accessibilityLabel="Search">
        <IconSymbol size={22} name="magnifyingglass" color={color} />
      </Pressable>
      <Pressable onPress={onPressFavorites} hitSlop={10} accessibilityRole="button" accessibilityLabel="Favorites">
        <IconSymbol size={22} name="heart.fill" color={color} />
      </Pressable>
    </View>
  );
}


