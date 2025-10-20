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
    // Retro Game Boy-inspired additions
    surfaceAlt: '#e9e5d8',
    raised: '#f3efe6',
    overlay: 'rgba(35,44,28,0.06)',
    accent: '#6e7f5f',
    accentAlt: '#899b76',
    textMuted: '#4b5645',
    textOnAccent: '#f4f2ea',
    borderStrong: '#909b85',
    inputBg: '#efece3',
    inputBorder: '#b9c0ae',
    selection: 'rgba(110,127,95,0.18)',
    focus: '#6e7f5f',
    skeletonBase: '#d9d3c6',
    skeletonHighlight: '#ece7dc',
    navActive: '#6e7f5f',
    navInactive: '#6f7c86',
    success: '#4e8a5b',
    warn: '#b98b2e',
    error: '#b85a5a',
    info: '#5a7ea8',
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
    // Retro Game Boy-inspired additions
    surfaceAlt: '#1f2730',
    raised: '#262f3a',
    overlay: 'rgba(0,0,0,0.25)',
    accent: '#94a78d',
    accentAlt: '#7f9176',
    textMuted: '#c7cfbe',
    textOnAccent: '#0f1510',
    borderStrong: '#5a6a57',
    inputBg: '#1c2430',
    inputBorder: '#3c4a3f',
    selection: 'rgba(148,167,141,0.22)',
    focus: '#94a78d',
    skeletonBase: '#1d2430',
    skeletonHighlight: '#2a3441',
    navActive: '#94a78d',
    navInactive: '#a9b2c0',
    success: '#4e8a5b',
    warn: '#b98b2e',
    error: '#b85a5a',
    info: '#5a7ea8',
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
