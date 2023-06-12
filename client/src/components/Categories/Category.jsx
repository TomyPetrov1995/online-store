import React, {useEffect, useState} from 'react';
import styles from "../../styles/SingleCategoriy.module.css";
import {Link, useParams} from "react-router-dom";
import {BASE_URL} from "../../utils/constance";
import Input from "../Input/Input";

const Category = ({filteredProduct = [],category = {}}) => {
    const {id} = useParams();

    //INPUT VALUES
    const[brandValue,setBrandValue] = useState("");
    const[firstPrice,setFirstPrice] = useState();
    const[lastPrice,setLastPrice] = useState();

    const[products,setProducts] = useState([]);

    useEffect(() => {
        const sortedProducts = filteredProduct.sort((a,b) => parseInt(a.price) - parseInt(b.price))
        setProducts(sortedProducts)},[id,brandValue,firstPrice,lastPrice])

    return (
        <div className={styles.category_list}>
            {category && <div className={styles.title}>{category?.name}</div>}

            <div className={styles.filter}>
                <form onSubmit={e => {
                    e.preventDefault();
                    setProducts(products.filter(({brand,price}) => {
                        if (!brandValue && !firstPrice && !lastPrice){
                            return products
                        }
                        else if (brandValue && !firstPrice && !lastPrice){
                            return brand.name.toLowerCase() === brandValue.toLowerCase().trim()
                        }
                        else if (brandValue && firstPrice && !lastPrice){
                            return brand.name.toLowerCase() === brandValue.toLowerCase().trim() && price > firstPrice
                        }
                        else if (brandValue && !firstPrice && lastPrice){
                            return brand.name.toLowerCase() === brandValue.toLowerCase().trim() && price < lastPrice
                        }
                        else if (brandValue && firstPrice && lastPrice){
                            return brand.name.toLowerCase() === brandValue.toLowerCase().trim() && price > firstPrice && price < lastPrice
                        }
                        else if (!brandValue && firstPrice && lastPrice){
                            return price > firstPrice && price < lastPrice
                        }
                        else if (!brandValue && !firstPrice && lastPrice){
                            return  price < lastPrice
                        }
                        else if (!brandValue && firstPrice && !lastPrice){
                            return  price > firstPrice
                        }
                    }))
                }
                }>
                    <Input className={styles.product_filter}
                           onChange={e => setBrandValue(e.target.value)}
                           value={brandValue}
                           type="text"
                           placeholder= "Product name"/>

                    <Input className={styles.product_filter}
                           onChange={e => setFirstPrice(e.target.value)}
                           value={brandValue}
                           type="text"
                           placeholder= "Price from"/>

                    <Input className={styles.product_filter}
                           onChange={e => setLastPrice(e.target.value)}
                           value={brandValue}
                           type="text"
                           placeholder= "Price to"/>
                    
                    <button className={styles.button} type= "submit">Search</button>
                </form>
            </div>

            <div className={styles.product_list}>
                {products.map(({id = "",image = "",title = "",brand = "",
                                   category = "",price = "",viewsCount = 0}) => (
                    <div key={id} className={styles.list}>
                        <Link to={`/products/${id}`} className={styles.product}>
                            <div className={styles.image} style={{backgroundImage : `url(${BASE_URL}/uploads/products/${image})`}}></div>
                        </Link>

                        <div className={styles.wrapper}>
                            <h3 className={styles.title}>{title}</h3>
                            <div className={styles.cat}>{category.name}</div>
                            <div className={styles.info}>
                                <div className={styles.prices}>
                                    <div className={styles.price}>{price}$</div>
                                    <div className={styles.oldPrice}>{Math.floor(price * 0.8)}$</div>
                                </div>

                                <div className={styles.purchases}>{viewsCount} purchased</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;