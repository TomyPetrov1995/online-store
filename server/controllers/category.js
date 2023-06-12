import {Category} from "../models/model.js";

export const createCategory = async (req,res) => {
    try {
        const{name} = req.body;//NAME
        const imageUrl = req.file.originalname;//IMAGE

        //FIND CURRENT CATEGORY
        const currentCategory = await Category.findOne({where :{name}});
        if (currentCategory)return res.json({message : "Категория с таким названием существует"})

        //CREATE CATEGORY
        const category = await Category.create({name,image:imageUrl});

        res.json({category})
    }catch (e) {
        console.log(e)
        return res.json({message : "Не удалось создать"})
    }
}

export const getAllCategory = async (req,res) => {
    try {
        const categories = await Category.findAll();
        return res.json({categories})
    }catch (e) {
        console.log(e)
        return res.json({message : "Не удалось найти"})
    }
}

export const getOneCategory = async (req,res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category)return res.json({message : "Не удалось найти"});

        return res.json({category})
    }catch (e) {
        console.log(e)
        return res.json({message : "Не удалось найти"})
    }
}