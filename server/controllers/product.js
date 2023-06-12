import {Product, Category, Brand, ProductInfo} from "../models/model.js";
import {where} from "sequelize";


export const createProduct = async (req,res) => {
    try {
        const{title,price,description,category,brand} = req.body
        const imageUrl = `${req.file.originalname}`;

        //GET CURRENT PRODUCT
        const currentProduct = await Product.findOne({where : {title:req.body.title}});
        if (currentProduct) return res.json({message : "Товар с таким названием существует"})

        const product = await Product.create({title,price,description,image:imageUrl,categoryId:category,brandId:brand});

        return res.json({product})
    }catch (e) {
        console.log(e)
    }
}

export const getAllProduct = async (req,res) => {
    try {
        const {brandId,categoryId} = req.query;

        let products;
        if (brandId && categoryId){
            products = await Product.findAll({where :{brandId,categoryId},include : [Category,Brand]});
        }else if (!brandId && !categoryId){
            products = await Product.findAll({include : [Category,Brand]});
        }
        else if (!brandId && categoryId){
            products = await Product.findAll({where :{categoryId},include : [Category,Brand]});
        }
        else if (brandId && !categoryId){
            products = await Product.findAll({where :{brandId},include : [Category,Brand]});
        }


        return res.json({products})
    }catch (e) {
        console.log(e);
        return res.json({message : "Не удалось найти"})
    }
}

export const getOneProduct = async (req,res) => {
    try {
        //FIND PRODUCT BY ID
        const product = await Product.findByPk(req.params.id,{include : [Category,Brand,{model :ProductInfo,as :"info"}]});
        //viewsCount update
        await product.update({viewsCount : product.viewsCount + 1});

        if (!product)return res.json({message : "Не удалось найти"});

        return res.json({product})

    }catch (e) {
        console.log(e);
        return res.json({message : "Не удалось найти"})
    }
}

// export const updateProduct = async (req,res) => {
//     try {
//         //FIND PRODUCT BY ID
//         const product = await Products.findByPk(req.params.id);
//         //update images
//         await product.update({images : product.viewsCount + 1});
//
//         if (!product)return res.json({message : "Не удалось найти"});
//
//         return res.json({product})
//
//     }catch (e) {
//         console.log(e);
//         return res.json({message : "Не удалось найти"})
//     }
// }