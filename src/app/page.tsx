"use client";

import "regenerator-runtime/runtime";
import { TextArea } from "@/components/Inputs/TextArea";
import { SpeechRecognitionComponent } from "@/components/SpeechRecognition/SpeechRecognition";
import { ChangeEvent, useState } from "react";
import { IconVolume } from "@tabler/icons-react";

export default function Home() {
  const [sourceText, setSourceText] = useState("");

  const handleAudioPlayback = (sourceText: string) => {
    const utterance = new SpeechSynthesisUtterance(sourceText);
    speechSynthesis.speak(utterance);
  };
  return (
    <div className="h-[50rem] w-full bg-black relative flex items-center justify-center">
      <div className="relative overflow-hidden h-screen">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 py-10 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-neutral-200">
              Language<span className="text-[#f87315]">Translator</span>
            </h1>
            <p className="mt-3 text-neutral-400">
              Bridging Voices, Connecting Worlds
            </p>

            {/* Text Box */}
            <div className="mt-7 sm:mt-12 mx-auto max-w-3xl relative">
              <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
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
                      <IconVolume
                        size={22}
                        className="text-neutral-400"
                        onClick={() => handleAudioPlayback(sourceText)}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
