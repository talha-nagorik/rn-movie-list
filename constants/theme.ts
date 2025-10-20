/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// Pastel palette tuned to main background #d7c8b4 with a cool complementary tint
const tintColorLight = '#6f8aa6';
const tintColorDark = '#9fb4c8';

export const Colors = {
  light: {
    text: '#2a2a2a',
    background: '#d7c8b4',
    tint: tintColorLight,
    icon: '#6f7c86',
    tabIconDefault: '#6f7c86',
    tabIconSelected: tintColorLight,
    // New roles
    surface: '#efe7dc', // controls cards / tab bar
    card: '#f5efe6', // individual card backgrounds
    headerBackground: '#cbb89d',
    headerText: '#2a2a2a',
    border: '#c9bba8',
  },
  dark: {
    text: '#e9ecf2',
    background: '#141923',
    tint: tintColorDark,
    icon: '#a9b2c0',
    tabIconDefault: '#a9b2c0',
    tabIconSelected: tintColorDark,
    surface: '#1b2230',
    card: '#222938',
    headerBackground: '#1a2130',
    headerText: '#e9ecf2',
    border: '#2b3445',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
