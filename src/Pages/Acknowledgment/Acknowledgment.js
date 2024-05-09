import styles from './Acknowledgment.module.scss'
import Card from './Card/Card'
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../Contexts/AuthContext'
import { toast } from "react-toastify";
import Axios from "axios"
import NoDataMensage from '../../components/NoDataMensage/NoDataMensage';

function Acknowledgment() {
    Axios.defaults.withCredentials = true;

    const [handshakeds, setHandshakeds] = useState([])
    const [loading, setLoading] = useState(true);

    const { authuser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (authuser) {
            Axios.get(`http://localhost:8080/acknowledgment/${authuser.id}`, {
                withCredentials: true,
            })
                .then((response) => {
                    if (response.data.handshakeds) {
                        setHandshakeds(response.data.handshakeds);
                        setLoading(false);
                    } else {
                        setLoading(false);
                        toast.error('Nenhum Hand Shake encontrado.');
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    console.error('Erro ao buscar Hand Shakes:', error);
                    toast.error('Erro ao buscar Hand Shakes.');
                });
        }
    }, [authuser]);

    return (
        <>
            <section className={styles.container}>
                <div className={styles.secTitle}>
                    <h1>Reconhecimento recebido</h1>
                    <p>
                        Aqui você encontra <b>Hand Shakeds</b>. Um modo de reconhecer seu auxílio a projetos.
                    </p>
                </div>
                <div className={styles.containerProds}>
                    {loading ? (
                        <NoDataMensage type="loading" msg="Buscando dados!" />
                    ) : Array.isArray(handshakeds) && handshakeds.length > 0 ? (
                        handshakeds.map((value) => (
                            <Card name={value.user.firstname} date={value.created_at} key={value.id} />
                        ))
                    ) : (
                        <NoDataMensage type="noData" msg="Nenhum dado encontrado!" />
                    )}
                </div>
            </section>
        </>
    )
}

export default Acknowledgment