import styles from './CreateProjectForm.module.scss'
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from '../../Contexts/AuthContext'
import InputMask from 'react-input-mask';
import Axios from "axios"
import { Link } from 'react-router-dom'

import { BiImageAdd } from 'react-icons/bi';
import { MdDriveFileRenameOutline, MdOutlineHealing, MdOutlinePlace } from 'react-icons/md';
import { TbFileDescription } from 'react-icons/tb';
import { IoIosImages } from 'react-icons/io';

function CreateProjectForm() {
    const navigate = useNavigate()
    const { authuser } = useContext(AuthContext)
    const [selectedImages, setSelectedImages] = useState([null, null, null]);
    const [addresses, setAddresses] = useState([])

    const [project, setProject] = useState({
        ownid: authuser.id,
        title: "",
        event: 0,
        address: "",
        contact: "",
        description: "",
    });

    useEffect(() => {
        getAddresses(project.ownid)
    }, [])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProject(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (index, event) => {
        const file = event.target.files[0];
        const newSelectedImages = [...selectedImages];
        newSelectedImages[index] = file;
        setSelectedImages(newSelectedImages);
    };

    const renderImagePreview = (index) => {
        if (selectedImages[index]) {
            return <img src={URL.createObjectURL(selectedImages[index])} alt={`Imagem ${index + 1}`} className={styles.imagePreview} />;
        }
        return <BiImageAdd />;
    };

    Axios.defaults.withCredentials = true;

    const getAddresses = async (user_id) => {
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

        const numberOfSelectedImages = selectedImages.filter((image) => image !== null).length;
        if (numberOfSelectedImages < 3) {
            toast.error("Por favor, selecione as três imagens.");
            return;
        }

        const projectData = new FormData();
        projectData.append('ownid', project.ownid);
        projectData.append('title', project.title);
        projectData.append('event', project.event);
        projectData.append('address', project.address);
        projectData.append('contact', project.contact);
        projectData.append('description', project.description);

        const { v4: uuidv4 } = require('uuid');
        selectedImages.forEach((image, index) => {
            if (image) {
                const extension = image.name.split('.').pop();
                const fileName = `${uuidv4()}.${extension}`;
                projectData.append('images', image, fileName);
            }
        });

        try {
            const response = await Axios.post("http://localhost:8080/projects", projectData);

            if (response.status === 201) {
                toast.success("Projeto " + project.title + " cadastrado com sucesso!");
                navigate('/');
            } else {
                toast.error("Ocorreu um erro ao cadastrar o projeto!");
                navigate('/');
            }
        } catch (error) {
            if (error.response) {
                toast.error("Erro na resposta do servidor: " + error.response.data.message);
            } else if (error.request) {
                toast.error("Sem resposta do servidor. Verifique sua conexão.");
            } else {
                toast.error("Erro na configuração da solicitação.");
            }
            navigate('/');
        }
    };

    return (
        <section className={styles.contact}>
            <div className={styles.contentcontainer}>
                <div className={styles.titleContainer}>
                    <h1>Cadastre seu projeto</h1>
                </div>

                <div className={styles.formcontainer}>

                    <form onSubmit={handleSubmit}>

                        <div className={styles.formGroup}>
                            <label htmlFor="title" className={styles.contact__formLabel}><MdDriveFileRenameOutline />Qual o título do projeto?</label>
                            <input type="text" id="title" name="title" className={styles.contact__formInput} onChange={handleInputChange} />
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

                            {addresses.length === 0 ? (
                                <Link className={styles.toNewAddress} to="/addresses/register">Cadastrar endereço</Link>
                            ) : (
                                <select
                                    id="address"
                                    name="address"
                                    className={styles.contact__formInput}
                                    onChange={handleInputChange}
                                    value={project.address}
                                >
                                    <option value="">Selecione um endereço</option>
                                    {renderAddressOptions()}
                                </select>
                            )}

                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="contact" className={styles.contact__formLabel}><MdOutlinePlace />Qual o telefone para contato?</label>
                            <InputMask
                                mask="(99) 9 9999-9999"
                                type="text"
                                id="contact"
                                name="contact"
                                className={styles.contact__formInput}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="description" className={styles.contact__formLabel}><TbFileDescription />Faça uma descrição:</label>
                            <textarea maxLength='255' id="description" name="description" className={styles.contact__formTextarea} onChange={handleInputChange}></textarea>
                        </div>

                        <div className={styles.imagesInputContainer}>
                            <p className={styles.imagesInputLabel}><IoIosImages />Escolha três imagens para a prévia:</p>

                            <label htmlFor="image1" className={styles.imageInputLabel}>
                                <div className={styles.inputContainer}>
                                    {renderImagePreview(0)}
                                    <input className={styles.inputImageCont} type="file" id="image1" name="image1" accept="image/*" onChange={(e) => handleImageChange(0, e)} />
                                </div>
                                <p className={styles.mainImageText}>Imagem principal</p>
                            </label>

                            <label htmlFor="image2" className={styles.imageInputLabel}>
                                <div className={styles.inputContainer}>
                                    {renderImagePreview(1)}
                                    <input className={styles.inputImageCont} type="file" id="image2" name="image2" accept="image/*" onChange={(e) => handleImageChange(1, e)} />
                                </div>
                            </label>

                            <label htmlFor="image3" className={styles.imageInputLabel}>
                                <div className={styles.inputContainer}>
                                    {renderImagePreview(2)}
                                    <input className={styles.inputImageCont} type="file" id="image3" name="image3" accept="image/*" onChange={(e) => handleImageChange(2, e)} />
                                </div>
                            </label>

                        </div>

                        <button type="submit" className={styles.submitButton}>Salvar</button>
                    </form>

                </div>
            </div>
        </section>
    )
}

export default CreateProjectForm



