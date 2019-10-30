import "@babel/polyfill";
import express from "express";
import { tokenMarket } from "./routes";

const app = express();
const port = process.env.PORT || 4000;

app.use('/api/v1', tokenMarket);
app.listen(port, () => console.log(`Running on localhost:${port}`));

