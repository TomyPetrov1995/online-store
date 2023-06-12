import React, {useEffect, useState} from 'react';
import styles from "../../styles/User.module.css";
import Products from "../Products/Products";
import Categories from "../Categories/Categories";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../features/Auth/authSlice";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Input from "../Input/Input";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[values,setValues] = useState({email:"",password:"",name:""});

    const {token,status} = useSelector(state => state.auth);
    useEffect(() => {
        if (token) {
            navigate("/")
        }
        if (status){
            toast(status)
        }
    },[token,status])
    return (
        <>
            <div className={styles.auth}>
                <div className={styles.register_page}>
                    <div className={styles.register}>
                        <div className={styles.title}>Register</div>
                        <form onSubmit={e => {
                        e.preventDefault();
                        dispatch(registerUser(values));
                        setValues({email:"",password:"",name:""})
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
                            <Input  type= "text"
                                    className={styles.form}
                                    defaultValue={values.name}
                                    name="Name"
                                    required
                                    autoComplete= "off"
                                    placeholder= "Name"
                                    onChange={e => setValues({...values,name: e.target.value})}
                            />

                            <button type="submit" className={styles.button}>Create an account</button>
                        </form>


                    </div>
                </div>
            </div>
            <Products  amount={5} title= "Worth seeing"/>
            <Categories amount = {5} title = "Trending"/>
        </>
    );
};

export default Register;