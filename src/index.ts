import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import { connectDatabase, sequelize } from "./database/config";
import Measure from './models/measure.model';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/", routes);

const startServer = async () => {
  try {
    await connectDatabase();

    await Measure.sync({ alter: true });

    app.listen(port, () => {
      console.log("Servidor rodando na porta:", port);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
};

// Start the server
startServer();
