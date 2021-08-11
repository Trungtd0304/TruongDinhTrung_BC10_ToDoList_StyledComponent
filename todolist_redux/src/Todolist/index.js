import React, { Component } from "react";
import { Container } from "../Components/Container";
import { ThemeProvider } from "styled-components"; // dung de tao them cho web
//import theme  tu tao them cho web
import { ToDoListDarkTheme } from "../Themes/ToDoListDarkTheme";
import { ToDoListLightTheme } from "../Themes/ToDoListLightTheme";
import { ToDoListPrimaryTheme } from "../Themes/ToDoListPrimaryTheme";
import { Dropdown } from "../Components/Dropdown";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
} from "../Components/Heading";
import { TextField, Label, Input } from "../Components/TextField";
import { Button } from "../Components/Button";
import { Table, Tr, Td, Th, Thead, Tbody } from "../Components/Table";
import { connect } from "react-redux";
//add action dua du lieu len reducer
import {
  addTaskAction,
  changeTheme,
  deleteTaskAction,
  doneTaskAction,
} from "../redux/actions/ToDoListAction";
import { arrTheme } from "../Themes/ThemeManager";

class ToDoList extends Component {
  state = {
    //tao state chua cac handerChange
    taskName: "",
  };
  // tạo hàm render task chưa xog
  renderTaskToDo = () => {
    return this.props.taskList
      .filter((task) => !task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button className="ml-1">
                <i className="fa fa-edit"></i>
              </Button>
              <Button
                onClick={() => {
                  this.props.dispatch(doneTaskAction(task.id));
                }}
                className="ml-1"
              >
                <i className="fa fa-check"></i>
              </Button>
              <Button
                onClick={() => {
                  this.props.dispatch(deleteTaskAction(task.id));
                }}
                className="ml-1"
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  // tạo hàm render task đã xog

  renderTaskCompleted = () => {
    return this.props.taskList
      .filter((task) => task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  this.props.dispatch(deleteTaskAction(task.id));
                }}
                className="ml-1"
                className="ml-1"
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  //tạo hàm render theme import trang theme đã có
  renderTheme = () => {
    return arrTheme.map((theme, index) => {
      return <option value={theme.id}>{theme.name}</option>;
    });
  };

  render() {
    const { themeToDoList } = this.props;
    return (
      //vi tri dio theme
      <ThemeProvider theme={themeToDoList}>
        <Container className="w-50">
          <Dropdown
            onChange={(e) => {
              let { value } = e.target;
              //dispatch value len reudcer
              this.props.dispatch(changeTheme(value));
            }}
          >
            {this.renderTheme()}
          </Dropdown>
          <Heading3>To do list</Heading3>
          <TextField
            name="taskName"
            onChange={(e) => {
              //taoj phuong thuc hung du lieu tu nguoi nhap
              this.setState({ taskName: e.target.value });
            }}
            label="Task name"
            className="w-50"
          />
          <Button
            onClick={() => {
              //Lấy thông tin người dùng nhập từ inputs
              let { taskName } = this.state;
              //Tạo ra 1 task object
              let newTask = { id: Date.now(), taskName: taskName, done: false };
              //Đưa task object lên redux thông qua phương thức dispatch
              this.props.dispatch(addTaskAction(newTask));
            }}
            className="ml-2"
          >
            <i className="fa fa-plus mr-1"></i>Add task
          </Button>
          <Button className="ml-2">
            <i className="fa fa-upload mr-1"></i>update task
          </Button>
          <hr />
          <Heading2>Task to do</Heading2>
          <Table>
            <Thead>{this.renderTaskToDo()}</Thead>
          </Table>
          <Heading2>Task completed</Heading2>
          <Table>
            <Thead>{this.renderTaskCompleted()}</Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }
}

const mapSateToProps = (state) => {
  return {
    themeToDoList: state.ToDoListReducer.themeToDoList,
    taskList: state.ToDoListReducer.taskList,
  };
};

export default connect(mapSateToProps)(ToDoList);
