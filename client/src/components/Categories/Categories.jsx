import React, {useEffect, useState} from 'react';
import styles from "../../styles/Categories.module.css";
import {Link} from "react-router-dom";
import {BASE_URL} from "../../utils/constance";
import underScore, {shuffle} from "underscore";
const Categories = ({categories = [],title}) => {

    const filterCategories = shuffle(categories.filter((_,i) => i < 5));

    return (
        <section className= {styles.categories}>
            {title && (<div className= {styles.categories_title}>{title}</div>)}

            <div className={styles.list}>
                {
                    filterCategories.map(({id = "",name = "",image = ""},index) => (

                        <div  key={id} className={styles.category}>
                            <Link className={styles.product} to={`/categories/${id}`}>
                                <div style={{backgroundImage : `url(${BASE_URL}/uploads/categories/${image})`}} className={styles.image} ></div>
                            </Link>
                            <div className={styles.category_name}>{name}</div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default Categories;