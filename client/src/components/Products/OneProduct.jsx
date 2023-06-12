import React from 'react';
import styles from "../../styles/Products.module.css";
import {Link} from "react-router-dom";
import {BASE_URL} from "../../utils/constance";

const OneProduct = ({product}) => {
    const {id,image,title,category,price,viewsCount} = product;

    return (
        <div key={id} className={styles.list}>
            <Link to={`/products/${id}`} className={styles.product}>
                <div className={styles.image} style={{backgroundImage : `url(${BASE_URL}/uploads/products/${image})`}}></div>
            </Link>

            <div className={styles.wrapper}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.cat}>{category?.name}</div>
                <div className={styles.info}>
                    <div className={styles.prices}>
                        <div className={styles.price}>{price}$</div>
                        <div className={styles.oldPrice}>
                            {Math.floor(price * 0.8)}$
                        </div>
                    </div>

                    <div className={styles.purchases}>
                        {viewsCount} purchased
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OneProduct;