import { useThemeColor } from '@/hooks/use-theme-color';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  debounceMs?: number;
};

export function SearchBar({ value, onChangeText, placeholder = 'Search movies…', debounceMs = 250 }: Props) {
  const [text, setText] = useState(value);
  const inputBg = useThemeColor({}, 'inputBg' as any);
  const inputBorder = useThemeColor({}, 'inputBorder' as any);
  const textMuted = useThemeColor({}, 'textMuted' as any);
  const focus = useThemeColor({}, 'focus' as any);
  useEffect(() => setText(value), [value]);
  useEffect(() => {
    const id = setTimeout(() => onChangeText(text), debounceMs);
    return () => clearTimeout(id);
  }, [text, onChangeText, debounceMs]);

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        placeholderTextColor={textMuted}
        style={[styles.input, { backgroundColor: inputBg, borderColor: inputBorder }]}
        returnKeyType="search"
        clearButtonMode="while-editing"
        autoCapitalize="none"
        selectionColor={focus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  input: {
    backgroundColor: '#eef2f7',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
});


