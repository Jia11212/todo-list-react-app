import "./App.css";
import { useState, useEffect } from "react";
import { TodoTable } from "./TodoTable";
import { Banner } from "./Banner";
import toastr from "toastr";
import "./Toastr.css";
import { TodoForm } from "./TodoForm";
import dayjs from "dayjs";

function App() {
  const [targetTitle, setTargetTitle] = useState("");
  const [deleteTargetTitle, setDeleteTargetTitle] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [mode, setMode] = useState("add");
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [piority, setPiority] = useState("");
  const [deadline, setDeadline] = useState(
    dayjs().month() + "/" + dayjs().date() + "/" + dayjs().year()
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const resetProps = () => {
    setMode("add");
    setTitle("");
    setDescription("");
    setPiority("");
    setDeadline(dayjs().month() + "/" + dayjs().date() + "/" + dayjs().year());
    setErrorDescription(false);
    setErrorTitle(false);
  };

  const handleClose = () => {
    resetProps();
    setOpen(false);
  };

  const handleUpdateClick = (oldDescription, oldPiority, oldDate) => {
    setDescription(oldDescription);
    setPiority(oldPiority);
    setDeadline(oldDate);
    setMode("update");
    setOpen(true);
  };

  const handleSubmitUpdate = () => {
    handleUpdateTask(targetTitle, description, piority, deadline);
    resetProps();
    setOpen(false);
  };

  useEffect(() => {
    console.log("deleteTitle changed: " + deleteTargetTitle);
    if (deleteTargetTitle !== "") {
      deleteTask(deleteTargetTitle);
    }
  }, [deleteTargetTitle]);

  useEffect(() => {
    console.log("todolist changed: " + todoList);
  }, [todoList]);

  async function handleAddTask(title, description, piority, deadline) {
    const newTodoList = todoList.slice();
    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      title: title,
      description: description,
      deadline: deadline,
      piority: piority,
      completed: false,
    };
    newTodoList.push(task);
    setTodoList(newTodoList);

    toastr.success("Todo entry added successfully!");
  }

  const handleSubmit = () => {
    setMode("add");
    if (title === "") {
      setErrorTitle(true);
      toastr.error("Title is required");
    } else if (errorTitle === true && title !== "") {
      setErrorTitle(false);
    }

    if (description === "") {
      setErrorDescription(true);
      toastr.error("Description is required");
    } else if (errorDescription === true && description !== "") {
      setErrorDescription(false);
    }

    if (piority === "") {
      toastr.error("Piority is required");
    }

    let repeated = false;

    todoList.forEach((todo) => {
      if (todo.title === title) {
        setErrorTitle(true);
        toastr.error("Title cannot be repeated");
        repeated = true;
      }
    });

    if (
      title !== "" &&
      description !== "" &&
      piority !== "" &&
      repeated === false
    ) {
      handleAddTask(title, description, piority, deadline);
      resetProps();
      setOpen(false);
    }
  };

  const handleUpdateTask = (title, newDescription, newPiority, newDate) => {
    const newTodoList = todoList.map((task) => {
      if (task.title === title) {
        task.description = newDescription;
        task.piority = newPiority;
        task.date = newDate;
        return task;
      } else {
        return task;
      }
    });
    setTodoList(newTodoList);
    toastr.success("Todo entry updated successfully!");
  };

  function deleteTask(taskTitle) {
    let newTodoList = [...todoList].filter((task) => task.title !== taskTitle);
    setTodoList(newTodoList);
    setDeleteTargetTitle("");
    toastr.success("Todo entry deleted successfully!");
  }

  /*const deleteTask = (taskID) => {
    console.log("taskID is: " + taskID);
    console.log("old todolist: " + todoList);
    const newTodoList = todoList.filter((task) => {
      if (task.id === taskID) {
        console.log("delete Ran");
        return false;
      } else {
        return true;
      }
    });
    console.log("new todolist: " + newTodoList);
    setTodoList(newTodoList);
    toastr.success("Todo entry deleted successfully!");
  };*/

  return (
    <div className="App">
      <div className="Banner">
        <Banner handleClickOpen={handleClickOpen} />
        <TodoForm
          mode={mode}
          setMode={setMode}
          errorTitle={errorTitle}
          setErrorTitle={setErrorTitle}
          errorDescription={errorDescription}
          setErrorDescription={setErrorDescription}
          open={open}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          piority={piority}
          setPiority={setPiority}
          deadline={deadline}
          setDeadline={setDeadline}
          todoList={todoList}
          handleClickOpen={handleClickOpen}
          resetProps={resetProps}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          handleSubmitUpdate={handleSubmitUpdate}
          targetTitle={targetTitle}
        />
      </div>
      <div className="Todo-Table">
        <TodoTable
          todoList={todoList}
          deleteTask={deleteTask}
          handleClickOpen={handleClickOpen}
          handleUpdateClick={handleUpdateClick}
          setTargetTitle={setTargetTitle}
          setDeleteTargetTitle={setDeleteTargetTitle}
        />
      </div>
    </div>
  );
}

export default App;
