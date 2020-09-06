import "reflect-metadata";
import "dotenv/config";
import "./database";

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import path from "path";

import helmet from "helmet";
import cors from "cors";

import routes from "./routes";

import AppError from "./errors/AppError";

class App {
  public server: express.Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.views();
    this.routes();
    this.exception();
  }
  private middlewares(): void {
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(express.json());
  }
  private views(): void {
    this.server.set("view engine", "ejs");
    this.server.set("views", path.join(__dirname, "/src"));
  }
  private routes(): void {
    this.server.use(routes);
    this.server.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );
  }
  private exception(): void {
    this.server.use(
      async (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof AppError) {
          return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
          });
        }

        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    );
  }
}

export default new App().server;
