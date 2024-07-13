import React from "react";
import { IconLanguage } from "@tabler/icons-react";
import { IconButton } from "../Buttons/IconButton";
interface LanguageSelectorProps {
  selectedLanguage: string;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
  languages: string[];
}

const LanguageSelector = (props: LanguageSelectorProps) => {
  const { languages, selectedLanguage, setSelectedLanguage } = props;
  return (
    <span
      className="cursor-pointer rounded-full space-x-1 pl-2
   bg-[#000000] flex items-center flex-row"
    >
      <IconButton Icon={IconLanguage} onClick={() => {}} />
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className="bg-[#000000] flex flex-row rounded-full py-1
       text-white"
      >
        {languages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </span>
  );
};

export default LanguageSelector;
