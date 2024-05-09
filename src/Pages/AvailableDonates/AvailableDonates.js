import { useEffect, useState } from 'react';
import Axios from "axios";
import { toast } from "react-toastify";
import styles from './AvailableDonates.module.scss'

//Components
import DonateCard from './Card/DonateCard';
import NoDataMensage from '../../components/NoDataMensage/NoDataMensage'

function AvailableDonates() {
    const [donates, setDonates] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDonates()
    }, [])

    Axios.defaults.withCredentials = true;

    const getDonates = async () => {
        try {
            const response = await Axios.get('http://localhost:8080/donates');
            if (response.status != 200) {
                toast.error("Ocorreu um erro ao carregar as doações!");
                setLoading(false);
            } else {
                setDonates(response.data.donates);
                setLoading(false);
            }
        } catch (error) {
            console.error('Erro na solicitação:', error);
            setLoading(false);
            toast.warn('Ocorreu um erro ao carregar!')
        }
    };

    useEffect(() => { }, [donates])

    return (
        <>
            <section className={styles.container}>
                <div className={styles.secTitle}>
                    <h1>Doações</h1>
                    <p>
                        Aqui você encontra <b>Doações</b> disponíveis para coleta.
                    </p>
                </div>
                <div className={styles.containerProds}>
                    {loading ? (
                        <NoDataMensage type="loading" msg="Buscando dados!" />
                    ) : (
                        donates.length > 0 ? (
                            donates.map((donate) => {
                                return <DonateCard dados={donate} key={donate.donateId} />;
                            })
                        ) : (
                            <NoDataMensage type="noData" msg="Nenhum dado encontrado!" />
                        )
                    )}
                </div>
            </section>
        </>
    )
}

export default AvailableDonates