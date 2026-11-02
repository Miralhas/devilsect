import { createStore } from 'zustand/vanilla';
import { persist, createJSONStorage } from 'zustand/middleware'

export const AVAILABLE_FONTS = ["font-atkinson", "font-inter", "font-roboto", "font-manrope"] as const;
export const AVAILABLE_COLORS = [
  { name: "lightSilver", color: "#e0e0e0" },
  { name: "coolLightGray", color: "#e8eaed" },
  { name: "softWarmWhite", color: "#f2f4f2" },
  { name: "creamWhite", color: "#f7f5f3" },
  { name: "neutralLight", color: "#ebebeb" },
  { name: "platinumGray", color: "#e6e6e6" },
] as const;

type AvailableFonts = typeof AVAILABLE_FONTS[number];
type AvailableColors = typeof AVAILABLE_COLORS[number];
type AutoScroll = {
  active: boolean;
  pause: boolean;
  speed: number;
}

export type ReaderSettingsState = {
  fontSize: number;
  lineHeight: number;
  fontFamily: AvailableFonts;
  textColor: AvailableColors;
  opacity: number;
  autoScroll: AutoScroll,
  spacing: number;
}

export type ReaderSettingsActions = {
  reset: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  increaseLineHeight: () => void;
  decreaseLineHeight: () => void;
  increaseSpacing: () => void;
  decreaseSpacing: () => void;
  changeFontFamily: (font: AvailableFonts) => void;
  changeTextColor: (color: AvailableColors) => void;
  changeOpacity: (value: number) => void;
  onAutoScrollActiveChange: () => void;
  increaseAutoScrollSpeed: () => void;
  decreaseAutoScrollSpeed: () => void;
  onAutoScrollToggle: () => void;
  autoScrollPause: () => void;
  autoScrollUnpause: () => void;
}

export type ReaderSettingsStore = ReaderSettingsState & ReaderSettingsActions;

const AUTO_SCROLL_SPEED_OFFSET = 0.25;
const INITIAL_DESKTOP_FONT_SIZE = 18;

export const initialReaderSettingsValues: ReaderSettingsState = {
  fontSize: 16,
  spacing: 16,
  lineHeight: 25,
  fontFamily: "font-atkinson",
  textColor: { name: "lightSilver", color: '#e0e0e0' },
  opacity: 100,
  autoScroll: { active: false, pause: true, speed: 1 },
}

export const createReaderSettingsStore = (initState: ReaderSettingsState = initialReaderSettingsValues, isMobile: boolean = true) => {
  return createStore<ReaderSettingsStore>()(
    persist((set, get) => ({
      ...initState,
      fontSize: isMobile ? initState.fontSize : INITIAL_DESKTOP_FONT_SIZE,
      reset: () => set(({ ...initState, fontSize: isMobile ? initState.fontSize : INITIAL_DESKTOP_FONT_SIZE })),
      increaseFontSize: () => set(({ fontSize: get().fontSize + 1 })),
      decreaseFontSize: () => set(({ fontSize: get().fontSize - 1 })),
      increaseLineHeight: () => set(({ lineHeight: get().lineHeight + 1 })),
      decreaseLineHeight: () => set(({ lineHeight: get().lineHeight - 1 })),
      increaseSpacing: () => set(({ spacing: get().spacing + 1 })),
      decreaseSpacing: () => set(({ spacing: get().spacing - 1 })),
      changeFontFamily: (fontFamily) => set({ fontFamily }),
      changeTextColor: (textColor) => set({ textColor }),
      changeOpacity: (opacity) => set({ opacity }),
      onAutoScrollActiveChange: () => set({ autoScroll: { ...get().autoScroll, active: !get().autoScroll.active } }),
      increaseAutoScrollSpeed: () => set({ autoScroll: { ...get().autoScroll, speed: get().autoScroll.speed + AUTO_SCROLL_SPEED_OFFSET } }),
      decreaseAutoScrollSpeed: () => set({ autoScroll: { ...get().autoScroll, speed: get().autoScroll.speed - AUTO_SCROLL_SPEED_OFFSET } }),
      onAutoScrollToggle: () => set({ autoScroll: { ...get().autoScroll, pause: !get().autoScroll.pause } }),
      autoScrollPause: () => set({ autoScroll: { ...get().autoScroll, pause: true } }),
      autoScrollUnpause: () => set({ autoScroll: { ...get().autoScroll, pause: false } }),
    }), {
      partialize: (s) => ({
        fontSize: s.fontSize,
        spacing: s.spacing,
        lineHeight: s.lineHeight,
        fontFamily: s.fontFamily,
        textColor: s.textColor,
        opacity: s.opacity,
        autoScroll: { ...initState.autoScroll, speed: s.autoScroll.speed },
      }),
      name: 'reader',
      storage: createJSONStorage(() => localStorage),
    })
  );
};