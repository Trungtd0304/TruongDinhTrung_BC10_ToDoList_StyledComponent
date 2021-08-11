import { add_task, change_theme } from "../types/ToDoListTypes";

export const addTaskAction = (newTask) => ({
  type: add_task,
  newTask,
});

export const changeTheme = (value) => ({
  type: change_theme,
  value,
});
