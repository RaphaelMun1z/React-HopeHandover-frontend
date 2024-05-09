import styles from './CreateDonate.module.scss'
import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from '../../Contexts/AuthContext'
import Axios from "axios"
import { useParams } from 'react-router-dom';

import { AiOutlineFieldNumber } from "react-icons/ai";
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { BiImageAdd } from 'react-icons/bi';
import { IoIosImages } from 'react-icons/io';

function CreateDonate({ project_id_props }) {
    const { id } = useParams();
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);

    const navigate = useNavigate()
    const { authuser } = useContext(AuthContext)

    const [donate, setDonate] = useState({
        project_id: id,
        title: "",
        amount: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDonate(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImageFile(file);
        if (file) {
            setSelectedImages(URL.createObjectURL(file));
        } else {
            setSelectedImages(null);
        }
    };

    const renderImagePreview = () => {
        if (selectedImages.length > 0) {
            return <img src={selectedImages} alt="Imagem de perfil:" className={styles.imagePreview} />;
        } else {
            return (
                <div>
                    <BiImageAdd className={styles.imageUploadIcon} />
                    <p>Adicionar Imagem do Item</p>
                </div>
            );
        }
    };

    Axios.defaults.withCredentials = true;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!donate.title) {
            alert("Por favor, informe um título.");
            return;
        }

        if (!donate.amount) {
            alert("Por favor, informe uma quantidade.");
            return;
        }

        const formData = new FormData();
        formData.append('project_id', donate.project_id);
        formData.append('title', donate.title);
        formData.append('amount', donate.amount);
        formData.append('image', selectedImageFile);

        try {
            const response = await Axios.post('http://localhost:8080/createDonate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                toast.success("Item salvo no projeto com sucesso!");
                navigate('/');
            } else {
                toast.error("Ocorreu um erro ao salvar item!");
                console.log("Erro no cadastro do item:", response.data.message);
            }
        } catch (error) {
            console.log("Erro ao cadastrar item:", error);
        }

    }

    return (
        <section className={styles.contact}>
            <div className={styles.contentcontainer}>
                <div className={styles.titleContainer}>
                    <h1>Cadastrar item no projeto</h1>
                </div>

                <div className={styles.formcontainer}>
                    <form className={styles.contact__form} onSubmit={handleSubmit}>

                        <div className={styles.formGroup}>
                            <label htmlFor="title" className={styles.contact__formLabel}><MdDriveFileRenameOutline />Qual o título do item?</label>
                            <input type="text" id="title" name="title" className={styles.contact__formInput} onChange={handleInputChange} required />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="amount" className={styles.contact__formLabel}><AiOutlineFieldNumber />Qual a quantidade?</label>
                            <input type="number" id="amount" name="amount" className={styles.contact__formInput} onChange={handleInputChange} required />
                        </div>

                        <div className={styles.imagesInputContainer}>
                            <p className={styles.imagesInputLabel}><IoIosImages />Escolha a imagem do item:</p>

                            <label htmlFor="image" className={styles.imageInputLabel}>
                                <div className={styles.inputContainer}>
                                    {renderImagePreview()}
                                    <input className={styles.inputImageCont} type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
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

export default CreateDonate