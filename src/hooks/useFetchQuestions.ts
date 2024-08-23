import { useState } from "react";
import {
  ApiQuestion,
  ApiQuestionResponse,
  QuizAnswer,
  QuizQuestion,
  QuizQuestions,
} from "../type/questions.type.ts";
import { NB_QUESTION } from "../utils/constants.ts";
import { Difficulty } from "../type/difficulty.type.ts";

const useFetchQuestions = () => {
  const [questions, setQuestions] = useState<QuizQuestions>([]);

  const resetQuestions = (): void => {
    setQuestions([]);
  };

  const getPossibleAnswers = (question: ApiQuestion): QuizAnswer[] => {
    return [question.correct_answer, ...question.incorrect_answers]
      .sort(() => Math.random() - 0.5)
      .map((answer) => ({
        uuid: crypto.randomUUID(),
        answer: decodeHtmlEntities(answer),
      }));
  };

  const decodeHtmlEntities = (text: string): string => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  };

  const fetchQuestions = async (categoryId: string, difficulty: Difficulty) => {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${NB_QUESTION}&category=${categoryId}&difficulty=${difficulty}&type=multiple`,
    );
    const data: ApiQuestionResponse = await response.json();
    const quizQuestions: QuizQuestions = data.results.map(
      (question): QuizQuestion => {
        const possibleAnswers: QuizAnswer[] = getPossibleAnswers(question);
        const correctAnswerUuid =
          possibleAnswers.find(
            (answer) => answer.answer === question.correct_answer,
          )?.uuid ?? "";

        return {
          uuid: crypto.randomUUID(),
          question: decodeHtmlEntities(question.question),
          possibleAnswers,
          correctAnswerUuid,
        };
      },
    );
    setQuestions(quizQuestions);
  };

  return { questions, resetQuestions, fetchQuestions };
};

export default useFetchQuestions;
