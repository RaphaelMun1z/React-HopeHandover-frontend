import styles from './Signup.module.scss'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import Axios from "axios";

import { BiImageAdd } from 'react-icons/bi';
import { IoIosImages } from 'react-icons/io';

function Signup() {
    const navigate = useNavigate()
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        usertype: 1,
        email: "",
        password: "",
        confirmPassword: ""
    });


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUserTypeChange = (event) => {
        const { value } = event.target;
        setUser(prevState => ({
            ...prevState,
            usertype: parseInt(value)
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
                    <p>Adicionar Imagem de Perfil</p>
                </div>
            );
        }
    };

    Axios.defaults.withCredentials = true;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user.usertype) {
            alert("Por favor, escolha se você é uma Pessoa física ou uma Pessoa jurídica.");
            return;
        }

        if (!user.firstname) {
            alert("Por favor, informe seu nome.");
            return;
        }

        if (!user.lastname && user.usertype === 1) {
            alert("Por favor, informe seu sobrenome.");
            return;
        }

        if (!user.email) {
            alert("Por favor, informe um e-mail.");
            return;
        }

        if (!user.password) {
            alert("Por favor, informe uma senha.");
            return;
        }

        if (!user.confirmPassword) {
            alert("Por favor, confirme sua senha.");
            return;
        }

        if (user.password !== user.confirmPassword) {
            alert("As senhas não conferem!");
            return;
        }

        const formData = new FormData();
        formData.append('firstname', user.firstname);
        formData.append('lastname', user.lastname);
        formData.append('usertype', user.usertype);
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('image', selectedImageFile);

        try {
            const response = await Axios.post('http://localhost:8080/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                const firstName = response.data.user.firstname;
                toast.success('Seja bem-vindo(a), ' + firstName + '!');
                console.log('Usuário cadastrado com sucesso!');
                navigate('/signin');
            } else {
                toast.warn('Ocorreu um problema durante o cadastro.');
            }
        } catch (err) {
            toast.warn('Ocorreu um erro ao cadastrar o usuário!');
        }
    };

    return (
        <section className={styles.container}>
            <div className={styles.contentcontainer}>
                <div className={styles.titleContainer}>
                    <h1>Faça seu cadastro</h1>
                </div>
                <div className={styles.formcontainer}>

                    <form onSubmit={handleSubmit}>

                        <div className={styles.cadastroUserType}>
                            <div
                                className={`${styles.userTypeButton} ${user.usertype === 2 ? styles.selected : ''}`}
                                onClick={() => setUser((prevState) => ({ ...prevState, usertype: 2 }))}
                            >
                                Pessoa Jurídica
                            </div>
                            <div
                                className={`${styles.userTypeButton} ${user.usertype === 1 ? styles.selected : ''}`}
                                onClick={() => setUser((prevState) => ({ ...prevState, usertype: 1 }))}
                            >
                                Pessoa Física
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="firstname">Nome:</label>
                            <input type="text" id="firstname" name="firstname" defaultValue={user.firstname} onChange={handleInputChange} />
                        </div>

                        {user.usertype === 1 && (
                            <div className={styles.formGroup}>
                                <label htmlFor="lastname">Sobrenome:</label>
                                <input type="text" id="lastname" name="lastname" defaultValue={user.lastname} onChange={handleInputChange} />
                            </div>
                        )}

                        <div className={styles.formGroup}>
                            <label htmlFor="email">E-mail:</label>
                            <input type="email" id="email" name="email" defaultValue={user.email} onChange={handleInputChange} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password">Senha:</label>
                            <input type="password" id="password" name="password" defaultValue={user.password} onChange={handleInputChange} minLength="8" />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="confirmPassword">Confirme a senha:</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" defaultValue={user.confirmPassword} onChange={handleInputChange} minLength="8" />
                        </div>

                        <div className={styles.imagesInputContainer}>
                            <p className={styles.imagesInputLabel}><IoIosImages />Escolha sua imagem de perfil:</p>

                            <label htmlFor="image" className={styles.imageInputLabel}>
                                <div className={styles.inputContainer}>
                                    {renderImagePreview()}
                                    <input className={styles.inputImageCont} type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
                                </div>
                            </label>
                        </div>

                        <button className={styles.submitButton} type="submit">Cadastrar</button>
                    </form>

                </div>
            </div>
        </section>
    )
}

export default Signup