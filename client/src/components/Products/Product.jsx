import React, {useEffect, useState} from 'react';
import styles from "../../styles/Product.module.css";
import {Link, useParams} from "react-router-dom";
import IMAGE from "../../images/image 5.png";
import {BASE_URL} from "../../utils/constance";
import {addProductToBasket, getAllBasketProduct} from "../../features/Basket/basketSlice";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

const size = ["4,5","5","5.5"]
const Product = ({product = ""}) => {
    const dispatch = useDispatch();
    const{id} = useParams();

    const {token} = useSelector(state => state.auth);
    const{ basketProduct } = useSelector(state => state.basket);

    useEffect(() => {dispatch(getAllBasketProduct())},[basketProduct,dispatch]);

    return (

            <div className={styles.product}>
                <div className={styles.left_product}>
                    <div className={styles.left_product_image} style={{backgroundImage : `url(${BASE_URL}/uploads/products/${product?.image})`}}>
                    </div>
                    <div className={styles.product_images}>
                            <div>
                                <img className={styles.image} src={IMAGE} alt="image"/>
                            </div>
                    </div>
                </div>

                <div className={styles.right_product}>
                    <div className={styles.product_name}>{product.title}</div>
                    <div className={styles.product_price}>{product.price}$</div>
                    <div className={styles.product_color}>
                        <div className={styles.color}>Color:</div>
                        <div className={styles.color_name}>Blanch</div>
                    </div>
                    <div className={styles.product_size}>
                        <div className={styles.size}>Sizes:</div>
                        <div className={styles.size_number_list}>
                            {
                                size.map(num => (
                                    <Link key={num}>
                                        <div className={styles.size_number}>{num}</div>
                                    </Link>
                                ))
                            }

                        </div>
                    </div>
                    <div className={styles.product_description}>{product.description.slice(0,30)} ...</div>
                    <div className={styles.button_list}>

                        {token ? (
                            <button onClick={() => {
                                dispatch(addProductToBasket(product));
                            }}
                                    className={styles.cart}>Add to cart</button>
                        ) : (
                            <button disabled className={styles.disable}>Add to cart</button>
                        )}
                        {token ? (<button className={styles.favorites}>Add to favorites</button>)
                        : (<button className={styles.disable}>Add to favorites</button>)}

                    </div>

                    <div className={styles.footer}>
                        <p className={styles.footer_left}>{product?.viewsCount} people purchased</p>
                        <Link>
                            <p className={styles.footer_right}>Find in a store</p>
                        </Link>
                    </div>
                </div>

            </div>

    );
};

export default Product;