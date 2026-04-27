import express from "express";
import taskRoutes from "./routes/tasks.js";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});