export type AssessmentType = 'GAD7' | 'PHQ9';

export interface AssessmentQuestion {
  id: number;
  text: string;
  options: {
    value: number;
    label: string;
  }[];
}

export interface AssessmentResult {
  type: AssessmentType;
  score: number;
  date: string;
  severity: string;
}

export interface UserAssessments {
  gad7Results: AssessmentResult[];
  phq9Results: AssessmentResult[];
  lastAssessmentDate?: string;
}