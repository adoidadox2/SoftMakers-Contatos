import { Router, Request, Response } from "express";
import adminRouter from "./admin.routes";

const routes = Router();

routes.get("/", (request: Request, response: Response) => {
  return response.json({
    Author: "Augusto Vinicius",
    Github: "https://github.com/adoidadox2",
    Project: "SoftMakers-Contatos",
    Version: "1.0.0",
    Status: "Online",
  });
});

routes.use("/admin", adminRouter);

export default routes;
