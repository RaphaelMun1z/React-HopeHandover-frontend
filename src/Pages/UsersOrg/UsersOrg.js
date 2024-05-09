import styles from './UsersOrg.module.scss'
import { FaHandshake } from 'react-icons/fa';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from '../../Contexts/AuthContext'
import Axios from "axios"
import moment from 'moment';
import NoDataMensage from '../../components/NoDataMensage/NoDataMensage';

function UsersOrg() {
    const { authuser } = useContext(AuthContext)
    const [donaters, setDonaters] = useState([])
    const [isHandShaked, setIsHandShaked] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDonaters()
    }, [])

    Axios.defaults.withCredentials = true;

    const handleHandShakeClick = async (donor_id) => {
        try {
            if (authuser.id != null) {
                console.log("Agradecendo...")
                const response = await Axios.post('http://localhost:8080/project/thank', {
                    user_id: authuser.id,
                    donor_id: donor_id,
                });

                if (response.status !== 200) {
                    toast.error('Ocorreu um erro ao agradecer o doador! - Client 1');
                } else {
                    toast.success('Agradecimento realizado com sucesso!');
                    setIsHandShaked(!isHandShaked);
                }
            } else {
                toast.error("É necessário estar logado para agradecer!")
            }

        } catch (error) {
            console.error('Ocorreu um erro ao agradecer o doador - Client 2:', error);
        }
    };

    const getDonaters = async () => {
        try {
            const response = await Axios.get('http://localhost:8080/companyDonor');
            if (response.status != 200) {
                toast.error("Ocorreu um erro ao carregar ao doadores!");
                setLoading(false);
            } else {
                const formattedDonaters = response.data.donors.map((donater) => ({
                    ...donater,
                    createdAt: moment(donater.createdAt).format('MM/YYYY'),
                }));
                setDonaters(formattedDonaters);
                setLoading(false);
            }
        } catch (error) {
            console.error('Erro na solicitação:', error);
            toast.warn('Ocorreu um erro ao carregar!')
            setLoading(false);
        }
    };

    useEffect(() => { }, [donaters])
    return (
        <>
            <section className={styles.container}>
                <div className={styles.secTitle}>
                    <h1>Principais Organizações</h1>
                    <p>
                        Aqui você encontra as organizações que realizam doações.
                    </p>
                </div>
                <div className={styles.containerProds}>
                    {loading ? (
                        <NoDataMensage type="loading" msg="Buscando dados!" />
                    ) : donaters.length > 0 ? (
                        donaters.map((donater) => (
                            <div className={styles.card} key={donater.id}>
                                <div className={styles.cardBody}>
                                    <h2 className={styles.cardTitle}>{donater.firstname}</h2>
                                    <div className={styles.cardDonations}>
                                        <p className={styles.cardDonationsNumber}>Desde: {donater.createdAt}</p>
                                    </div>
                                    <button className={styles.cardButton} onClick={() => handleHandShakeClick(donater.id)}>
                                        {isHandShaked ? 'Deixar de Agradecer' : 'Agradecer'} <FaHandshake />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <NoDataMensage type="noData" msg="Nenhum doador cadastrado." />
                    )}
                </div>
            </section>
        </>
    )
}

export default UsersOrg