import React, {useEffect, useState} from 'react';
import styles from "../../styles/Cart.module.css"
import {BASE_URL} from "../../utils/constance";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changeQuantityBasketProduct, deleteBasketDevice} from "../../features/Basket/basketSlice";
const Cart = () => {
    const dispatch = useDispatch();
    const {basketList,basketProduct} = useSelector(state => state.basket);
    const [value,setValue] = useState();
    const [values,setValues] = useState([])

    useEffect(() => {
        if (basketList.length){
            const totalPrice = basketList.reduce((acc,curr) => {
                return acc + curr.allPrice
            },0);
            setValue(totalPrice);
        }

        setValues(basketList)
    },[basketList,basketProduct]);

    return (
        <>
            <div className={styles.cart}>
                <div className={styles.cart_title}>Your cart</div>
                <section className={styles.cart_list}>
                    <div className={styles.scroll}>
                        {values.map(({id,quantity,product,allPrice,product:{title = "",image = "",category = "",price = 0}}) => (
                            <div key={id}  className={styles.cart_item}>
                                <Link className={styles.link} to= {`/products/${product.id}`}>
                                    <div style={{backgroundImage : `url(${BASE_URL}/uploads/products/${image})`}} className={styles.product_image}></div>
                                    <div className={styles.product_info}>
                                        <div className={styles.product_title}>{title}</div>
                                        <div className={styles.product_category}>{category.name}</div>
                                    </div>
                                </Link>

                                <div className={styles.product_price}>{price}$</div>
                                <div className={styles.product_count}>
                                    <button onClick={() => {
                                        if (quantity < 2) return
                                        dispatch(changeQuantityBasketProduct({product,quantity:quantity - 1}))
                                    }
                                    }
                                        className={styles.decrement}>-</button>
                                    <div className={styles.num}>{quantity}</div>
                                    <button onClick={() => dispatch(changeQuantityBasketProduct({product,quantity : quantity + 1}))}
                                        className={styles.increment}>+</button>
                                </div>
                                {allPrice ? (<div className={styles.count_price}>{allPrice}$</div>)
                                : (<div className={styles.count_price}>{price}$</div>)}


                                <button onClick={()=> {dispatch(deleteBasketDevice(id))}} className={styles.product_remove}>x</button>
                            </div>
                        ))}
                    </div>
                </section>

                <div className={styles.cart_footer}>
                    <div className={styles.total_price}>TOTAL PRICE: <span> {value}$</span> </div>
                    <Link className={styles.check} to= "/check">Proceed to checkout</Link>
                </div>
            </div>
            {/*<Products products = {productList}  amount={5} title= "Worth seeing"/>*/}
        </>

    );
};

export default Cart;