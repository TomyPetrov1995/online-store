import jwt from "jsonwebtoken";

export const checkRole = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token)return res.json({message : "Нет доступа"});

        const decoded = await jwt.verify(token,process.env.JWT_SECRET_KEY);
        if (decoded.role !== "Admin")return res.json({message : "Нет доступа"});

        req.user = decoded;
        next();
    }catch (e){
        console.log(e)
        return res.json({message : "Нет доступа"});
    }
}