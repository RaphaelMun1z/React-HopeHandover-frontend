import styles from './Profile.module.scss'
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../Contexts/AuthContext'
import { toast } from "react-toastify";
import Axios from "axios"
import Cookies from "js-cookie";

function Profile() {
    const navigate = useNavigate()
    const { authuser, setAuthuser } = useContext(AuthContext)

    const usertype = authuser.usertype;

    const [user, setUser] = useState({
        firstname: authuser.firstname,
        lastname: authuser.lastname,
        email: authuser.email,
        password: "",
        newpassword: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    Axios.defaults.withCredentials = true;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user.firstname) {
            alert("Por favor, informe seu nome.");
            return;
        }

        if (!user.lastname && usertype === 1) {
            alert("Por favor, informe seu sobrenome.");
            return;
        }

        if (!user.email) {
            alert("Por favor, informe um e-mail.");
            return;
        }

        if (!user.password) {
            alert("Por favor, informe sua atual senha.");
            return;
        }

        if (!user.newpassword) {
            alert("Por favor, informe sua nova senha.");
            return;
        }

        try {
            const response = await Axios.patch(`http://localhost:8080/users/${authuser.id}`, user);

            if (response.status === 200) {
                toast.success('Seu perfil foi atualizado com sucesso! Realize o login novamente.');
                handleLogout()
            } else {
                toast.warn('Erro ao atualizar!');
            }
        } catch (error) {
            toast.warn('Erro ao atualizar - não autorizado!');
        }
    }

    const handleLogout = async () => {
        try {
            const { id: userId } = authuser;

            await logoutUser(userId);
            Cookies.remove('authToken');

            setAuthuser({
                token: null,
                firstname: null,
                id: null,
            });

            navigate('/');
        } catch (error) {
            toast.error("Erro ao deslogar: " + error.message);
            console.error('Erro ao fazer logout:', error);
        }
    };

    const logoutUser = async (userId) => {
        try {
            await Axios.post('http://localhost:8080/logout', { userId });
            toast.success("Até mais!");
        } catch (error) {
            throw new Error("Erro ao fazer logout: " + error.message);
        }
    };

    return (
        <section className={styles.container}>
            <div className={styles.contentcontainer}>
                <div className={styles.titleContainer}>
                    <h1>Edite seu perfil</h1>
                </div>
                <div className={styles.formcontainer}>

                    <form onSubmit={handleSubmit}>

                        <div className={styles.formGroup}>
                            <label htmlFor="firstname">Nome:</label>
                            <input type="text" id="firstname" name="firstname" value={user.firstname} onChange={handleInputChange} required />
                        </div>

                        {user.usertype === 1 && (
                            <div className={styles.formGroup}>
                                <label htmlFor="lastname">Sobrenome:</label>
                                <input type="text" id="lastname" name="lastname" value={user.lastname} onChange={handleInputChange} required />
                            </div>
                        )}

                        <div className={styles.formGroup}>
                            <label htmlFor="email">E-mail:</label>
                            <input type="email" id="email" name="email" value={user.email} onChange={handleInputChange} required />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password">Senha:</label>
                            <input type="password" id="password" name="password" value={user.password} onChange={handleInputChange} minLength="8" required />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="newpassword">Nova senha:</label>
                            <input type="password" id="newpassword" name="newpassword" value={user.newpassword} onChange={handleInputChange} minLength="8" required />
                        </div>

                        <button className={styles.submitButton} type="submit">Salvar</button>
                    </form>

                </div>
            </div>
        </section>
    )
}

export default Profile