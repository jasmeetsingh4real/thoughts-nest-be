import * as express from "express";
import { userRouter } from "./routes/user.routes";
import { authRouter } from "./routes/auth.routes";
const cors = require("cors");

const bodyParser = require("body-parser");
//establish database connection

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// enabling cross origin resource sharing
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    exposedHeaders: ["Set-cookie"],
  })
);
app.use(express.json());

//add your routes here

app.use("/", authRouter);

app.use("/user", userRouter);

export default app;
