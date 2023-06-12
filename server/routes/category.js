import {Router} from "express";
import * as categoryController from "../controllers/category.js";
import {checkRole} from "../middlewares/checkRole.js";
import {checkAuth} from "../middlewares/checkAuth.js";
import createDirectory from "../middlewares/createDirectory.js";
import {uploads} from "../multer.js";

const router = new Router();

router.post("/",checkAuth,createDirectory("categories"),uploads("categories").single("image"),categoryController.createCategory);
router.get("/",categoryController.getAllCategory);
router.get("/:id",categoryController.getOneCategory)

export default router;