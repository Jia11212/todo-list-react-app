import * as React from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TableRowsIcon from "@mui/icons-material/TableRows";
import AddIcon from "@mui/icons-material/Add";

export const Banner = (props) => {
  return (
    <Stack
      padding="20px"
      backgroundColor="#337ab7"
      alignItems="center"
      direction="row"
      spacing="40%"
      justifyContent="flex-end"
    >
      <Stack direction="row" alignItems="center" gap={1}>
        <TableRowsIcon className="white-text" />
        <Typography className="white-text" variant="body1">
          FRAMEWORK
        </Typography>
      </Stack>

      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={props.handleClickOpen}
      >
        Add
      </Button>
    </Stack>
  );
};
