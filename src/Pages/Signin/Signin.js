import styles from './Signin.module.scss'
import React, { useState, useContext } from 'react';
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../Contexts/AuthContext'
import Cookies from "js-cookie";
import Axios from "axios"

function Signin() {
    const navigate = useNavigate()
    const { setAuthuser } = useContext(AuthContext);

    const [user, setUser] = useState({
        email: "",
        password: "",
        islogged: true,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    Axios.defaults.withCredentials = true;

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            Axios.post("http://localhost:8080/users/login", user)
                .then((response) => {
                    if (response.data.status === 1) {
                        const token = response.data.token;
                        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        Cookies.set("authToken", token);
                        const firstName = response.data.user.firstname;
                        const lastName = response.data.user.lastname;
                        const userType = response.data.user.usertype;
                        const accessLevel = response.data.user.accesslevel;
                        const email = response.data.user.email;

                        toast.success("Seja bem-vindo(a), " + firstName + "!");
                        setAuthuser({
                            token,
                            firstname: firstName,
                            lastname: lastName,
                            usertype: userType,
                            accesslevel: accessLevel,
                            email: email,
                            id: response.data.user.id,
                            image: response.data.user.image,
                        });
                        
                        navigate('/');
                    } else {
                        toast.warn(response.data.message);
                    }
                }).catch(error => {
                    toast.warn("Erro ao logar!");
                });
        } catch (err) {
            toast.warn('Ocorreu um erro ao logar! ' + err)
        }
    };

    return (
        <section className={styles.container}>
            <div className={styles.contentcontainer}>
                <div className={styles.titleContainer}>
                    <h1>Faça seu login</h1>
                </div>
                <div className={styles.formcontainer}>

                    <form onSubmit={handleSubmit}>

                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password">Senha</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={user.password}
                                onChange={handleChange}
                            />
                        </div>

                        <button className={styles.submitButton} type="submit">Entrar</button>
                    </form>

                </div>
            </div>
        </section>
    )
}

export default Signin