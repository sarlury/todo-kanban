import { Priority, Status, Type } from "./enums";

export interface Todo {
  id: string;
  task: string;
  developers: string[];
  status: Status;
  priority: Priority;
  type: Type;
  date: string;
  estimatedSP: number;
  actualSP: number;
}
