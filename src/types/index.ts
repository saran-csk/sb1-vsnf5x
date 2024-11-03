export type Level = 'Beginner' | 'Intermediate' | 'Advanced';

export interface QuestionOption {
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface Question {
  text: string;
  options: QuestionOption[];
  userAnswer: string;
}

export interface Topic {
  name: string;
  questions: Question[];
  answers?: string[];
  score?: number;
}

export interface CourseState {
  title: string;
  level: Level;
  topics: Topic[];
  loading: boolean;
  error: string | null;
}