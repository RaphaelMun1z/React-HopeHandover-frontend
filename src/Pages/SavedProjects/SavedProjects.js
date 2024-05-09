import styles from './SavedProjects.module.scss'
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../Contexts/AuthContext'
import { toast } from "react-toastify";
import Axios from "axios"

import ProjectCard2 from '../Projects/Card/ProjectCard'
import NoDataMensage from '../../components/NoDataMensage/NoDataMensage';

function SavedProjects() {
    Axios.defaults.withCredentials = true;

    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true);

    const { authuser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (authuser) {
            Axios.get(`http://localhost:8080/projects/saved/${authuser.id}`, {
                withCredentials: true, 
            })
                .then((response) => {
                    if (response.data.projects) {
                        setProjects(response.data.projects);
                        setLoading(false);
                    } else {
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    console.error('Erro ao buscar projetos salvos:', error);
                    toast.error('Erro ao buscar projetos salvos.');
                });
        }
    }, [authuser]);

    return (
        <div className={styles.container}>
            <section className={styles.containerSections}>
                <div className={styles.secTitle}>
                    <h1>Projetos salvos</h1>
                    <p>
                        Aqui você encontra todos os projetos que você <b>Salvou</b>.
                    </p>
                </div>
                {loading ? (
                    <NoDataMensage type="loading" msg="Buscando dados!" />
                ) : Array.isArray(projects) && projects.length > 0 ? (
                    projects.map((project) => (
                        <ProjectCard2 project_id={project.id} event={project.event} title={project.title} username={project.user.firstname} key={project.id} image1={project.image1} image2={project.image2} image3={project.image3} />
                    ))
                ) : (
                    <NoDataMensage type="noData" msg="Nenhum dado encontrado!" />
                )}
            </section>
        </div>
    )
}

export default SavedProjects