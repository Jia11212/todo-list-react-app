import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Todo } from "./Todo";

export const TodoTable = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Deadline</TableCell>
            <TableCell>Piority</TableCell>
            <TableCell>Is Complete</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.todoList.map((task) => (
            <Todo
              id={task.id}
              title={task.title}
              description={task.description}
              deadline={task.deadline}
              piority={task.piority}
              completed={task.completed}
              deleteTask={props.deleteTask}
              handleUpdateClick={props.handleUpdateClick}
              setTargetTitle={props.setTargetTitle}
              setDeleteTargetTitle={props.setDeleteTargetTitle}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

/* right after tablebody
{props.todoList.map((task) => (
            <Todo
              id={task.id}
              title={task.title}
              description={task.description}
              deadline={task.deadline}
              piority={task.piority}
              completed={task.completed}
              actions={task.actions}
            />
          ))}
*/
