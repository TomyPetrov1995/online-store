import {Basket, BasketDevice, Brand, Category, Product} from "../models/model.js";

export const addProductToBasket = async (req,res) => {
    try{
        //GET CURRENT BASKET
        const basket = await Basket.findOne({where : {userId:req.user.id}});

        // //GET CURRENT BASKET DEVICE BY PRODUCT ID
        const currentBasketDevice = await BasketDevice.findOne({where : {productId : req.body.id,basketId:basket.id}});

        if (currentBasketDevice) return res.json({currentBasketDevice,message : "Товар уже добавлен в корзину"})

        // CREATE BASKET DEVICE
        const basketDevice = await BasketDevice.create({productId : req.body.id,basketId:basket.id});
        return res.json({basketDevice,message : "Товар добавлен в корзину"})

    }catch (e){
        console.log(e);
        return res.json({message : "Товар не добавлен в корзину"})
    }
}
export const getAllBasketDevices = async (req,res) => {
    try{
        //GET CURRENT BASKET
        const basket = await Basket.findOne({where : {userId:req.user.id}});
        //GET ALL BASKET DEVICES
        const basketDevices = await BasketDevice.findAll({where: {basketId:basket.id},
            include : [Basket,{model : Product,as : "product",
                include :[{model : Category,as : "category"},{model : Brand, as : "brand"}],
                }]});
        return res.json({basketDevices})


    }catch (e){
        console.log(e);
        return res.json({message : "Пустая корзина"})
    }
}

export const updateQuantityBasketDevice = async (req,res) => {
    try {
        //GET CURRENT BASKET PRODUCT
        const product = await BasketDevice.findOne({where : {productId:req.body.product.id},include : [{model : Product,as : "product"}]});

        //UPDATE BASKET
        //allPrice : product.product.price * req.body.quantity


        await BasketDevice.update({quantity: req.body.quantity,allPrice : product.product.price * req.body.quantity},{where :{productId:product.product.id}})

        const products = await BasketDevice.findAll({where : {basketId:product.basketId},
            include : [Basket,{model : Product,as : "product",
                include :[{model : Category,as : "category"},{model : Brand, as : "brand"}],
            }]})

        return res.json({products})

    }catch (e) {
        console.log(e);
        return res.json({message : "Не удалось обновить количество"})
    }
}

export const deleteBasketDevice = async (req,res) => {
    try {
        await BasketDevice.destroy({where : {id : req.params.id}});
        const basketDevices = await BasketDevice.findAll({
            include : [Basket,{model : Product,as : "product",
                include :[{model : Category,as : "category"},{model : Brand, as : "brand"}],
            }]});
        return res.json({basketDevices})
    }catch (e){
        console.log(e)
    }
}