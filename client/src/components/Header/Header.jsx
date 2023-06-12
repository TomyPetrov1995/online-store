import React, {useEffect, useState} from 'react';
import styles from "../../styles/Header.module.css";
import LOGO from "../../images/LOGO.svg";
import USER from "../../images/user.jpg";
import SEARCH from "../../images/Search.svg";
import LIKE from "../../images/Like.svg";
import SHOP from "../../images/Shop.svg";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth, logOut} from "../../features/Auth/authSlice";
import {BASE_URL} from "../../utils/constance";
import {getAllBasketProduct} from "../../features/Basket/basketSlice";
import {toast} from "react-toastify";

const Header = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //GET TOKEN
    const isAuth = useSelector(checkIsAuth);

    //GET USER
    const {user} = useSelector(state => state.auth);
    const{productList} = useSelector(state => state.products);
    const{basketList} = useSelector(state => state.basket);

    const[name,setName] = useState("");

    //SEARCH
    const [searchValue,setSearchValue] = useState("");
    const filteredProduct = productList.filter(({brand,title}) => title.trim().toLowerCase().includes(searchValue))
        .filter((_,i) => i < 7);
    const[searchProduct,setSearchProduct] = useState([]);


    //USER NAME
    useEffect(()=>{if (user) setName(user.name)},[user]);

    const[message,setMessage] = useState("");
    useEffect(() => {
        if (message)
            toast(message)
    },[message])
    return (
        <div className= {styles.header}>
            <div className={styles.logo}>
                <Link to= "/"
                >
                    <img src= {LOGO} alt="logo"/>
                </Link>
            </div>

            <div className={styles.user}>
                {user?.avatar ? (
                    <div className={styles.userImage} style={{backgroundImage : `url(${BASE_URL}/uploads/user/${user.avatar})`}}></div>
                ):(<div className={styles.userImage} style={{backgroundImage : `url(${USER})`}}></div>)}

                {isAuth ?
                    (<Link className={styles.link} to={`/profile`}>{name}</Link>) : ""}
            </div>

            <div className={styles.search}>
                <form onSubmit={e => {
                    e.preventDefault();

                }}>
                    <img src={SEARCH} alt="search"/>
                    <input onChange={e => {
                            setSearchValue(e.target.value.toLowerCase());
                            setSearchProduct(filteredProduct)
                    }}
                           type="search"
                           autoComplete= "off"
                           placeholder= "Search for anything ..."
                           name= "search"
                           value={searchValue}
                    />

                    {searchValue ? (
                        <div className={styles.search_block}>
                            {searchProduct.map(({brand = "",title = "",id = 0,image = ""}) => (
                                <Link key={id}
                                      onClick={() => {
                                      setSearchValue("");
                                      }
                                      }
                                      to= {`/products/${id}`}>
                                    <div className={styles.search_product}>
                                        <img src={`${BASE_URL}/uploads/products/${image}`} alt="image"/>
                                        <p>{title}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ):""}
                </form>


            </div>

            {isAuth ? (
                <div className= {styles.shopIcons}>
                    <Link to= "/like">
                        <div className={styles.like} style={{backgroundImage : `url(${LIKE})`}}></div>
                    </Link>
                    <Link to= "/cart">
                        <div className={styles.shop} style={{backgroundImage : `url(${SHOP})`}}>
                            <div className={styles.group}><p>{basketList?.length}</p></div>
                        </div>
                    </Link>

                </div>
            ): (
                <div className={styles}>
                    <Link to= "/auth">
                        <div className={styles.signIn}>Sign In</div>
                    </Link>
                </div>
            )}

            {isAuth &&
                (
                    <div className={styles.logOut}>
                        <button onClick={() => {
                            dispatch(logOut());
                            setMessage("Вы вышли из системы")
                            navigate("/");
                            window.localStorage.removeItem("token")
                        }
                        }>Log out</button>
                    </div>
                )}
        </div>
    );
};

export default Header;