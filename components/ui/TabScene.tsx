import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type Props = {
  children: React.ReactNode;
};

export function TabScene({ children }: Props) {
  const isFocused = useIsFocused();
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming(isFocused ? 1 : 0, { duration: 220 });
  }, [isFocused, progress]);

  const rStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      {
        translateY: (1 - progress.value) * 8,
      },
    ],
  }));

  return <Animated.View style={rStyle}>{children}</Animated.View>;
}


