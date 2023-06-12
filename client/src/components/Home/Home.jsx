import React, {useCallback, useEffect, useMemo, useRef, useState,memo} from 'react';
import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import Categories from "../Categories/Categories";
import Banner from "../Banner/Banner";
import {useDispatch, useSelector} from "react-redux";
import {shuffle} from "underscore";
import {getAllBasketProduct} from "../../features/Basket/basketSlice";

const Home = () => {
    const dispatch = useDispatch();

    const {categoryList} = useSelector(state => state.category);
    const {productList} = useSelector(state => state.products);
    const filteredByPrice = productList.filter(({price}) => price < 100);

    useEffect(() => {dispatch(getAllBasketProduct())},[dispatch]);

    const ref = useRef(0);
    const [scroll,setScroll] = useState();
    window.addEventListener("scroll",e => {
        ref.current = e.currentTarget.scrollY;
        if (ref.current > 1000){

        }
    })

    return (
        <>
            <Poster/>
            {productList.length && (
                <Products products = {shuffle((productList))} amount={5} title= "Worth seeing"/>
            )}
            {categoryList.length && (
                <Categories categories = {shuffle(categoryList)} amount = {5} title = "Trending"/>
            )}

            <Banner/>
            <Products products={shuffle(filteredByPrice)} amount={5} title= "Less than 100$"/>

        </>
    );
};

export default Home;