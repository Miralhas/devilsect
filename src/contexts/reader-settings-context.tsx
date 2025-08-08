'use client'

import { PropsWithChildren, useState } from "react";
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

type ReaderSettingsContextState = {
  fontSize: number;
  lineHeight: number;
  fontFamily: AvailableFonts;
  textColor: AvailableColors;
  reset: () => void;
  increaseFontSize: () => void;
  increaseLineHeight: () => void;
  decreaseFontSize: () => void;
  decreaseLineHeight: () => void;
  changeFontFamily: (font: AvailableFonts) => void;
  changeTextColor: (color: AvailableColors) => void;
}

const initialValues: Pick<ReaderSettingsContextState, "fontFamily" | "fontSize" | "lineHeight" | "textColor"> = {
  fontSize: 16,
  lineHeight: 25,
  fontFamily: "font-atkinson",
  textColor: { name: "lightSilver", color: '#e0e0e0' },
}

const { ContextProvider, useContext } = createContext<ReaderSettingsContextState>();

export const ReaderSettingsProvider = ({ children }: PropsWithChildren) => {
  const [fontSize, setFontSize] = useState(initialValues["fontSize"]);
  const [fontFamily, setFontFamily] = useState(initialValues["fontFamily"]);
  const [lineHeight, setLineHeight] = useState(initialValues["lineHeight"]);
  const [textColor, setTextColor] = useState(initialValues["textColor"]);

  const reset = () => {
    setFontSize(initialValues["fontSize"]);
    setFontFamily(initialValues["fontFamily"]);
    setLineHeight(initialValues["lineHeight"]);
    setTextColor(initialValues["textColor"]);
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


  return (
    <ContextProvider
      value={{
        fontSize,
        fontFamily,
        lineHeight,
        textColor,
        decreaseFontSize,
        increaseFontSize,
        decreaseLineHeight,
        increaseLineHeight,
        changeFontFamily,
        changeTextColor,
        reset,
      }}
    >
      {children}
    </ContextProvider>
  )
}

export const useReaderSettingsContext = useContext;
