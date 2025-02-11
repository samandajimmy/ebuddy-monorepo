import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
  res.send('Hello!!');
});

app.use("/api", userRoutes);

export default app;
