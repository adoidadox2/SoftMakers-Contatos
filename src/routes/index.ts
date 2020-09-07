import { Router, Request, Response } from "express";
import adminRouter from "./admin.routes";
import sessionRouter from "./session.routes";
import userRouter from "./user.routes";

const routes = Router();

routes.get("/", (request: Request, response: Response) => {
  console.log({
    Author: "Augusto Vinicius",
    Github: "https://github.com/adoidadox2",
    Project: "SoftMakers-Contatos",
    Version: "1.0.0",
    Status: "Online",
  });

  response.redirect("/user");
});

routes.use("/admin", adminRouter);
routes.use("/session", sessionRouter);
routes.use("/user", userRouter);

export default routes;
