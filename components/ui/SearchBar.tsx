import { useThemeColor } from '@/hooks/use-theme-color';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, type TextInputSubmitEditingEvent } from 'react-native';

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  onSubmit?: (t: string) => void;
};

export function SearchBar({ value, onChangeText, placeholder = 'Search movies…', onSubmit }: Props) {
  const [text, setText] = useState(value);
  const inputBg = useThemeColor({}, 'inputBg');
  const inputBorder = useThemeColor({}, 'inputBorder');
  const textMuted = useThemeColor({}, 'textMuted');
  const focus = useThemeColor({}, 'focus');
  useEffect(() => setText(value), [value]);
  useEffect(() => {
    onChangeText(text);
  }, [text, onChangeText]);

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
        onSubmitEditing={(e: TextInputSubmitEditingEvent) => {
          if (onSubmit) onSubmit(text.trim());
        }}
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


