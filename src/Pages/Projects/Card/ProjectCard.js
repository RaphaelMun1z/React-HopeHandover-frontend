import styles from './ProjectCard.module.scss'
import Axios from "axios";
import { FaHeart } from 'react-icons/fa';
import { useEffect, useState, useRef, useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'

import { BsInfoCircle } from 'react-icons/bs';
import { FcCameraAddon } from 'react-icons/fc';
import { AiOutlineAppstoreAdd, AiOutlineStop } from 'react-icons/ai';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';


import e_educacao from "../../../img/e_educacao.png"
import e_alimento from "../../../img/e_alimento.png"
import e_roupa from "../../../img/e_roupa.png"
import e_servico from "../../../img/e_servico.png"
import e_outro from "../../../img/logo.png"

function DonateCard({ project_id, title, username, image1, image2, image3, personalProject, status, event }) {
    const { authuser } = useContext(AuthContext)
    const [isSaved, setIsSaved] = useState(false);
    const [isFinalized, setFinalized] = useState(false);
    const [projectId, setProjectId] = useState(null);

    useEffect(() => {
        setProjectId(project_id);
    }, [project_id]);

    Axios.defaults.withCredentials = true;

    const handleSaveClick = async () => {
        try {
            if (authuser.id != null) {
                console.log("Salvando...")
                console.log(projectId)
                const response = await Axios.post('http://localhost:8080/project/save', {
                    userid: authuser.id,
                    projectid: projectId,
                });

                if (response.status != 200) {
                    toast.error('Ocorreu um erro ao salvar projeto! - Client 1');
                } else {
                    toast.success('Status do Projeto salvo com sucesso!');
                    setIsSaved(!isSaved);
                }
            } else {
                toast.error("É necessário estar logado para salvar!")
            }

        } catch (error) {
            console.error('Ocorreu um erro ao salvar o projeto - Client 2:', error);
        }
    };

    const handleStatusClick = async () => {
        try {
            if (authuser.id != null) {
                const response = await Axios.post('http://localhost:8080/project/finalize', {
                    projectid: projectId,
                });

                if (response.status != 200) {
                    toast.error('Ocorreu um erro ao finalizar o projeto!');
                } else {
                    setFinalized(!isFinalized);
                    toast.success('Projeto finalizado com sucesso!');
                }
            } else {
                toast.error("É necessário estar logado para finalizar o projeto!")
            }

        } catch (error) {
            console.error('Ocorreu um erro ao finalizar o projeto:', error);
        }
    }

    return (
        <>
            <div className={styles.card}>
                <div className={styles.content}>
                    <div className={styles.titleContainer}>
                        <h1>{title}</h1>
                        <h4>{username}</h4>
                    </div>
                    <div className={styles.previewImageContainer}>
                        <div className={styles.imageContainer}>
                            <img src={`http://localhost:8080/images/${image1}`} />
                        </div>
                        <div className={styles.imageContainer}>
                            <img src={`http://localhost:8080/images/${image2}`} />
                        </div>
                        <div className={styles.imageContainer}>
                            <img src={`http://localhost:8080/images/${image3}`} />
                        </div>
                        {personalProject && status == 1 && (
                            <div className={styles.imageContainer}>
                                <Link to={`/projects/addImage/${project_id}`}>
                                    <button className={styles.btn_addImage}>
                                        <FcCameraAddon />
                                        <p>Adicionar Imagem</p>
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className={styles.buttonsContainer}>
                        <Link to={`/projects/about/${project_id}`}>
                            <button className={styles.btn_sabermais}>
                                <BsInfoCircle />
                                Saber mais
                            </button>
                        </Link>

                        {!personalProject && status == 1 && (
                            <button className={styles.btn_ajudar}>
                                Ajudar
                            </button>
                        )}

                        {personalProject && status == 1 && (
                            <Link to={`/projects/createDonate/${project_id}`}>
                                <button className={styles.btn_addItem}>
                                    <AiOutlineAppstoreAdd />
                                    Adicionar item
                                </button>
                            </Link>
                        )}

                        <button className={styles.btn_salvar} onClick={handleSaveClick}>
                            {isSaved ? (<><MdOutlineFavoriteBorder />Projeto Salvo</>) : (<><MdOutlineFavoriteBorder />Salvar</>)}
                        </button>

                        {personalProject && status == 1 && (
                            <button className={styles.btn_finishProject} onClick={handleStatusClick}>
                                {isFinalized ? (<><AiOutlineStop />Projeto finalizado</>) : (<><AiOutlineStop />Finalizar projeto</>)}
                            </button>
                        )}
                    </div>
                </div>

                <div className={styles.mainImage}>
                    {event == '1' ? (
                        <img src={e_educacao} />
                    ) : event == '2' ? (
                        <img src={e_alimento} />
                    ) : event == '3' ? (
                        <img src={e_roupa} />
                    ) : event == '4' ? (
                        <img src={e_servico} />
                    ) : (
                        <img src={e_outro} />
                    )}
                </div>
            </div>
        </>
    )
}

export default DonateCard