export type MoodEntry = {
  id: string;
  date: Date;
  mood: 1 | 2 | 3 | 4 | 5;
  notes: string;
  activities: string[];
};

export type MoodData = {
  date: string;
  value: number;
};