"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  handleChangeLanguage: (lang: string) => void;
}

export function GoogleTranslate({ selectedLanguage, handleChangeLanguage }: GoogleTranslateProps) {

  return (
    <Select value={selectedLanguage} onValueChange={handleChangeLanguage}>
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