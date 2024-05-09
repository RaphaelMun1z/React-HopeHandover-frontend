import styles from './AddImageToProjectForm.module.scss'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import Axios from "axios";
import { useParams } from 'react-router-dom';

import { BiImageAdd } from 'react-icons/bi';
import { IoIosImages } from 'react-icons/io';

function AddImageToProjectForm() {
    const navigate = useNavigate()
    const { project_id } = useParams();
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);

    const [midia, setMidia] = useState({
        project_id: project_id,
        description: null,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMidia(prevState => ({
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
                    <p>Adicionar Imagem</p>
                </div>
            );
        }
    };

    Axios.defaults.withCredentials = true;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!midia.description) {
            alert("Por favor, insira a descrição da imagem.");
            return;
        }

        const formData = new FormData();
        formData.append('description', midia.description);
        formData.append('project_id', midia.project_id);
        formData.append('image', selectedImageFile);

        try {
            const response = await Axios.post('http://localhost:8080/project/addMidia', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                navigate('/projects/about/' + midia.project_id);
            } else {
                toast.warn('Ocorreu um problema ao salvar a imagem.');
            }
        } catch (err) {
            console.log(err)
            toast.warn('Ocorreu um erro ao salvar imagem!');
        }
    };

    return (
        <section className={styles.container}>
            <div className={styles.contentcontainer}>
                <div className={styles.titleContainer}>
                    <h1>Adicione imagem ao seu projeto</h1>
                </div>
                <div className={styles.formcontainer}>

                    <form onSubmit={handleSubmit}>

                        <div className={styles.formGroup}>
                            <label htmlFor="description">Descrição:</label>
                            <input type="text" id="description" name="description" onChange={handleInputChange} />
                        </div>

                        <div className={styles.imagesInputContainer}>
                            <p className={styles.imagesInputLabel}><IoIosImages />Escolha a imagem:</p>

                            <label htmlFor="image" className={styles.imageInputLabel}>
                                <div className={styles.inputContainer}>
                                    {renderImagePreview()}
                                    <input className={styles.inputImageCont} type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
                                </div>
                            </label>
                        </div>

                        <button className={styles.submitButton} type="submit">Salvar</button>
                    </form>

                </div>
            </div>
        </section>
    )
}

export default AddImageToProjectForm