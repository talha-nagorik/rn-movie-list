import { useIsFocused } from '@react-navigation/native';

export function useSubscribedByScreenFocus() {
  return useIsFocused();
}


