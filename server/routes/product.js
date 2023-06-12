import {Router} from "express";
import * as productController from "../controllers/product.js";
import {checkAuth} from "../middlewares/checkAuth.js";
import {checkRole} from "../middlewares/checkRole.js";
import createDirectory from "../middlewares/createDirectory.js";
import {uploads} from "../multer.js";

const router = new Router();

router.post("/",checkAuth,createDirectory("products"),uploads("products").single("image"),productController.createProduct);
router.get("/",productController.getAllProduct);
router.get("/:id",productController.getOneProduct)

export default router;