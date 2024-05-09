import styles from './AddAdress.module.scss'
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { AuthContext } from '../../Contexts/AuthContext'
import Axios from "axios";
import { useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';

import { BiImageAdd } from 'react-icons/bi';
import { IoIosImages } from 'react-icons/io';

function AddAdress() {
    const navigate = useNavigate()
    const { authuser } = useContext(AuthContext)

    const [userID, setUserID] = useState(authuser.id)

    const [address, setAddress] = useState({
        user_id: userID,
        street: "",
        number: "",
        district: "",
        city: "",
        cep: "",
        uf: "",
        erro: false,
    });

    Axios.defaults.withCredentials = true;

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setAddress(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (event.target.name === "cep" && event.target.value && event.target.value.replace(/[^0-9]/g, "").length === 8) {
            handleVerifyCEP(event.target.value);
        }
    };

    const handleVerifyCEP = async (cep) => {
        const _cep = cep.replace(/-/g, '');
        try {
            fetch(`https://viacep.com.br/ws/${_cep}/json/`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.erro) {
                        setAddress({
                            erro: true,
                        });
                        toast.error("CEP não encontrado.");
                    } else {
                        setAddress({
                            cep,
                            user_id: userID,
                            street: data.logradouro,
                            district: data.bairro,
                            city: data.localidade,
                            uf: data.uf,
                            erro: false,
                        });
                    }
                });
        } catch (error) {
            setAddress({
                erro: true,
            });
            toast.error("Ocorreu um erro ao buscar o CEP.");
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!address.user_id) {
            toast.error("Há um erro interno, tente novamente mais tarde!");
            return;
        }

        if (!address.cep) {
            toast.error("Por favor, insira o CEP.");
            return;
        }

        if (!address.number) {
            toast.error("Por favor, insira o número do imóvel.");
            return;
        }

        try {
            const response = await Axios.post('http://localhost:8080/createAddress', address);

            if (response.status === 200) {
                if (response.data.status === 1) {
                    toast.success("Endereço cadastrado com sucesso!")
                    navigate('/');
                } else {
                    toast.warn('Endereço duplicado!');
                }
            } else {
                toast.warn('Não foi possível cadastrar o endereço.');
            }
        } catch (err) {
            toast.warn('Ocorreu um problema ao cadastrar o endereço.');
        }
    };

    return (
        <section className={styles.container}>
            <div className={styles.contentcontainer}>
                <div className={styles.titleContainer}>
                    <h1>Cadastre um endereço</h1>
                </div>
                <div className={styles.formcontainer}>

                    <form onSubmit={handleSubmit}>

                        <div className={styles.formGroup}>
                            <label htmlFor="cep">Informe o CEP:</label>
                            <InputMask
                                mask="99999-999"
                                type="text"
                                id="cep"
                                name="cep"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="number">Número:</label>
                            <InputMask
                                mask="999999"
                                maskChar=""
                                type="text"
                                id="number"
                                name="number"
                                onChange={handleInputChange}
                            />
                        </div>
                        {address.erro == true && address.cep ? (
                            address.cep.replace(/[^0-9]/g, "").length > 0 && (
                                <p className={styles.noCep}>CEP não encontrado.</p>
                            )
                        ) : (
                            address.district && (
                                <div className={styles.containerAddress}>
                                    <p>Confirme o endereço</p>
                                    <div className={styles.address}> {address.street} {address.number}, {address.district}, {address.city} - {address.uf}</div>
                                </div>
                            )
                        )}

                        <button className={styles.submitButton} type="submit">Salvar</button>
                    </form>

                </div>
            </div>
        </section>
    )
}

export default AddAdress