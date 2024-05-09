import styles from './UpdateUserForm.module.scss'
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputMask from 'react-input-mask';
import Axios from "axios"
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext'
import NoDataMensage from '../NoDataMensage/NoDataMensage';

import { BiImageAdd } from 'react-icons/bi';
import { MdDriveFileRenameOutline, MdOutlineHealing, MdOutlinePlace } from 'react-icons/md';
import { TbFileDescription } from 'react-icons/tb';
import { IoIosImages } from 'react-icons/io';

function UpdateUserForm() {
    const navigate = useNavigate()
    const { user_id } = useParams();
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        usertype: "",
        accesslevel: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUser()
    }, [])

    Axios.defaults.withCredentials = true;

    const getUser = async () => {
        try {
            const response = await Axios.get(`http://localhost:8080/adm/users/${user_id}`);
            if (response.data.message) {
                toast.error('Ocorreu um erro ao carregar usuário!');
                setLoading(false);
            } else {
                setUser(response.data.user);
                setLoading(false);
            }
        } catch (error) {
            console.error('Erro na solicitação:', error);
            toast.error('Ocorreu um erro na solicitação!');
            setLoading(false);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user.firstname) {
            toast.error("O campo NOME não pode ser vazio!");
            return;
        }

        if (!user.lastname) {
            toast.error("O campo SOBRENOME não pode ser vazio!");
            return;
        }

        if (!user.usertype) {
            toast.error("O campo TIPO DE USUÁRIO não pode ser vazio!");
            return;
        }

        if (!user.email) {
            toast.error("O campo EMAIL não pode ser vazio!");
            return;
        }

        try {
            const response = await Axios.patch(`http://localhost:8080/user/edit/${user.id}`, user);

            if (response.status === 200) {
                toast.success('Usuário atualizado com sucesso!');
                navigate('/management');
            } else {
                toast.warn('Erro ao atualizar!');
            }
        } catch (error) {
            toast.warn('Erro ao atualizar!');
        }
    }

    return (
        <section className={styles.contact}>
            <div className={styles.contentcontainer}>
                <div className={styles.titleContainer}>
                    <h1>Atualize o projeto</h1>
                </div>

                <div className={styles.formcontainer}>
                    {loading ? (
                        <NoDataMensage type="loading" msg="Buscando dados!" />
                    ) : (
                        user ? (
                            <form onSubmit={handleSubmit}>

                                <div className={styles.formGroup}>
                                    <label htmlFor="firstname" className={styles.contact__formLabel}><MdDriveFileRenameOutline />Qual o nome do usuário?</label>
                                    <input type="text" id="firstname" name="firstname" value={user.firstname} className={styles.contact__formInput} onChange={handleInputChange} />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="lastname" className={styles.contact__formLabel}><MdDriveFileRenameOutline />Qual o sobrenome do usuário?</label>
                                    <input type="text" id="lastname" name="lastname" value={user.lastname} className={styles.contact__formInput} onChange={handleInputChange} />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="email" className={styles.contact__formLabel}><MdDriveFileRenameOutline />Qual o email do usuário?</label>
                                    <input type="text" id="email" name="email" value={user.email} className={styles.contact__formInput} onChange={handleInputChange} />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="usertype" className={styles.contact__formLabel}><MdOutlineHealing />Qual o tipo de usuário?</label>
                                    <select id="usertype" name="usertype" className={styles.contact__formInput} onChange={handleInputChange} value={user.usertype}>
                                        <option value={null}>Selecione um tipo</option>
                                        <option value={1}>Pessoa física</option>
                                        <option value={2}>Pessoa jurídica</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="password" className={styles.contact__formLabel}><MdDriveFileRenameOutline />Qual a nova senha do usuário?</label>
                                    <input type="password" id="password" name="password" className={styles.contact__formInput} onChange={handleInputChange} />
                                </div>

                                <button type="submit" className={styles.submitButton}>Atualizar</button>
                            </form>
                        ) : (
                            <NoDataMensage type="noData" msg="Nenhum dado encontrado!" />
                        )
                    )}
                </div>
            </div>
        </section>
    )
}

export default UpdateUserForm



