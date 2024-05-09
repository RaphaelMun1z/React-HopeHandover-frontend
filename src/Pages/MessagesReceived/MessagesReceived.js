import styles from './MessagesReceived.module.scss'
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "axios"
import moment from 'moment';
import NoDataMensage from '../../components/NoDataMensage/NoDataMensage';

function MessagesReceived() {
    const [forms, setForms] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getForms()
    }, [])

    Axios.defaults.withCredentials = true;

    const getForms = async () => {
        try {
            const response = await Axios.get('http://localhost:8080/contacts');
            if (response.status !== 200) {
                toast.error("Ocorreu um erro ao carregar os formulários!");
                setLoading(false);
            } else {
                setForms(response.data.contacts);
                setLoading(false);
            }
        } catch (error) {
            console.error('Erro na solicitação:', error);
            toast.warn('Ocorreu um erro ao carregar!')
            setLoading(false);
        }
    };

    const formatDateTime = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    return (
        <section className={styles.containerSections}>
            <div className={styles.secTitle}>
                <h1>Formulários de contato</h1>
                <p>Aqui você encontra os <b>Formulários recebidos</b>.</p>
            </div>
            <div className={styles.formsContainer}>

                {loading ? (
                    <NoDataMensage type="loading" msg="Buscando dados!" />
                ) : forms.length > 0 ? (
                    forms.map((form) => (
                        <div className={styles.contactCard}>
                            <h2>{form.name}</h2>
                            <p><strong>Email: </strong>{form.email}</p>
                            <p><strong>Pergunta: </strong>{form.question}</p>
                            <p><strong>Data de criação: </strong>{formatDateTime(form.created_at)}</p>
                        </div>
                    ))
                ) : (
                    <NoDataMensage type="noData" msg="Nenhum formulário registrado." />
                )}
            </div>
        </section>

    )
}

export default MessagesReceived