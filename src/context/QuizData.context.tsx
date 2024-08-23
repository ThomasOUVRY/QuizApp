import { createContext, ReactNode, useState } from "react";
import { QuizQuestions } from "../type/questions.type.ts";
import useFetchQuestions from "../hooks/useFetchQuestions.ts";
import { Difficulty } from "../type/difficulty.type.ts";

type QuizDataContextType = {
  questions: QuizQuestions;
  selectedAnswers: Map<string, string>;
  setSelectedAnswers: (selectedAnswers: Map<string, string>) => void;
  fetchQuestions: (categoryId: string, difficulty: Difficulty) => Promise<void>;
  clearQuizData: () => void;
};

export const QuizDataContext = createContext<QuizDataContextType>({
  questions: [],
  fetchQuestions: async () => {},
  selectedAnswers: new Map<string, string>(),
  setSelectedAnswers: () => {},
  clearQuizData: () => {},
});

export const QuizDataContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { questions, resetQuestions, fetchQuestions } = useFetchQuestions();
  const [selectedAnswers, setSelectedAnswers] = useState<Map<string, string>>(
    new Map<string, string>(),
  );

  const clearQuizData = () => {
    setSelectedAnswers(new Map<string, string>());
    resetQuestions();
  };

  return (
    <QuizDataContext.Provider
      value={{
        questions,
        fetchQuestions,
        selectedAnswers,
        setSelectedAnswers,
        clearQuizData,
      }}
    >
      {children}
    </QuizDataContext.Provider>
  );
};
