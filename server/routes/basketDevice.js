import {Router} from "express";
import * as basketDeviceController from "../controllers/basketDevice.js";
import {checkAuth} from "../middlewares/checkAuth.js";

const router = new Router();

router.post("/",checkAuth,basketDeviceController.addProductToBasket);
router.get("/",checkAuth,basketDeviceController.getAllBasketDevices);
router.put("/",checkAuth,basketDeviceController.updateQuantityBasketDevice);
router.delete("/:id",checkAuth,basketDeviceController.deleteBasketDevice);

export default router;