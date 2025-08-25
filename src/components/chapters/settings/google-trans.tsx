"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dispatch, SetStateAction } from 'react';

const languages = [
  { value: "en", label: "English" },
  { value: "pt", label: "Portuguese (Brazil)" },
  { value: "es", label: "Spanish" },
  { value: "ar", label: "Arabic" },
  { value: "zh-CN", label: "Chinese (Simplified)" },
  { value: "da", label: "Danish" },
  { value: "nl", label: "Dutch" },
  { value: "tl", label: "Filipino" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "hi", label: "Hindi" },
  { value: "hu", label: "Hungarian" },
  { value: "id", label: "Indonesian" },
  { value: "it", label: "Italian" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "pl", label: "Polish" },
  { value: "ru", label: "Russian" },
  { value: "sv", label: "Swedish" },
  { value: "th", label: "Thai" },
  { value: "tr", label: "Turkish" },
  { value: "uk", label: "Ukrainian" },
  { value: "vi", label: "Vietnamese" },

]
interface GoogleTranslateProps {
  selectedLanguage: string;
  setSelectedLanguage: Dispatch<SetStateAction<string>>
}

export function GoogleTranslate({ selectedLanguage, setSelectedLanguage }: GoogleTranslateProps) {
  const onChange = (lang: string) => {
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = lang; // e.g., 'pt' or 'es'
      select.dispatchEvent(new Event("change"));
      setSelectedLanguage(lang)
    }
  };

  return (
    <Select value={selectedLanguage} onValueChange={onChange}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent className='max-h-[300px]' side='bottom'>
        {languages.map((language) => (
          <SelectItem key={language.value} value={language.value}>
            {language.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};