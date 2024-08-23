import { useNavigate } from "react-router-dom";
import { QuizDataContext } from "../context/QuizData.context.tsx";
import { useContext, useEffect } from "react";
import Question from "./Question.tsx";
import { QuizSettingsContext } from "../context/QuizSettings.context.tsx";
import { NB_QUESTION } from "../utils/constants.ts";
import Header from "./Header.tsx";
import ContentContainer from "./ContentContainer.tsx";

const ResultScreen = () => {
  const navigate = useNavigate();

  const { questions, selectedAnswers, clearQuizData } =
    useContext(QuizDataContext);
  const { clearSettings } = useContext(QuizSettingsContext);
  const correctlyAnsweredQuestionsNumber = questions?.filter(
    (question) =>
      question.correctAnswerUuid === selectedAnswers.get(question.uuid),
  ).length;

  useEffect(() => {
    if (questions.length === 0) {
      navigate("/");
    }
  }, [questions, navigate]);

  const nbGoodAnswerBackgroundColorClass = () => {
    if (correctlyAnsweredQuestionsNumber < 2) {
      return "bg-red-500";
    } else if (correctlyAnsweredQuestionsNumber < 4) {
      return "bg-yellow-500";
    } else {
      return "bg-green-500";
    }
  };

  return (
    <>
      <Header title={"Quiz App React Certification - Quiz Results"}></Header>
      <ContentContainer>
        <h2 className="text-2xl font-bold mb-4">Questions</h2>
        <ul>
          {questions.map((question) => (
            <Question
              key={question.uuid}
              question={question}
              canEditAnswer={false}
              selectedAnswerUuid={selectedAnswers.get(question.uuid) ?? ""}
              revealAnswer={true}
            />
          ))}
        </ul>

        <p
          className={`border-2 border-black ${nbGoodAnswerBackgroundColorClass()}`}
        >
          {correctlyAnsweredQuestionsNumber} / {NB_QUESTION} correct
        </p>

        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={() => {
            clearSettings();
            clearQuizData();
            navigate("/");
          }}
        >
          Go Back
        </button>
      </ContentContainer>
    </>
  );
};

export default ResultScreen;
