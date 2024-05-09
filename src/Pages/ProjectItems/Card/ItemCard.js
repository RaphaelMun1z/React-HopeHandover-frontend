import styles from './ItemCard.module.scss'
import React, { useState, useContext, useEffect } from 'react';
import Axios from "axios";
import { toast } from "react-toastify";

function ItemCard(props) {
    const [selectedStatus, setSelectedStatus] = useState(props.dados.status);
    const [donorData, setDonorData] = useState([])

    const [donateId, setDonateId] = useState(props.dados.donate_id);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    Axios.defaults.withCredentials = true;

    const handleStatusChange = async (event) => {
        let newStatus = parseInt(event.target.value)

        try {
            const response = await Axios.post('http://localhost:8080/statusChange', { newStatus, donateId });
            if (response.status != 200) {
                toast.error("Ocorreu um erro ao salvar novo status!");
            } else {
                toast.success("Novo status definido com sucesso!");
            }
        } catch (error) {
            toast.warn('Ocorreu um erro ao salvar novo status!')
        }
    }

    Axios.defaults.withCredentials = true;

    const getDonates = async () => {
        const user_id = props.dados.realizeddonate.user_id;
  
        try {
            const response = await Axios.post('http://localhost:8080/donorUserData/' + user_id);
            if (response.status != 200) {
                toast.error("Ocorreu um erro ao carregar dados do doador!");
            } else {
                setDonorData(response.data.user);
            }
        } catch (error) {
            toast.warn('Ocorreu um erro ao carregar dados do doador! ')
        }
    };

    useEffect(() => {
        if (props.dados.status !== 0 && props.dados.realizeddonate !== null) {
            getDonates()
        }
    }, [props.dados.status])

    return (
        <div className={styles.itemContainer}>
            <div className={styles.contentContainer}>
                <div className={styles.imgContainer}>
                    <img src={`http://localhost:8080/images/${props.dados.project.image1}`} alt="Imagem do projeto" />
                </div>
                <div className={styles.dataContainer}>
                    <h1>{props.dados.title}</h1>
                    <h3>
                        {props.dados.status === 0
                            ? 'Publicado'
                            : props.dados.status === 1
                                ? 'Em andamento'
                                : props.dados.status === 2
                                    ? 'Finalizado'
                                    : 'Erro: ' + props.dados.status}
                    </h3>
                    <p>Projeto: {props.dados.project.title}</p>
                    <p>Quantidade: {props.dados.amount}</p>
                    <p>Publicado em: {formatDate(props.dados.createdAt)}</p>
                    <p>Finalizado em: {formatDate(props.dados.updatedAt)}</p>
                    <p>Mudar status:</p>
                    <select id="status" onChange={handleStatusChange} value={selectedStatus}>
                        {props.dados.status === 0 && (
                            <>
                                <option value selected>Selecione o novo status</option>
                                <option value="1">Em andamento</option>
                                <option value="2">Finalizado</option>
                            </>
                        )}
                        {props.dados.status === 1 && (
                            <>
                                <option value selected>Selecione o novo status</option>
                                <option value="0">Publicado</option>
                                <option value="2">Finalizado</option>
                            </>
                        )}
                        {props.dados.status === 2 && (
                            <>
                                <option value selected>Selecione o novo status</option>
                                <option value="0">Publicado</option>
                                <option value="1">Em andamento</option>
                            </>
                        )}
                    </select>
                    {props.dados.status !== 0 && props.dados.realizeddonate !== null ? (
                        <div className={styles.donorData}>
                            <h2>{donorData.firstname}</h2>
                            <p className={styles.donorName}>entrará em contato com você.</p>
                            <h3>Dados do doador</h3>
                            <p>Nome: {donorData.firstname}</p>
                            <p>Email: {donorData.email}</p>
                            <img src={`http://localhost:8080/images/${donorData.image}`} />
                        </div>
                    ) : null
                    }
                </div>
                <div className={styles.flagStatus}></div>
            </div>
        </div >
    )
}

export default ItemCard