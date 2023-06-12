import React, {useEffect, useMemo, useState} from 'react';
import styles from "../../styles/Products.module.css";
import OneProduct from "./OneProduct";

const Products = ({products = [],title = ""}) => {
    const [limit,setLimit] = useState(5);
    const filteredProduct =  products.filter((_,index) => index < limit);
    const [values,setValues] = useState([]);

    useEffect(() => {
        if (filteredProduct.length > 0)
        setValues(filteredProduct)
    },[products,limit])
    return (

            <section className={styles.products}>
                {title && (<div className= {styles.list_title}>{title}</div>)}

                <div className= {styles.products_list}>
                    {values.map((product = {}) => (
                        <OneProduct key = {product.id} product={product}/>
                    ))}
                </div>

                {limit >= products.length ? (""):
                    (   <button onClick={() => {setLimit(limit + 5)}} className= {styles.button}>See more</button>
                    )}

            </section>


    );
};

export default React.memo(Products);



