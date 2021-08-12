import { arrTheme } from "../../Themes/ThemeManager";
import { ToDoListDarkTheme } from "../../Themes/ToDoListDarkTheme";
import {
  add_task,
  change_theme,
  delete_task,
  done_task,
  edit_task,
  update_task,
} from "../types/ToDoListTypes";

const initialState = {
  themeToDoList: ToDoListDarkTheme,
  taskList: [
    { id: 1, taskName: "task 1", done: true },
    { id: 2, taskName: "task 2", done: false },
    { id: 3, taskName: "task 3", done: true },
    { id: 4, taskName: "task 4", done: false },
  ],
  taskEdit: { id: -1, taskName: "", done: false },
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
      let theme = arrTheme.find((theme) => theme.id == action.themeId);

      if (theme) {
        //set lai state cho them
        state.themeToDoList = { ...theme.theme };
      }
      return { ...state };
    }
    case done_task: {
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex((task) => task.id == action.taskId);

      if (index !== -1) {
        taskListUpdate[index].done = true;
      }

      // state.taskList = taskListUpdate;
      return { ...state, taskList: taskListUpdate };
    }

    case delete_task: {
      //cach cu
      // let taskListUpdate = [...state.taskList];
      // let index = taskListUpdate.findIndex((task) => task.id == action.taskId);
      // if (index !== -1) {
      //   taskListUpdate.splice(index, 1);
      // }
      // return { ...state, taskList: taskListUpdate };

      //cach moi 1
      // let taskListUpdate = [...state.taskList];
      // taskListUpdate = taskListUpdate.filter(
      //   (task) => task.id !== action.taskId
      // );
      // return { ...state, taskList: taskListUpdate };

      //cach moi 2
      return {
        ...state,
        taskList: state.taskList.filter((task) => task.id !== action.taskId),
      };
    }

    case edit_task: {
      return { ...state, taskEdit: action.task };
    }

    case update_task: {
      //chinh sua lai task name cua taskEdit
      state.taskEdit = { ...state.taskEdit, taskName: action.taskName };
      //tim trong taskList cap nhat lai taskEdit nguoi dung update
      let taskUpdate = [...state.taskList];
      let index = taskUpdate.findIndex((task) => task.id === state.taskEdit.id);

      if (index !== -1) {
        taskUpdate[index] = state.taskEdit;
      }
      state.taskList = taskUpdate;
      //gan id sau update =1 de co the sua lan tiep theo
      state.taskEdit = { id: "-1", taskName: "", done: false };
      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default ToDoListReducer;
