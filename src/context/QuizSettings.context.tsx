import { Difficulty } from "../type/difficulty.type.ts";
import { createContext, ReactNode, useState } from "react";

type QuizSettingsContextType = {
  category: string;
  setCategory: (category: string) => void;
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  clearSettings: () => void;
};

export const QuizSettingsContext = createContext<QuizSettingsContextType>({
  category: "",
  setCategory: () => {},
  difficulty: "easy",
  setDifficulty: () => {},
  clearSettings: () => {},
});

export const QuizSettingsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [category, setCategory] = useState<string>("");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  const clearSettings = () => {
    setCategory("");
    setDifficulty("easy");
  };

  return (
    <QuizSettingsContext.Provider
      value={{
        category,
        setCategory,
        difficulty,
        setDifficulty,
        clearSettings,
      }}
    >
      {children}
    </QuizSettingsContext.Provider>
  );
};
