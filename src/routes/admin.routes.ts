import { Router } from "express";
import AdminController from "../controllers/AdminController";

const adminRouter = Router();

adminRouter.get("/", AdminController.index);
adminRouter.post("/", AdminController.store);

export default adminRouter;
