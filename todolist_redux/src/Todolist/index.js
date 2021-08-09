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

class ToDoList extends Component {
  // tạo hàm render task chưa xog
  renderTaskToDo = () => {
    return this.props.taskList
      .filter((task) => task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button className="ml-1">
                <i className="fa fa-edit"></i>
              </Button>
              <Button className="ml-1">
                <i className="fa fa-check"></i>
              </Button>
              <Button className="ml-1">
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
      .filter((task) => !task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button className="ml-1">
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  render() {
    const { themeToDoList } = this.props;
    return (
      //vi tri dio theme
      <ThemeProvider theme={themeToDoList}>
        <Container className="w-50">
          <Dropdown>
            <option>Dark theme</option>
            <option>Light theme</option>
            <option>Primary theme</option>
          </Dropdown>
          <Heading3>To do list</Heading3>
          <TextField label="Task name" className="w-50" />
          <Button className="ml-2">
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
