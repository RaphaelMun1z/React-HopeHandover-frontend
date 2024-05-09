import styles from './Projects.module.css'
import Axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState, useRef } from 'react';
import NoDataMensage from '../../components/NoDataMensage/NoDataMensage';

// Components
import ProjectCard2 from './Card/ProjectCard'

function Projects() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProjects()
    }, [])

    Axios.defaults.withCredentials = true;

    const getProjects = async () => {
        try {
            const response = await Axios.get('http://localhost:8080/projects');
            if (response.status != 200) {
                toast.error('Ocorreu um erro ao carregar projetos!');
                setLoading(false);
            } else {
                setProjects(response.data.projects);
                setLoading(false);
            }
        } catch (error) {
            console.error('Erro na solicitação:', error);
            toast.error('Ocorreu um erro na solicitação!');
            setLoading(false);
        }
    };

    useEffect(() => {

    }, [projects])

    return (
        <div className={styles.container}>
            <section className={styles.containerSections}>
                <div className={styles.secTitle}>
                    <h1>Projetos sociais</h1>
                    <p>
                        Aqui você encontra todas os projetos sociais em andamento. Ao clicar em <b>Saber mais</b> você será redirecionado as necessidades de cada projeto.
                    </p>
                </div>

                {loading ? (
                    <NoDataMensage type="loading" msg="Buscando dados!" />
                ) : (
                    projects && projects.length > 0 ? (
                        projects.map((project) => (
                            <ProjectCard2
                                project_id={project.id}
                                event={project.event}
                                title={project.title}
                                username={project.user.firstname}
                                key={project.id}
                                image1={project.image1}
                                image2={project.image2}
                                image3={project.image3}
                            />
                        ))
                    ) : (
                        <NoDataMensage type="noData" msg="Nenhum dado encontrado!" />
                    )
                )}
            </section>
        </div>
    )
}

export default Projects