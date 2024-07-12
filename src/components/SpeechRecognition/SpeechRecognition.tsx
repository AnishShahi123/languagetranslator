"use client";

import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { IconMicrophone } from "@tabler/icons-react";

interface SpeechRecognitionProps {
  setSourceText: (value: string) => void;
}

const SpeechRecognitionComponent = (props: SpeechRecognitionProps) => {
  const { transcript, listening } = useSpeechRecognition();

  useEffect(() => {
    props?.setSourceText(transcript);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript, props?.setSourceText]);

  const handleRecording = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening();
    }
  };

  return (
    <div>
      <IconMicrophone
        className="text-gray-400 ml-3"
        size={22}
        onClick={handleRecording}
      />
    </div>
  );
};

export { SpeechRecognitionComponent };
