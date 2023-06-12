import React, {useEffect, useState} from 'react';
import Products from "./Products";
import Product from "./Product";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getOneProduct} from "../../features/Product/productSlice";
const SingleProduct = () => {
    const dispatch = useDispatch();
    const {id}= useParams();

    useEffect(() => {dispatch(getOneProduct(id))},[id,dispatch]);

    const {productList} = useSelector(state => state.products);
    const {product} = useSelector(state => state.product);
    const [value,setValue] = useState([]);

    const filteredProduct = productList.filter(({id,category,brand}) => id !== product?.id && category?.name === product?.category?.name
        && brand?.name === product?.brand?.name)

    useEffect(() => {setValue(filteredProduct)},[product])

    return (
        <>
            {product && (
                <Product product = {product}/>
            )}
            <Products products={value}/>
        </>
    );
};

export default SingleProduct;