import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";

export default function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("localTasks")) {
      const storedList = JSON.parse(localStorage.getItem("localTasks"));
      setTasks(storedList);
    }
  }, []);

  const addTask = (e) => {
    if (task) {
      const newTask = { id: new Date().getTime().toString, title: task };
      setTasks([...tasks, newTask]);
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
      setTask("");
    }
  };
  const handleDelete = (task) => {
    const deleted = tasks.filter((t) => t.id !== task.id);
    setTasks(deleted);
    localStorage.setItem("localTasks", JSON.stringify(deleted));
  };
  return (
    <>
      <Title>To-Do App</Title>
      <Create>
        <AddTask>
          <InputDetails
            type="text"
            value={task}
            placeholder="Input task here"
            onChange={(e) => setTask(e.target.value)}
          />
          <Submitbtn onClick={addTask}>Add</Submitbtn>
        </AddTask>
        <Badge>
          You have
          {!tasks.length
            ? " no tasks"
            : tasks.length === 1
            ? " 1 task"
            : tasks.length > 1
            ? ` ${tasks.length} tasks`
            : null}
        </Badge>
        {tasks.map((task) => (
          <React.Fragment key={task.id}>
            <Display>
              <Task>{task.title}</Task>
              <Status>
                <label>
                  {" "}
                  Complete
                  <input type="checkbox" name="status" />
                </label>
              </Status>
              <Deletebtn onClick={() => handleDelete(task)}>Del</Deletebtn>
            </Display>
          </React.Fragment>
        ))}
      </Create>
    </>
  );
}

const Create = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 50px;
  padding-right: 50px;
`;
const Title = styled.span`
  font-size: 30px;
  padding-left: 50px;
  margin-top: 20px;
  margin-bottom: 10px;
`;
const InputDetails = styled.input`
  border-radius: 5px;
  width: 50%;
  height: 30px;
  margin-bottom: 5px;
`;
const Submitbtn = styled.button`
  color: white;
  text-align: center;
  background-color: #008cba;
  border-radius: 15px;
  width: 55px;
`;
const Badge = styled.div`
  margin-bottom: 20px;
`;
const Display = styled.div``;
const Task = styled.div`
  color: black;
  border-radius: 5px;
  background-color: white;
  text-align: left;
  font-weight: bold;
  height: 30px;
  padding-left: 10px;
  padding-top: 10px;
  margin-bottom: 5px;
`;
const Deletebtn = styled.button`
  color: white;
  background-color: red;
  border-radius: 5px;
  margin-bottom: 20px;
`;
const AddTask = styled.div`
  display: flex;
`;
const Status = styled.div``;
