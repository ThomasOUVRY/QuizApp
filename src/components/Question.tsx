import { QuizQuestion } from "../type/questions.type.ts";

type QuestionType = {
  question: QuizQuestion;
  canEditAnswer: boolean;
  revealAnswer: boolean;
  selectedAnswerUuid: string;
  handleAnswerSelect?: (questionUUID: string, answer: string) => void;
};

const Question = ({
  question,
  selectedAnswerUuid,
  canEditAnswer,
  handleAnswerSelect,
  revealAnswer = false,
}: QuestionType) => {
  const computeButtonClass = (
    isCorrectAnswer: boolean,
    isSelectedAnswer: boolean,
    revealAnswer: boolean,
    canEditAnswer: boolean,
  ): string => {
    if (revealAnswer) {
      if (isCorrectAnswer) {
        return "bg-green-200";
      } else if (isSelectedAnswer) {
        return "bg-red-200";
      } else {
        return "bg-white";
      }
    } else {
      if (isSelectedAnswer) {
        return "bg-blue-200";
      } else {
        return canEditAnswer ? "bg-white" : "bg-gray-200";
      }
    }
  };

  return (
    <>
      <h3 className="font-semibold text-lg mb-2">{question.question}</h3>
      <ul className="flex flex-wrap">
        {question.possibleAnswers.map((answer, i) => {
          const isCorrectAnswer = answer.uuid === question.correctAnswerUuid;
          const isSelectedAnswer = answer.uuid === selectedAnswerUuid;
          const buttonClass = computeButtonClass(
            isCorrectAnswer,
            isSelectedAnswer,
            revealAnswer,
            canEditAnswer,
          );
          return (
            <li key={i} className="mr-2 mb-2">
              <button
                className={`border-2 p-2 rounded-md ${buttonClass} ${canEditAnswer ? "hover:bg-blue-100" : "cursor-not-allowed opacity-50"}`}
                disabled={!canEditAnswer}
                onClick={() =>
                  canEditAnswer &&
                  handleAnswerSelect &&
                  handleAnswerSelect(question.uuid, answer.uuid)
                }
              >
                {answer.answer}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Question;
