import express, {json } from "express"
import { routes } from "./routes";
import { globalErrorHandler } from "@shared/middlewares/GlobalErrorHandler";


const app = express();

app.use(json());

app.use(routes);

app.use(globalErrorHandler)

export { app }