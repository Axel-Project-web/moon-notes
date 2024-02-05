const router = require("./router/index.router");
const express = require("express");
const cors = require("cors");
const app = express();

const port = 8080;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
