import express from "express";
import routes from "./routes/routes.js";

const app = express();
const port = 3000;

app.use(express.static("views"));
app.use(express.static("assets"));
app.use('/', routes);

app.listen(port, () => {
    console.log(`El servidor está inicializado en el puerto http://localhost:${port}`);
  });