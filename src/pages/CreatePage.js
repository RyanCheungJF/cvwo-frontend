import React, { useContext, useState } from "react";
import Header from "../components/Header";
import TagInput from "../components/TagInput";
import { Box, Button, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TaskContext } from "../contexts/TaskContext";
import { Navigate } from "react-router-dom";

const inputStyles = {
  margin: 30,
  width: "96.5%",
  display: "block",
};

function CreatePage() {
  const {
    userid,
    tasks,
    setTasks,
    inputText,
    setInputText,
    inputDesc,
    setInputDesc,
    inputTags,
    setInputTags,
  } = useContext(TaskContext);

  const [textError, setTextError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [adding, setAdding] = useState({
    state: false,
    text: "Add Task",
  });

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const inputDescHandler = (e) => {
    setInputDesc(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (inputText && inputDesc) {
      setAdding({ state: true, text: "Adding Task..." });
      setTasks([
        ...tasks,
        {
          name: inputText,
          desc: inputDesc,
          completed: false,
          tags: inputTags,
        },
      ]);

      await fetch(`${process.env.REACT_APP_API_KEY}api/task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userid: userid,
          name: inputText,
          desc: inputDesc,
          status: false,
          tag: inputTags,
        }),
      });

      setInputText("");
      setInputDesc("");
      setInputTags([]);
      setTextError(false);
      setDescError(false);
      setAdding({ state: false, text: "Add Task" });
    } else {
      inputText ? setTextError(false) : setTextError(true);
      inputDesc ? setDescError(false) : setDescError(true);
    }
  };

  if (userid !== -1 || userid === undefined) {
    return (
      <Box>
        <Header />
        <Typography style={inputStyles} variant="h4" gutterBottom>
          Create a new Task here!
        </Typography>
        <TextField
          style={inputStyles}
          value={inputText}
          onChange={inputTextHandler}
          label="Task Name"
          required
          fullWidth
          variant="outlined"
          placeholder="Learning React!"
          error={textError}
          helperText={textError ? "Field is required." : ""}
        />
        <TextField
          style={inputStyles}
          value={inputDesc}
          onChange={inputDescHandler}
          label="Description"
          required
          fullWidth
          variant="outlined"
          multiline
          rows={5}
          placeholder="Describe the Task!"
          error={descError}
          helperText={descError ? "Field is required." : ""}
        />
        <TagInput />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={submitHandler}
          disabled={adding.state}
        >
          {adding.text}
        </Button>
      </Box>
    );
  } else {
    return <Navigate to="/login-page" />;
  }
}

export default CreatePage;
