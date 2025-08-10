'use client'

import { PropsWithChildren, useEffect, useState } from "react";
import { createContext } from "./create-context";
import { useIsMobile } from "@/hooks/use-mobile";

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

type ReaderSettingsContextState = {
  fontSize: number;
  lineHeight: number;
  fontFamily: AvailableFonts;
  textColor: AvailableColors;
  opacity: number;
  reset: () => void;
  increaseFontSize: () => void;
  increaseLineHeight: () => void;
  decreaseFontSize: () => void;
  decreaseLineHeight: () => void;
  changeFontFamily: (font: AvailableFonts) => void;
  changeTextColor: (color: AvailableColors) => void;
  changeOpacity: (value: number) => void;
}

const INITIAL_DESKTOP_FONT_SIZE = 18;

const initialValues: Pick<ReaderSettingsContextState, "fontFamily" | "fontSize" | "lineHeight" | "textColor" | "opacity"> = {
  fontSize: 16,
  lineHeight: 25,
  fontFamily: "font-atkinson",
  textColor: { name: "lightSilver", color: '#e0e0e0' },
  opacity: 100,
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

  useEffect(() => {
    const readerSettingsString = localStorage.getItem("reader-settings");
    if (readerSettingsString) {
      const readerSettings: InitialValuesType = JSON.parse(readerSettingsString);
      setFontSize(readerSettings.fontSize ?? initialValues["fontSize"]);
      setFontFamily(readerSettings.fontFamily ?? initialValues["fontFamily"]);
      setLineHeight(readerSettings.lineHeight ?? initialValues["lineHeight"]);
      setTextColor(readerSettings.textColor ?? initialValues["textColor"]);
      setOpacity(readerSettings.opacity ?? initialValues["opacity"]);
    } else {
      const mobile = window.innerWidth < 768;
      setFontSize(mobile ? initialValues["fontSize"] : INITIAL_DESKTOP_FONT_SIZE);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("reader-settings", JSON.stringify({ fontSize, fontFamily, lineHeight, textColor, opacity }));
  }, [fontSize, fontFamily, lineHeight, textColor, opacity])

  const reset = () => {
    setFontSize(isMobile ? initialValues["fontSize"] : INITIAL_DESKTOP_FONT_SIZE);
    setFontFamily(initialValues["fontFamily"]);
    setLineHeight(initialValues["lineHeight"]);
    setTextColor(initialValues["textColor"]);
    setOpacity(initialValues["opacity"]);
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


  return (
    <ContextProvider
      value={{
        fontSize,
        fontFamily,
        lineHeight,
        textColor,
        opacity,
        decreaseFontSize,
        increaseFontSize,
        decreaseLineHeight,
        increaseLineHeight,
        changeFontFamily,
        changeTextColor,
        changeOpacity,
        reset,
      }}
    >
      {children}
    </ContextProvider>
  )
}

export const useReaderSettingsContext = useContext;