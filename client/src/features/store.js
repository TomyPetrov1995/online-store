import {configureStore} from "@reduxjs/toolkit";
import categorySlice from "./Category/categorySlice";
import productsSlice from "././Products/productsSlice";
import authSlice from "./Auth/authSlice";
import basketSlice from "./Basket/basketSlice";
import productSlice from "./Product/productSlice";

const store = configureStore({
    reducer :{
        category : categorySlice,
        products : productsSlice,
        product : productSlice,
        auth : authSlice,
        basket : basketSlice
    }
});

export default store;