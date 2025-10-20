import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

export function SkeletonPoster() {
  const base = useThemeColor({}, 'skeletonBase' as any);
  const highlight = useThemeColor({}, 'skeletonHighlight' as any);
  const t = useSharedValue(0);

  React.useEffect(() => {
    t.value = withRepeat(withTiming(1, { duration: 1200 }), -1, true);
  }, [t]);

  const rStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(t.value, [0, 1], [base, highlight]),
  }));

  return <Animated.View style={[styles.card, rStyle]} />;
}

const styles = StyleSheet.create({
  card: {
    height: 220,
    borderRadius: 16,
    backgroundColor: '#e8ecf1',
  },
});


