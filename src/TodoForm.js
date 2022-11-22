import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";

import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import UpdateIcon from "@mui/icons-material/Update";
import AddIcon from "@mui/icons-material/Add";

export const TodoForm = (props) => {
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle className="blueBackground" color="white">
          {props.mode === "add" ? (
            <Box backgroundColor="primary">
              <Stack direction="row" alignItems="center" gap={1}>
                <AddIcon />
                <Typography variant="body1">Add Task</Typography>
              </Stack>
            </Box>
          ) : (
            <Box backgroundColor="primary">
              <Stack direction="row" alignItems="center" gap={1}>
                <UpdateIcon />
                <Typography variant="body1">Update Task</Typography>
              </Stack>
            </Box>
          )}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            {props.mode === "add" ? (
              <TextField
                error={props.errorTitle ? true : false}
                helperText={
                  props.errorTitle ? "Title must not repeat or be empty" : ""
                }
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  console.log(e.target.value);
                  props.setTitle(e.target.value);
                }}
              />
            ) : (
              <></>
            )}

            <TextField
              error={props.errorDescription ? true : false}
              helperText={
                props.errorDescription ? "Description must not be empty" : ""
              }
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                console.log(e.target.value);
                props.setDescription(e.target.value);
              }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Deadline"
                value={props.deadline}
                onChange={(e) => {
                  console.log(e.month() + 1 + "/" + e.date() + "/" + e.year());
                  props.setDeadline(
                    e.month() + 1 + "/" + e.date() + "/" + e.year()
                  );
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Piority
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e) => {
                  console.log(e.target.value);
                  props.setPiority(e.target.value);
                }}
              >
                <FormControlLabel value="low" control={<Radio />} label="low" />
                <FormControlLabel value="med" control={<Radio />} label="med" />
                <FormControlLabel
                  value="high"
                  control={<Radio />}
                  label="high"
                />
              </RadioGroup>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            startIcon={<AddIcon />}
            color="primary"
            variant="contained"
            onClick={() =>
              props.mode === "add"
                ? props.handleSubmit()
                : props.handleSubmitUpdate()
            }
          >
            {props.mode === "add" ? "Add" : "Update"}
          </Button>

          <Button
            variant="contained"
            color="error"
            startIcon={<CancelIcon />}
            onClick={() => props.handleClose()}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
