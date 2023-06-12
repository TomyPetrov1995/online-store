import React from 'react';
import styles from "../../styles/SideBar.module.css";
import {Link, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const SideBar = () => {
    const {categoryList} = useSelector(state => state.category);

    return (
        <div className={styles.sidebar}>
            <div className={styles.title}>CATEGORIES</div>

            <nav>
                <ul>
                    {categoryList.map(({id = "",name = ""}) => (
                        <li key={id}>
                            <NavLink className={({isActive}) => `${styles.link} ${isActive  ? styles.active : ""}`}
                                     to={`/categories/${id}`}>{name}</NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={styles.footer}>
                <Link className={styles.footer_link} to= "/help">Help</Link>
                <Link className={styles.footer_link}to= "/help">Therm and Conditions</Link>
            </div>
        </div>
    );
};

export default SideBar;