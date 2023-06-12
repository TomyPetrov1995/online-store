import {Router} from "express";
import * as brandController from "../controllers/brand.js";
import {checkAuth} from "../middlewares/checkAuth.js";
import {checkRole} from "../middlewares/checkRole.js";

const router = new Router();

router.post("/",checkAuth,brandController.createBrand);
router.get("/",brandController.getAllBrand);
router.get("/:id",brandController.getOneBrand)

export default router;