import { Router } from "express";

import UserController from "../controllers/UserController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import multer from "multer";
import multerConfig from "../config/multerConfig";

const userRouter = Router();
const upload = multer(multerConfig);

userRouter.use(ensureAuthenticated);

userRouter.get("/", UserController.index);
userRouter.post("/", upload.single("avatar"), UserController.store);
userRouter.get("/:id", UserController.show);
userRouter.put("/:id", UserController.update);
userRouter.delete("/:id", UserController.delete);

export default userRouter;
