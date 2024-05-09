import { useEffect, useState, useContext } from 'react';
import Axios from "axios";
import styles from './ProjectItems.module.scss'
import { toast } from "react-toastify";
import { AuthContext } from '../../Contexts/AuthContext'

import Card from './Card/ItemCard'
import NoDataMensage from '../../components/NoDataMensage/NoDataMensage';

function ProjectItems() {
    const { authuser } = useContext(AuthContext)
    const [donates, setDonates] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDonates()
    }, [])

    Axios.defaults.withCredentials = true;

    const getDonates = async () => {
        try {
            const response = await Axios.get('http://localhost:8080/donates/' + authuser.id);
            if (response.status != 200) {
                toast.error("Ocorreu um erro ao carregar as doações!");
                setLoading(false);
            } else {
                setDonates(response.data.donates);
                setLoading(false);
            }
        } catch (error) {
            toast.warn('Ocorreu um erro ao carregar!')
            setLoading(false);
        }
    };

    useEffect(() => {
    }, [donates])

    return (
        <>
            <section className={styles.container}>
                <div className={styles.secTitle}>
                    <h1>Minhas Doações</h1>
                    <p>
                        Aqui você encontra suas <b>Doações publicadas</b>.
                    </p>
                </div>
                <div className={styles.containerItems}>
                    {loading ? (
                        <NoDataMensage type="loading" msg="Buscando dados!" />
                    ) : Array.isArray(donates) && donates.length > 0 ? (
                        donates.map((donate) => {
                            return <Card dados={donate} key={donate.donate_id} />
                        })
                    ) : (
                        <NoDataMensage type="noData" msg="Nenhum dado encontrado!" />
                    )}
                </div>
            </section>
        </>
    )
}

export default ProjectItems