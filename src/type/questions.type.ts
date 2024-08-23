export type QuizQuestions = QuizQuestion[];
export type QuizQuestion = {
  uuid: string;
  question: string;
  possibleAnswers: QuizAnswer[];
  correctAnswerUuid: string;
};

export type QuizAnswer = {
  uuid: string;
  answer: string;
};

export type ApiQuestion = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type ApiQuestionResponse = {
  response_code: number;
  results: ApiQuestion[];
};
