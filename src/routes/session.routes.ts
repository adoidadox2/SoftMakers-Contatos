import { Router } from "express";

import SessionController from "../controllers/SessionController";

const sessionRouter = Router();

sessionRouter.get("/", SessionController.index);
sessionRouter.post("/", SessionController.store);

export default sessionRouter;
