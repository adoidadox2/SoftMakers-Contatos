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
userRouter.get("/:userId", UserController.show);
userRouter.put("/:userId", upload.single("avatar"), UserController.update);
userRouter.delete("/:userId", UserController.delete);

export default userRouter;
