import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import TagSelect from "../components/TagSelect";
import TaskList from "../components/TaskList";
import { Box, Typography } from "@mui/material";
import { TaskContext } from "../contexts/TaskContext";

const inputStyles = {
  margin: 30,
};

function AllPage() {
  const {
    tasks,
    setTasks,
    tags,
    setTags,
    inputText,
    setInputText,
    inputDesc,
    setInputDesc,
  } = useContext(TaskContext);

  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  return (
    <Box>
      <Header />
      <Typography style={inputStyles} variant="h4" gutterBottom>
        View All Tasks!
      </Typography>
      <TaskContext.Provider
        value={{
          tasks,
          setTasks,
          tags,
          setTags,
          inputText,
          setInputText,
          inputDesc,
          setInputDesc,
          filteredTasks,
          setFilteredTasks,
        }}
      >
        <TagSelect initialTasks={tasks} />
        <TaskList />
      </TaskContext.Provider>
    </Box>
  );
}

export default AllPage;