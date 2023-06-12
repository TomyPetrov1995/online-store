import {Router} from "express";
import * as authController from "../controllers/auth.js";
import {checkAuth} from "../middlewares/checkAuth.js";
import {uploads} from "../multer.js";
import createDirectory from "../middlewares/createDirectory.js";

const router = new Router();

router.post("/register",authController.register);
router.post("/login",authController.login);
router.get("/me",checkAuth,authController.check);
router.put("/me/:id",checkAuth,createDirectory("user"),uploads("user").single("avatar"),authController.updateUser);
export default router;