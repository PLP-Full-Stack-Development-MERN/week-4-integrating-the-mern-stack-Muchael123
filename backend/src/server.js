import express from "express";
import connectDB from "../src/config/db.js";
import cors from 'cors'
import taskRoutes from '../src/routes/task.route.js'

connectDB();
const apiRoute = "/api/v1"

const app = express();

app.use(cors());
app.use(express.json());

app.use(`${apiRoute}/tasks`, taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));