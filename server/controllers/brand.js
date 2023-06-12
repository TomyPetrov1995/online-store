import {Brand,Category} from "../models/model.js";

export const createBrand = async (req,res) => {
    try {
        const{name,category} = req.body;

        const brandCategory = await Brand.findOne({where :{name}});
        if (brandCategory)return res.json({message : "Бренд с таким названием существует"})

        const brand = await Brand.create({name,categoryId:category});

        return res.json({brand})
    }catch (e) {
        console.log(e)
    }
}

export const getAllBrand = async (req,res) => {
    try {
        const brands = await Brand.findAll();

        return res.json({brands})
    }catch (e) {
        console.log(e);
        return res.json({message : "Не удалось найти"})
    }
}

export const getOneBrand = async (req,res) => {
    try {
        const brand = await Brand.findByPk(req.params.id);

        if (!brand)return res.json({message : "Не удалось найти"});

        return res.json({brand})
    }catch (e) {
        console.log(e)
        return res.json({message : "Не удалось найти"})
    }
}