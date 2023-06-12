import sequelize from "../db.js";
import {DataTypes} from "sequelize";

export const User = sequelize.define("user",
    {
        id:{type :DataTypes.INTEGER,autoIncrement:true,primaryKey:true,allowNull:false},
        name:{type:DataTypes.STRING,required:true,allowNull: false},
        email:{type:DataTypes.STRING,required: true,isEmail:true,allowNull:false,unique :true},
        password:{type:DataTypes.STRING,required:true,allowNull:false},
        avatar:{type:DataTypes.STRING,defaultValue: ""},
        role:{type:DataTypes.STRING,defaultValue: "User"}
    });

export const Basket = sequelize.define("basket",
    {
        id :{type:DataTypes.INTEGER,autoIncrement :true,primaryKey :true,allowNull :false},
    });

export const BasketDevice = sequelize.define("basket-device",{
    id :{type:DataTypes.INTEGER,autoIncrement :true,primaryKey :true,allowNull :false},
    quantity:{type:DataTypes.INTEGER,defaultValue :1},
    allPrice:{type:DataTypes.INTEGER},
})

export const Brand = sequelize.define("brand",
    {
        id:{type :DataTypes.INTEGER,autoIncrement :true,allowNull:false,primaryKey:true},
        name:{type:DataTypes.STRING,allowNull:false,unique:true,required:true},
    });

export const Category = sequelize.define("category",
    {
        id:{type :DataTypes.INTEGER,autoIncrement :true,allowNull:false,primaryKey:true},
        name:{type:DataTypes.STRING,allowNull:false,unique:true,required:true},
        image:{type:DataTypes.STRING,allowNull:false,required: true}
    });

export const Product = sequelize.define("product",
    {
        id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true,allowNull:false},
        title:{type:DataTypes.STRING,required:true,allowNull: false},
        price:{type:DataTypes.INTEGER,required: true,allowNull:false},
        description:{type:DataTypes.STRING(10240),required:true,allowNull:false},
        image:{type:DataTypes.STRING,allowNull:false,required:true},
        viewsCount:{type :DataTypes.INTEGER,defaultValue:0},

    });

export const CategoryBrand = sequelize.define("category_brand",
    {
        id:{type :DataTypes.INTEGER,autoIncrement :true,allowNull:false,primaryKey:true}
    });

export const ProductInfo = sequelize.define("product_info",
    {
        id:{type :DataTypes.INTEGER,autoIncrement :true,allowNull:false,primaryKey:true},
        title:{type:DataTypes.STRING,required:true,allowNull: false},
        description:{type:DataTypes.STRING(10240),required:true,allowNull:false},
    });


User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Category.hasMany(Product);
Product.belongsTo(Category);

Brand.hasMany(Product);
Product.belongsTo(Brand);

Product.hasMany(ProductInfo,{as : "info"});
ProductInfo.belongsTo(Product);

Product.hasMany(BasketDevice);
BasketDevice.belongsTo(Product);

Category.belongsToMany(Brand,{through : CategoryBrand});
Brand.belongsToMany(Category,{through : CategoryBrand});

