export interface Resource {
  id: string;
  __typename: string;
}

export interface SurveyInterface extends Resource {
  name: string[];
  questions: QuestionInterface[];
}

export interface QuestionInterface extends Resource {
  text: string;
  minValues: number;
  maxValues: number;
  answer: AnswerInterface;
  possibleValues: PossibleValueInterface[];
  answerType: string;
}

export interface AnswerInterface extends Resource {
  values: string[];
}

export interface PossibleValueInterface extends Resource {
  value: string;
  label: string;
}

export interface AnonUserInterface extends Resource {
  survey: SurveyInterface;
}

export interface SuccessResponse {
  __typename: string;
  success: boolean;
  message: string;
}

export interface CreateAnswerResponse extends SuccessResponse {
  answer: AnswerInterface;
}
