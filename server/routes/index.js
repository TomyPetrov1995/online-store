import {Router} from "express";
import authRouter from "./auth.js";
import categoryRouter from "./category.js";
import brandRouter from "./brand.js";
import productRouter from "./product.js";
import basketDeviceRouter from "./basketDevice.js"

const router = new Router();

router.use("/auth",authRouter);
router.use("/categories",categoryRouter);
router.use("/brands",brandRouter);
router.use("/products",productRouter);
router.use("/basket",basketDeviceRouter);

export default router;