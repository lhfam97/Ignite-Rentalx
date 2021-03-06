import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";

import createConnection from "@shared/infra/typeorm";
import "@shared/container";

import { router } from "@shared/infra/http/routes";
import swaggerFile from "../../../swagger.json";
import { AppError } from "@shared/errors/AppError";

// import cors from "cors";
createConnection("localhost");
const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    } else {
      return response.status(500).json({
        status: "error",
        message: `Internal Server Error - ${err.message}`,
      });
    }
  }
);

// app.use(cors);
export { app };
