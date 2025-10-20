import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export function GrainOverlay() {
  const overlay = useThemeColor({}, 'overlay' as any);
  return <View pointerEvents="none" style={[styles.overlay, { backgroundColor: overlay }]} />;
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});


