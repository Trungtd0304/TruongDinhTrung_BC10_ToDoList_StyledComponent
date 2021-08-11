import {
  add_task,
  change_theme,
  delete_task,
  done_task,
} from "../types/ToDoListTypes";

export const addTaskAction = (newTask) => ({
  type: add_task,
  newTask,
});

export const changeTheme = (themeId) => ({
  type: change_theme,
  themeId,
});

export const doneTaskAction = (taskId) => ({
  type: done_task,
  taskId,
});

export const deleteTaskAction = (taskId) => ({
  type: delete_task,
  taskId,
});
