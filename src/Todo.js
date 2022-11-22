import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";

import FormControlLabel from "@mui/material/FormControlLabel";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

import { useState } from "react";

export const Todo = (props) => {
  const handleCompletenessChange = () => {
    if (buttons.length === 2) {
      setButtons(
        buttons.filter((button) => {
          if (button.key === "Update") {
            return false;
          } else {
            return true;
          }
        })
      );
    } else {
      setButtons([
        <Button
          onClick={() => {
            props.handleUpdateClick(
              props.description,
              props.piority,
              props.deadline
            );
            props.setTargetTitle(props.title);
          }}
          key="Update"
          variant="contained"
          startIcon={<DeleteIcon />}
        >
          Update
        </Button>,
        <Button
          onClick={() => {
            props.setDeleteTargetTitle(props.title);
          }}
          key="Delete"
          variant="contained"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>,
      ]);
    }
  };

  const [buttons, setButtons] = useState([
    <Button
      onClick={() => {
        props.handleUpdateClick(props.description, props.piority, props.date);
        props.setTargetTitle(props.title);
      }}
      key="Update"
      color="primary"
      variant="contained"
      startIcon={<UpdateIcon />}
    >
      Update
    </Button>,
    <Button
      onClick={() => {
        props.setDeleteTargetTitle(props.title);
      }}
      color="error"
      key="Delete"
      variant="contained"
      startIcon={<DeleteIcon />}
    >
      Delete
    </Button>,
  ]);

  return (
    <TableRow
      key={props.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="center" component="th" scope="row">
        {props.title}
      </TableCell>
      <TableCell>{props.description}</TableCell>
      <TableCell>{props.deadline}</TableCell>
      <TableCell>{props.piority}</TableCell>
      <TableCell>
        <FormControlLabel
          onChange={() => handleCompletenessChange()}
          control={<Checkbox />}
        />
      </TableCell>
      <TableCell>
        <Box
          sx={{
            display: "flex",
            "& > *": {
              m: 1,
            },
          }}
        >
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="contained"
          >
            {buttons}
          </ButtonGroup>
        </Box>
      </TableCell>
    </TableRow>
  );

  /*return (
    <div
      className="Todo"
      style={{ backgroundColor: props.completed ? "green" : "white" }}
    >
      <h1>{props.taskName}</h1>
      <button onClick={() => props.completeTask(props.id)}>completed</button>
      <button onClick={() => props.deleteTask(props.id)}>X</button>
    </div>
  ); */
};
