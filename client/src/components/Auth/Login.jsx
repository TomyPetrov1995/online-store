import React, {useCallback, useEffect, useState} from 'react';
import styles from "../../styles/User.module.css";
import Products from "../Products/Products";
import Categories from "../Categories/Categories";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../features/Auth/authSlice";
import {toast} from "react-toastify";
import Input from "../Input/Input";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {token,status} = useSelector(state => state.auth)

    const[values,setValues] = useState({email : "",password :""});

    useEffect(() => {
        if (token) {
            navigate("/",{replace : true})}
        if (status){
            toast(status)
        }
        },[token,status]);

    const handleLogin = useCallback(() => {
        dispatch(login(values));
        setValues({email : "",password :""})
    },[values.email,values.password])
    return (
        <>
            <div className={styles.auth}>
                <div className={styles.register}>
                    <div className={styles.title}>Login</div>
                    <form onSubmit={e =>{
                        e.preventDefault();
                        handleLogin();
                    }
                    }>
                        <Input  type= "email"
                                className={styles.form}
                                defaultValue={values.email}
                                name="Email"
                                required
                                autoComplete= "off"
                                placeholder= "Email"
                                onChange={e => setValues({...values,email: e.target.value})}
                        />
                        <Input  type= "password"
                                className={styles.form}
                                defaultValue={values.password}
                                name="Password"
                                required
                                autoComplete= "off"
                                placeholder= "Password"
                                onChange={e => setValues({...values,password: e.target.value})}
                        />

                        <button type="submit" className={styles.button}>Log In</button>
                    </form>
                    <Link className={styles.create} to= "/register">
                        <div>Create Account</div>
                    </Link>

                </div>
            </div>
            <Products  amount={5} title= "Worth seeing"/>
            <Categories amount = {5} title = "Trending"/>
        </>

    );
};

export default Login;