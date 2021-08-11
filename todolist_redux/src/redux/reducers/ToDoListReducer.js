import { arrTheme } from "../../Themes/ThemeManager";
import { ToDoListDarkTheme } from "../../Themes/ToDoListDarkTheme";
import { add_task, change_theme } from "../types/ToDoListTypes";

const initialState = {
  themeToDoList: ToDoListDarkTheme,
  taskList: [
    { id: 1, taskName: "task 1", done: true },
    { id: 2, taskName: "task 2", done: false },
    { id: 3, taskName: "task 3", done: true },
    { id: 4, taskName: "task 4", done: false },
  ],
};

const ToDoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case add_task: {
      //kiem tra rong
      if (action.newTask.taskName.trim() === "") {
        alert("Please enter a task name");
        return { ...state };
      }
      //kiem tra ton tai
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex(
        (task) => task.taskName === action.newTask.taskName
      );
      //neu da co tra mang cu
      if (index !== -1) {
        alert("Task name already exists");
        return { ...state };
      }
      //neu chua co add task moiws
      taskListUpdate.push(action.newTask);

      //xu ly thi gan list moi
      state.taskList = taskListUpdate;

      return { ...state };
    }

    case change_theme: {
      //tim theme dua vao tuy tron cua user
      let theme = arrTheme.find((theme) => theme.id == action.value);

      if (theme) {
        //set lai state cho them
        state.themeToDoList = { ...theme.theme };
      }
      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default ToDoListReducer;
