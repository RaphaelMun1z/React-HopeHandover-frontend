import styles from './UpdateProjectForm.module.scss'
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputMask from 'react-input-mask';
import Axios from "axios"
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext'
import NoDataMensage from '../../components/NoDataMensage/NoDataMensage';

import { BiImageAdd } from 'react-icons/bi';
import { MdDriveFileRenameOutline, MdOutlineHealing, MdOutlinePlace } from 'react-icons/md';
import { TbFileDescription } from 'react-icons/tb';
import { IoIosImages } from 'react-icons/io';

function UpdateProjectForm() {
    const navigate = useNavigate()
    const { project_id } = useParams();
    const [project, setProject] = useState({
        contact: "",
        title: "",
        event: "",
        address: "",
        description: "",
        status: "",
    });

    const [loading, setLoading] = useState(true);
    const [addresses, setAddresses] = useState([])

    useEffect(() => {
        getProject()
    }, [])

    useEffect(() => {
        if (project.user) getAddresses(project.user.id)
    }, [project.user])

    Axios.defaults.withCredentials = true;

    const getProject = async () => {
        try {
            const response = await Axios.get(`http://localhost:8080/projects/about/${project_id}`);
            if (response.data.message) {
                toast.error('Ocorreu um erro ao carregar projeto!');
                setLoading(false);
            } else {
                setProject(response.data.project);
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
        setProject(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    Axios.defaults.withCredentials = true;

    const getAddresses = async (user_id) => {
        if (user_id) {
            try {
                const response = await Axios.get(`http://localhost:8080/myAddresses/${user_id}`);
                if (response.data.message) {
                    toast.error('Ocorreu um erro ao carregar endereços!');
                } else {
                    setAddresses(response.data);
                }
            } catch (error) {
                toast.error('Ocorreu um erro na solicitação!');
            }
        }
    };

    const renderAddressOptions = () => {
        return addresses.map((address) => (
            <option key={address.id} value={address.id}>
                {address.street}, {address.number}, {address.district}, {address.city} - {address.uf}
            </option>
        ));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!project.title) {
            toast.error("Por favor, informe um título.");
            return;
        }

        if (!project.event || project.event === 0) {
            toast.error("Por favor, informe o evento.");
            return;
        }

        if (!project.address) {
            toast.error("Por favor, informe um endereço.");
            return;
        }

        if (!project.contact) {
            toast.error("Por favor, informe um número para contato.");
            return;
        }

        if (!project.description) {
            toast.error("Por favor, informe uma descrição.");
            return;
        }

        try {
            const response = await Axios.patch(`http://localhost:8080/project/edit/${project.id}`, project);

            if (response.status === 200) {
                toast.success('Projeto atualizado com sucesso!');
                navigate('/management');
            } else {
                toast.warn('Erro ao atualizar! 1 ');
            }
        } catch (error) {
            toast.warn('Erro ao atualizar! 2');
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
                        project ? (
                            <form onSubmit={handleSubmit}>

                                <div className={styles.formGroup}>
                                    <label htmlFor="title" className={styles.contact__formLabel}><MdDriveFileRenameOutline />Qual o título do projeto?</label>
                                    <input type="text" id="title" name="title" value={project.title} className={styles.contact__formInput} onChange={handleInputChange} />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="event" className={styles.contact__formLabel}><MdOutlineHealing />Qual a causa relacionado a ajuda?</label>
                                    <select id="event" name="event" className={styles.contact__formInput} onChange={handleInputChange} value={project.event}>
                                        <option value={0}>Selecione um evento</option>
                                        <option value={1}>Educação</option>
                                        <option value={2}>Alimentos</option>
                                        <option value={3}>Roupas</option>
                                        <option value={4}>Serviços</option>
                                        <option value={5}>Outros</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="address" className={styles.contact__formLabel}><MdOutlinePlace />Qual o endereço de recebimento do(s) itens?</label>
                                    <select
                                        id="address"
                                        name="address"
                                        className={styles.contact__formInput}
                                        onChange={handleInputChange}
                                        value={project.address.id}
                                    >
                                        <option value="">Selecione um endereço</option>
                                        {renderAddressOptions()}
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="contact" className={styles.contact__formLabel}><MdOutlinePlace />Qual o telefone para contato?</label>
                                    <InputMask
                                        mask="(99) 9 9999-9999"
                                        type="text"
                                        id="contact"
                                        name="contact"
                                        value={project.contact}
                                        className={styles.contact__formInput}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="description" className={styles.contact__formLabel}><TbFileDescription />Faça uma descrição:</label>
                                    <textarea value={project.description} maxLength='255' id="description" name="description" className={styles.contact__formTextarea} onChange={handleInputChange}></textarea>
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

export default UpdateProjectForm



