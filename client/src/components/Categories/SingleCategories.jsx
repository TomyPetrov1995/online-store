import React from 'react';
import Poster from "../Poster/Poster";
import { useSelector} from "react-redux";
import Category from "./Category";
import {useParams} from "react-router-dom";
const SingleCategories = () => {
    const {id} = useParams();
    //ALL PRODUCTS
    const {productList} = useSelector(state => state.products);
    const {categoryList} = useSelector(state => state.category);

    //FILTER PRODUCTS BY CATEGORY ID
    const filteredProducts = productList.filter(({category}) => category?.id.toString() === id);

    //GET CATEGORY BY ID
    const category = categoryList.find((item) => item.id.toString() === id);

    return (
        <>
            <Poster/>
            {filteredProducts && (<Category filteredProduct = {filteredProducts} category = {category}/>)}
        </>
    );
};

export default SingleCategories;