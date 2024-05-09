import styles from './ContactForm.module.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import Axios from "axios";

import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';

function ContactForm() {
    useEffect(() => {
        AOS.init({ duration: 2000 })
    })

    const [form, setForm] = useState({
        name: null,
        email: null,
        question: null,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    Axios.defaults.withCredentials = true;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.name) {
            alert("Por favor, escolha se você é uma organização ou um cidadão.");
            return;
        }

        if (!form.email) {
            alert("Por favor, informe seu nome.");
            return;
        }

        if (!form.question) {
            alert("Por favor, informe seu sobrenome.");
            return;
        }

        try {
            const response = await Axios.post('http://localhost:8080/contact', form);
            if (response.status === 200) {
                toast.success('Mensagem enviada com sucesso.');
            } else {
                toast.warn('Ocorreu um problema durante o envio da questão.');
            }
        } catch (err) {
            toast.warn('Ocorreu um erro ao enviar a questão!');
        }
    }

    return (
        <section className={styles.container}>
            <div className={styles.contentcontainer}>
                <div className={styles.titleContainer} data-aos="fade-up">
                    <h1>Alguma dúvida?</h1>
                </div>
                <div className={styles.formcontainer} data-aos="fade-up">
                    <form className={styles.contact__form} onSubmit={handleSubmit}>

                        <div className={styles.formGroup}>
                            <label htmlFor="name" className={styles.contact__form_label}>Qual o seu Nome:</label>
                            <input onChange={handleInputChange} type="text" id="name" name="name" className={styles.contact__form_input} required />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.contact__form_label}>Qual o seu E-mail:</label>
                            <input onChange={handleInputChange} type="email" id="email" name="email" className={styles.contact__form_input} required />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="question" className={styles.contact__form_label}>Digite sua Dúvida:</label>
                            <textarea onChange={handleInputChange} id="question" name="question" className={styles.contact__form_textarea} required></textarea>
                        </div>

                        <button type="submit" className={styles.contact__form_button}>Enviar</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ContactForm