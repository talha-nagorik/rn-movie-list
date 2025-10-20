import React from 'react';
import { StyleSheet, View } from 'react-native';

export function SkeletonPoster() {
  return <View style={styles.card} />;
}

const styles = StyleSheet.create({
  card: {
    height: 220,
    borderRadius: 16,
    backgroundColor: '#e8ecf1',
  },
});


