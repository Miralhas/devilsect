'use client'

import { useIsMobile } from "@/hooks/use-mobile";
import { PropsWithChildren, useEffect, useState } from "react";
import { createContext } from "./create-context";

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

type ReaderSettingsContextState = {
  fontSize: number;
  lineHeight: number;
  fontFamily: AvailableFonts;
  textColor: AvailableColors;
  opacity: number;
  autoScroll: AutoScroll,
  reset: () => void;
  increaseFontSize: () => void;
  increaseLineHeight: () => void;
  decreaseFontSize: () => void;
  decreaseLineHeight: () => void;
  changeFontFamily: (font: AvailableFonts) => void;
  changeTextColor: (color: AvailableColors) => void;
  changeOpacity: (value: number) => void;
  onAutoScrollActiveChange: () => void;
  increaseAutoScrollSpeed: () => void;
  decreaseAutoScrollSpeed: () => void;
  onAutoScrollPause: () => void;
}

const INITIAL_DESKTOP_FONT_SIZE = 18;

const initialValues: Pick<ReaderSettingsContextState, "fontFamily" | "fontSize" | "lineHeight" | "textColor" | "opacity" | 'autoScroll'> = {
  fontSize: 16,
  lineHeight: 25,
  fontFamily: "font-atkinson",
  textColor: { name: "lightSilver", color: '#e0e0e0' },
  opacity: 100,
  autoScroll: { active: false, pause: true, speed: 3 },
}

type InitialValuesType = typeof initialValues;

const { ContextProvider, useContext } = createContext<ReaderSettingsContextState>();

export const ReaderSettingsProvider = ({ children }: PropsWithChildren) => {
  const isMobile = useIsMobile();
  const [fontSize, setFontSize] = useState(initialValues["fontSize"]);
  const [fontFamily, setFontFamily] = useState(initialValues["fontFamily"]);
  const [lineHeight, setLineHeight] = useState(initialValues["lineHeight"]);
  const [textColor, setTextColor] = useState(initialValues["textColor"]);
  const [opacity, setOpacity] = useState(initialValues["opacity"]);
  const [autoScroll, setAutoScroll] = useState(initialValues["autoScroll"]);

  useEffect(() => {
    const readerSettingsString = localStorage.getItem("reader-settings");
    if (readerSettingsString) {
      const readerSettings: InitialValuesType = JSON.parse(readerSettingsString);
      setFontSize(readerSettings.fontSize ?? initialValues["fontSize"]);
      setFontFamily(readerSettings.fontFamily ?? initialValues["fontFamily"]);
      setLineHeight(readerSettings.lineHeight ?? initialValues["lineHeight"]);
      setTextColor(readerSettings.textColor ?? initialValues["textColor"]);
      setOpacity(readerSettings.opacity ?? initialValues["opacity"]);
      setAutoScroll(readerSettings.autoScroll ?? initialValues["autoScroll"]);
    } else {
      const mobile = window.innerWidth < 768;
      setFontSize(mobile ? initialValues["fontSize"] : INITIAL_DESKTOP_FONT_SIZE);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("reader-settings", JSON.stringify({ fontSize, fontFamily, lineHeight, textColor, opacity, autoScroll }));
  }, [fontSize, fontFamily, lineHeight, textColor, opacity, autoScroll]);

  const reset = () => {
    setFontSize(isMobile ? initialValues["fontSize"] : INITIAL_DESKTOP_FONT_SIZE);
    setFontFamily(initialValues["fontFamily"]);
    setLineHeight(initialValues["lineHeight"]);
    setTextColor(initialValues["textColor"]);
    setOpacity(initialValues["opacity"]);
    setAutoScroll(initialValues["autoScroll"]);
  }

  const increaseLineHeight = () => {
    setLineHeight(prev => prev + 1);
  }

  const decreaseLineHeight = () => {
    setLineHeight(prev => prev - 1);
  }

  const increaseFontSize = () => {
    setFontSize(prev => prev + 1);
  }

  const decreaseFontSize = () => {
    setFontSize(prev => prev - 1);
  }

  const changeFontFamily = (font: AvailableFonts) => {
    setFontFamily(font);
  }

  const changeTextColor = (color: AvailableColors) => {
    setTextColor(color);
  }

  const changeOpacity = (value: number) => {
    setOpacity(value);
  }

  const onAutoScrollActiveChange = () => {
    setAutoScroll(prev => ({ ...prev, active: !prev.active }));
  }

  const increaseAutoScrollSpeed = () => {
    setAutoScroll(prev => ({ ...prev, speed: prev.speed + 1 }));
  }

  const decreaseAutoScrollSpeed = () => {
    setAutoScroll(prev => ({ ...prev, speed: prev.speed - 1 }));
  }

  const onAutoScrollPause = () => {
    setAutoScroll(prev => ({ ...prev, pause: !prev.pause }));
  }


  return (
    <ContextProvider
      value={{
        fontSize,
        fontFamily,
        lineHeight,
        textColor,
        opacity,
        autoScroll,
        decreaseFontSize,
        increaseFontSize,
        decreaseLineHeight,
        increaseLineHeight,
        changeFontFamily,
        changeTextColor,
        changeOpacity,
        reset,
        decreaseAutoScrollSpeed,
        increaseAutoScrollSpeed,
        onAutoScrollActiveChange,
        onAutoScrollPause,
      }}
    >
      {children}
    </ContextProvider>
  )
}

export const useReaderSettingsContext = useContext;