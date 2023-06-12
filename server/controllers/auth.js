import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {Basket, User} from "../models/model.js";

const generateToken = (id, email, role) => {
    return jwt.sign({id, email, role},
        process.env.JWT_SECRET_KEY,
        {expiresIn: "24h"})
}
export const register = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;

        //FIND CURRENT USER
        const currentUser = await User.findOne({where: {email}});
        if (currentUser) return res.json({message: "пользователь с таким email уже существует"})

        //HASH PASSWORD
        const hashPassword = bcrypt.hashSync(password, 10);

        //CREATE USER
        const user = await User.create({name, email, password: hashPassword, role});
        //CREATE BASKET
        await Basket.create({userId: user.id})

        //CREATE TOKEN
        const token = await generateToken(user.id, user.email, user.role)

        return res.json({message: "регистрация прошла успешно", token, user})
    } catch (e) {
        console.log(e);
        return res.json({message: "Пользователь не зарегистрирован"})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        //FIND USER BY EMAIL
        const user = await User.findOne({where: {email}});
        if (!user) return res.json({message: "пользователь с таким email не существует"});

        //COMPARE PASSWORD
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) return res.json({message: "Неверный пароль или логин"});

        //CREATE TOKEN
        const token = await generateToken(user.id, user.email, user.role);

        return res.json({message: "Авторизация прошла успешно", token, user})

    } catch (e) {
        console.log(e)
        return res.json({message: "Нет доступа"});
    }
}

export const check = async (req, res) => {
    try {
        const userData = await User.findOne({where: {email: req.user.email}});
        if (!userData) return res.json({message: "Нет доступа"});

        //CREATE TOKEN
        const token = await generateToken(userData.id, userData.email, userData.role);

        const {password, ...user} = userData.dataValues;

        return res.json({token, user})
    } catch (e) {
        console.log(e);
        return res.json({message: "Нет доступа"});
    }
}

export const updateUser = async (req, res) => {
    try {
        const {email, name, password, avatar} = req.body;

        //CURRENT USER
        const currentUser = await User.findOne({where: {id: req.user.id}});

        const avatarUrl = avatar ? `${currentUser.avatar}` : `${req.file?.originalname}`;
        // const passwordHsh = password ? bcrypt.hashSync(currentUser.password,10) : bcrypt.hashSync(password,10)

        //UPDATE USER
        await User.update({email, name, avatar: avatarUrl}, {where: {email: currentUser.email}, returning: true});

        //GET UPDATING USER
        const user = await User.findOne({where: {email: req.user.email}});

        return res.json({user})


    } catch (e) {
        console.log(e);
        return res.json({message: "Не удалось обновить"})

    }
}