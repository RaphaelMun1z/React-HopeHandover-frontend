import styles from './Chat.module.scss';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import Axios from "axios";

function Chat() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    Axios.defaults.withCredentials = true;

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleSubmitQuestion = async () => {
        setIsLoading(true);
        try {
            const response = await Axios.post('http://localhost:8080/questionChat', {
                question: question,
            });

            const answerText = response.data
            setAnswer(answerText);
        } catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <section className={styles.container}>
            <div className={styles.formcontainer} data-aos="fade-up">
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.contact__form_label}>Qual a sua dúvida:</label>
                    <input
                        type="text"
                        placeholder="Faça uma pergunta..."
                        value={question}
                        className={styles.contact__form_input}
                        onChange={handleQuestionChange}
                        required />
                    <button onClick={handleSubmitQuestion}>Perguntar</button>
                </div>
                <div className={styles.answer}>
                    {isLoading ? (
                        <p>Pensando...</p> // Exibe a tela de carregamento enquanto isLoading for true
                    ) : (
                        answer && <p>R: {answer}</p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Chat