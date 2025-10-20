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
        style={styles.input}
        returnKeyType="search"
        clearButtonMode="while-editing"
        autoCapitalize="none"
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
  },
});


