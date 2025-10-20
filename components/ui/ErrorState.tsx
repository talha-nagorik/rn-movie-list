import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({ title = 'Something went wrong', message = 'Please try again.', onRetry }: Props) {
  const error = useThemeColor({}, 'error' as any);
  const textOnAccent = useThemeColor({}, 'textOnAccent' as any);
  const accent = useThemeColor({}, 'accent' as any);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.message, { color: error }]}>{message}</Text>
      {onRetry ? (
        <Pressable onPress={onRetry} style={[styles.button, { backgroundColor: accent }] }>
          <Text style={[styles.buttonText, { color: textOnAccent }]}>Retry</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 48,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  message: {
    opacity: 0.7,
  },
  button: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#9cc2ff',
  },
  buttonText: {
    color: '#0d1b2a',
    fontWeight: '600',
  },
});


