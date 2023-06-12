import {Sequelize} from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME,process.env.USER_NAME,process.env.DB_PASSWORD,
    {
        host :"localhost",
        dialect :"mysql",
        define :{
            timestamps:true
        }
    });
export default sequelize;

