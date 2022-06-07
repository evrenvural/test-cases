import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { connectWithDatabase } from "./src/config";
import routes from "./src/route";

const app = express();

app.use(cors());

connectWithDatabase();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", routes);

app.listen(process.env.PORT || 8000);

export default app;
