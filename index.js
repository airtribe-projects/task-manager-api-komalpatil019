const express = require("express");
const taskRoutes = require("./routes/tasks")

const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});