import Modal from 'react-modal';
import styles from './DonateCard.module.scss'
import moment from 'moment';
import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../Contexts/AuthContext'
import Axios from "axios"

// Icons
import { HiOutlineDocumentSearch } from 'react-icons/hi';
import { AiOutlineCalendar, AiOutlinePieChart, AiOutlineInbox } from 'react-icons/ai';

import imagem from '../../../img/doacao_icone.png'

function DonateCard(props) {
    console.log(props)
    const navigate = useNavigate()
    const { authuser } = useContext(AuthContext)

    const [logged, setLogged] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [realizedDonate, setRealizedDonate] = useState({
        user_id: authuser.id,
        item_id: props.dados.donate_id,
    });

    useEffect(() => {
        if (authuser.id !== null) setLogged(true);
        else setLogged(false);
    }, [authuser.id]);

    Axios.defaults.withCredentials = true;

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleConfirmDonation = async () => {
        if (agreed && logged) {
            Swal.fire({
                icon: 'success',
                title: 'Doação realizada com sucesso! Verifique suas doações em: <b>Configurações → Minha Área → Minhas doações</b>',
                showConfirmButton: true
            });
            closeModal();

            if (!realizedDonate.user_id) {
                alert("É necessário estar logado para realizar a doação!");
                return;
            }

            if (!realizedDonate.item_id) {
                alert("Ocorreu um erro ao doar!");
                return;
            }

            try {
                const response = await Axios.post("http://localhost:8080/realizeDonate", realizedDonate);

                if (response.status === 200) {
                    toast.success("Doação realizada com sucesso!");
                    navigate('/availableDonates');
                } else {
                    toast.error("Ocorreu um erro ao realizar a doação!");
                    console.log("Erro ao realizar a doação:", response.data.message);
                    navigate('/availableDonates');
                }
            } catch (error) {
                console.log("Erro ao realizar a doação:", error);
                navigate('/availableDonates');
            }

        } else if (!logged) {
            Swal.fire({
                icon: 'error',
                title: 'Acesse sua conta para realizar uma doação.',
            });
        } else if (!agreed) {
            Swal.fire({
                icon: 'error',
                title: 'Você deve concordar com os termos antes de confirmar a doação.',
            });
        }
    };

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Popup"
                className={styles.custom_modal}
            >
                <div className={styles.modalContent}>
                    <div className={styles.leftColumn}>
                        <h2>{props.dados.title}</h2>
                        <p>Endereço: {props.dados.project.address}</p>
                        <p>Email: {props.dados.project.user.email}</p>
                        <p>Nome do Projeto: {props.dados.project.title}</p>
                        <p>Nome do Dono do Projeto: {props.dados.project.user.firstname}</p>
                        <p className={styles.highlight_message}>Tem certeza de que deseja realizar essa doação?</p>
                        <p className={styles.important_msg}>Antes de prosseguir com a doação, por favor, esteja ciente de que ao aceitar, você se compromete a entrar em contato via WhatsApp com a pessoa responsável pelo projeto.</p>

                        <label className={styles.acceptTerms}>
                            <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} />
                            <p>Concordo com os termos</p>
                        </label>

                        <div className={styles.button_container} lassName="button_container">
                            <button className={styles.confirm_button} onClick={handleConfirmDonation} >Confirmar</button>
                            <button className={styles.cancel_button} onClick={closeModal}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                    <div className={styles.rightColumn}>
                        <img className={styles.itemImage} src={`http://localhost:8080/images/${props.dados.image}`}/>
                        <div className={styles.general_info}>
                            <div className={styles.infoArea}>
                                <p><AiOutlineInbox /> Nome do Projeto:</p>
                                <span>{props.dados.project.title}</span>
                            </div>
                            <div className={styles.infoArea}>
                                <p><AiOutlinePieChart />Quantidade do item:</p>
                                <span>{props.dados.amount}  </span>
                            </div>
                            <div className={styles.infoArea}>
                                <p><AiOutlineCalendar />Doação publicada em:</p>
                                <span>{moment(props.dados.startedAt).locale('pt-br').format('DD/MM/YYYY')}</span>
                            </div>
                            <div className={styles.infoArea}>
                                <p><AiOutlineCalendar />Projeto cadastrado em:</p>
                                <span>{moment(props.dados.project.startedAt).locale('pt-br').format('DD/MM/YYYY')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            <div className={styles.card} onClick={openModal}>
                <div className={styles.card_image}>
                    <img src={`http://localhost:8080/images/${props.dados.image}`} alt="Imagem" />
                </div>
                <div className={styles.card_content}>
                    <div className={styles.title}>
                        <div>
                            <h1>{props.dados.title}</h1>
                        </div>
                        <div>
                            <HiOutlineDocumentSearch />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.donor}>
                <p>{props.dados.info}</p>
            </div>
        </>

    )
}

export default DonateCard