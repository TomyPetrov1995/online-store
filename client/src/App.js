import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import AppRoutes from "./routes/AppRoutes";
import "./styles/home.css";
import Footer from "./components/Footer/Footer";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllCategories} from "./features/Category/categorySlice";
import {getMe} from "./features/Auth/authSlice";
import {getAllBasketProduct} from "./features/Basket/basketSlice";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getAllProducts} from "./features/Products/productsSlice";
function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMe())
        dispatch(getAllCategories());
        dispatch(getAllProducts());
        dispatch(getAllBasketProduct())
    },[dispatch])
  return (
             <div className= "app">
                 <Header/>
                 <div className="container">
                     <SideBar/>
                     <AppRoutes/>
                 </div>
                 <ToastContainer position= "bottom-right"/>
                 <Footer/>
             </div>
  );
}

export default App;
