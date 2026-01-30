
export interface LearningObjectives {
  goals: string[];
  skill_booster: string;
  vocabulary: string[];
  grammar: string[];
}

export interface VocabularyItem {
  word: string;
  meaning: string;
}

export interface Practice {
  instruction: string;
  content: string[];
  options?: Record<string, string>;
  answers?: string[];
}

export interface Lesson {
  lesson_title: string;
  imageSrc?: string;
  learning_objectives: LearningObjectives;
  vocabulary_booster: VocabularyItem[];
  practices: Practice[];
}
