import { OpenAI } from "openai";
import { useEffect, useState } from "react";

const openai = new OpenAI({
  apiKey: "sk-proj-d5GA678aDBCcPOxdw9hMT3BlbkFJgKGmkuUWm6O3Kt1n8Cd1",
  dangerouslyAllowBrowser: true,
});

const useTranslate = (sourceText: string, selectedLanguage: string) => {
  const [targetText, setTargetText] = useState<string | null>("");

  useEffect(() => {
    const handleTranslate = async (sourceText: string) => {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: `You will be provided with a sentence. This sentence: 
              ${sourceText}. Your tasks are to:
              - Detect what language the sentence is in
              - Translate the sentence into ${selectedLanguage}
              Do not return anything other than the translated sentence.`,
            },
          ],
        });
        const data = response.choices[0].message.content;
        setTargetText(data);
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
