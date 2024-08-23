import { useContext } from "react";
import { QuizDataContext } from "../context/QuizData.context.tsx";
import Question from "./Question.tsx";
import { Link } from "react-router-dom";
import { NB_QUESTION } from "../utils/constants.ts";
import ContentContainer from "./ContentContainer.tsx";

const QuizBody = () => {
  const { questions, setSelectedAnswers, selectedAnswers } =
    useContext(QuizDataContext);

  const canSubmit = selectedAnswers.size === NB_QUESTION;

  const handleAnswerSelect = (questionUUID: string, answer: string) => {
    setSelectedAnswers(new Map(selectedAnswers.set(questionUUID, answer)));
  };

  return (
    <ContentContainer>
      {questions.map((question) => (
        <Question
          key={question.uuid}
          question={question}
          handleAnswerSelect={handleAnswerSelect}
          selectedAnswerUuid={selectedAnswers.get(question.uuid) ?? ""}
          revealAnswer={false}
          canEditAnswer={true}
        />
      ))}
      {canSubmit && (
        <Link
          to={"/results"}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </Link>
      )}
    </ContentContainer>
  );
};

export default QuizBody;
