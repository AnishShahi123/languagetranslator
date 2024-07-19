import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey =
  process.env.GEMINI_API_KEY || "AIzaSyBymXAPs4U00Z9yFvTp072eb7y8iSwerZw";
const genAI = new GoogleGenerativeAI(apiKey);

const FINAL_AI_PROMPT =
  "You will be provided with a sentence. The sentence is : {sourceText}.\n              Your tasks are to:\n              - Detect what language the sentence is in\n              - Translate the sentence into {selectedLanguage}}\n Do not return anything other than the translated sentence.";

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const useTranslate = (sourceText: string, selectedLanguage: string) => {
  const [targetText, setTargetText] = useState<string | null>("");

  useEffect(() => {
    const handleTranslate = async (sourceText: string) => {
      try {
        const chatSession = model.startChat({
          generationConfig,
          history: [
            {
              role: "user",
              parts: [
                {
                  text: "You will be provided with a sentence. The sentence is : hello.\n              Your tasks are to:\n              - Detect what language the sentence is in\n              - Translate the sentence into spanish\n Do not return anything other than the translated sentence.",
                },
              ],
            },
            {
              role: "model",
              parts: [{ text: "Hola. \n" }],
            },
          ],
        });
        const FINAL_PROMPT = FINAL_AI_PROMPT.replace(
          "{sourceText}",
          sourceText
        ).replace("{selectedLanguage}", selectedLanguage);
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        setTargetText(result.response.text());
      } catch (error) {
        console.log("Error translating text:", error);
      }
    };

    if (sourceText.trim()) {
      const timeoutId = setTimeout(() => {
        handleTranslate(sourceText);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [sourceText, selectedLanguage]);

  return targetText;
};

export { useTranslate };
