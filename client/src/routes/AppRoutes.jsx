import React from 'react';
import {Routes,Route} from "react-router-dom";
import Home from "../components/Home/Home";
import SingleProduct from "../components/Products/SingleProduct";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Cart from "../components/Cart/Cart";
import SingleCategories from "../components/Categories/SingleCategories";
import Profile from "../components/Profile/Profile";

const AppRoutes = () => {


    return (
            <Routes>
                <Route path= "/" element={<Home/>}/>
                <Route path= "/products/:id" element={<SingleProduct/>}/>
                <Route path= "/auth" element={<Login/>}/>
                <Route path= "/register" element={<Register/>}/>
                <Route path= "/cart" element={<Cart/>}/>
                <Route path= "/categories/:id" element={<SingleCategories/>}/>
                <Route path= "/profile" element={<Profile/>}/>
                <Route path= "*" element={<Home/>}/>
            </Routes>
    );
};

export default AppRoutes;