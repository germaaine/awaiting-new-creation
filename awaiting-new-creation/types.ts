export type Task = {
  id: number;
  text: string;
  category: "daily" | "project";
  completed: boolean;
  impact: string;
};