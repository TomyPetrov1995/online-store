import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from "../../styles/Profile.module.css";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../../features/Auth/authSlice";
import {BASE_URL} from "../../utils/constance";
import Input from "../Input/Input";


const Profile = () => {
    const dispatch = useDispatch();
    const{user,token} = useSelector(state => state.auth);

    const[values,setValues] = useState({email:"",name : "", password : '',
        avatar : ""})

    useEffect(() => {
        setValues({email: user?.email,password: "",name: user?.name,avatar: user?.avatar});
        },[user,token]);

    const handleUpdateProfile = useCallback(() => {

        const formData = new FormData();
        formData.append("email",values?.email);
        formData.append("name",values?.name);
        formData.append("password",values?.password || "");
        formData.append("avatar",values?.avatar)

        dispatch(updateUser({id: user.id,values})).then(resp => {
            console.log(resp)
        })
    },[values.email,values.name,values.password,values.avatar])
    return (
        <div className={styles.profile}>

                    <div className={styles.profile_list}>
                        <form onSubmit={e => {
                            e.preventDefault();
                            // dispatch(updateUser({id:user.id,values}))
                            handleUpdateProfile()
                        }}>
                            {/*EMAIL*/}
                            <div className={styles.profile_item}>
                                <label htmlFor = "email">Your Email</label>
                                <Input type= "email"
                                       name= "email"
                                       placeholder= "Email"
                                       className= {styles.form}
                                       autoComplete= "off"
                                       defaultValue={values.email}
                                       onChange={e => setValues({...values,email : e.target.value})}/>
                            </div>

                            {/*NAME*/}
                            <div className={styles.profile_item}>
                                <label htmlFor = "name">Your Name</label>
                                <Input type= "text"
                                       name= "name"
                                       placeholder= "Name"
                                       className= {styles.form}
                                       autoComplete= "off"
                                       defaultValue={values.name}
                                       onChange={e => setValues({...values,name : e.target.value})}/>
                            </div>

                            {/*PASSWORD*/}
                            <div className={styles.profile_item}>
                                <label htmlFor = "password">Your Password</label>
                                <Input type= "password"
                                       name= "password"
                                       placeholder= "Password"
                                       className= {styles.form}
                                       autoComplete= "off"
                                       defaultValue={values.password}
                                       onChange={e => setValues({...values,password : e.target.value})}/>
                            </div>

                            {/*AVATAR*/}
                            <div className={styles.profile_item}>
                                <label htmlFor = "avatar">Your Avatar</label>
                                <div className={styles.form}>
                                    <input
                                            onChange={e => setValues({...values,avatar : e.target?.files[0]})}
                                            defaultValue = {values?.avatar}
                                            type="file"
                                            autoComplete= "off"
                                            id= "avatar"
                                            name= "avatar"
                                            accept="image/png, .jpeg, .jpg, image/gif"
                                           />
                                </div>
                            </div>

                            <button type="submit" className={styles.profile_sutton}>UPDATE</button>
                        </form>
                    </div>

        </div>
    );
};

export default Profile;