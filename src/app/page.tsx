"use client";

import "regenerator-runtime/runtime";
import { TextArea } from "@/components/Inputs/TextArea";
import { SpeechRecognitionComponent } from "@/components/SpeechRecognition/SpeechRecognition";
import { ChangeEvent, useState } from "react";
import {
  IconCopy,
  IconLanguage,
  IconStar,
  IconThumbDown,
  IconThumbUp,
  IconVolume,
} from "@tabler/icons-react";
import FileUpload from "@/components/Inputs/Fileupload";
import { rtfToText } from "@/utils/rtfToText";
import LinkPaste from "@/components/Inputs/LinkPaste";
import SvgDecorations from "@/components/SvgDecorator";
import LanguageSelector from "@/components/Inputs/LanguageSelector";
import { useTranslate } from "@/hooks/useTranslate";
import { IconButton } from "@/components/Buttons/IconButton";

export default function Home() {
  const [sourceText, setSourceText] = useState("");

  const [copied, setCopied] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [languages] = useState<string[]>([
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Nepali",
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Spanish");

  const targetText = useTranslate(sourceText, selectedLanguage);

  const handleAudioPlayback = (sourceText: string) => {
    const utterance = new SpeechSynthesisUtterance(sourceText);
    speechSynthesis.speak(utterance);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string;
        const text = rtfToText(rtfContent);
        setSourceText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleLinkPaste = async (e: ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    try {
      const response = await fetch(link);
      const data = await response.text();
      setSourceText(data);
    } catch (error) {
      console.error("Error fetching link content:", error);
    }
  };

  const handleLike = () => {
    // Implement like logic
  };

  const handleDislike = () => {
    // Implement dislike logic
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(targetText as string);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
    if (!favorite) {
      localStorage.setItem("favoriteTranslation", targetText as string);
    } else {
      localStorage.removeItem("favoriteTranslation");
    }
  };

  return (
    <div className="h-[50rem] w-full bg-black relative flex items-center justify-center">
      <div className="relative overflow-hidden h-screen">
        <div className="min-w-[85rem] mx-auto px-4 sm:px-6 py-10 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-neutral-200">
              Language<span className="text-[#f87315]">Translator</span>
            </h1>
            <p className="mt-3 text-neutral-400">
              Bridging Voices, Connecting Worlds
            </p>

            {/* Text Box */}
            <div className="mt-7 sm:mt-12 mx-auto max-w-3xl relative">
              <div className="grid gap-8 md:grid-cols-2 grid-cols-1">
                <div className="relative z-10 flex flex-col border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                  <TextArea
                    id="source-language"
                    value={sourceText}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      setSourceText(e?.target?.value);
                    }}
                    placeholder="Source Language"
                  />
                  <div className="flex flex-row justify-between w-full mb-3">
                    <span className="cursor-pointer flex space-x-3 flex-row">
                      <SpeechRecognitionComponent
                        setSourceText={setSourceText}
                      />
                      <IconButton
                        onClick={() => handleAudioPlayback(sourceText)}
                        Icon={IconVolume}
                      />
                      <FileUpload handleFileUpload={handleFileUpload} />
                      <LinkPaste handleLinkPaste={handleLinkPaste} />
                    </span>
                    <span className="text-sm pr-4 text-neutral-400">
                      {sourceText.length} / 2000
                    </span>
                  </div>
                </div>

                {/* Translated Box */}
                <div className="relative z-10 flex flex-col border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                  <TextArea
                    id="target-language"
                    value={targetText as string}
                    onChange={() => {}}
                    placeholder="Target Language"
                  />
                  <div className="flex flex-row justify-between w-full">
                    <span className="cursor-pointer flex items-center space-x-2 flex-row">
                      <LanguageSelector
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                        languages={languages}
                      />
                      <IconButton
                        Icon={IconVolume}
                        onClick={() =>
                          handleAudioPlayback(targetText as string)
                        }
                      />
                    </span>
                    <div className="flex flex-row items-center space-x-2 pr-4 cursor-pointer">
                      <IconButton
                        onClick={handleCopyToClipboard}
                        Icon={IconCopy}
                      />
                      {copied && (
                        <span className="text-xs text-green-500">Copied!</span>
                      )}
                      <IconButton Icon={IconThumbUp} onClick={handleLike} />
                      <IconButton
                        Icon={IconThumbDown}
                        onClick={handleDislike}
                      />
                      <IconStar
                        size={22}
                        onClick={handleFavorite}
                        className={
                          favorite ? "text-yellow-500" : "text-neutral-400"
                        }
                      />
                    </div>
                  </div>
                </div>
                <SvgDecorations />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
