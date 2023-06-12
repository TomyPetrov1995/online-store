import express from "express";
import "dotenv/config";
import cors from "cors";
import router from "./routes/index.js";
import sequelize from "./db.js";

const app = express();
const PORT = process.env.PORT || 5001;

//MIDDLEWARES
app.use(express.json());
app.use(cors());

//ROUTES
app.use("/api",router);
app.use("/api/uploads/categories",express.static("uploads/categories"));
app.use("/api/uploads/products",express.static("uploads/products"));
app.use("/api/uploads/user",express.static("uploads/user"));

const start = async () => {
    await sequelize.authenticate();
    await sequelize.sync().then(() => console.log("DB ok"))
    await app.listen(PORT,e => {
        if (e) throw e.message;
        console.log(`Server started on ${PORT}`);
    })
};

start();