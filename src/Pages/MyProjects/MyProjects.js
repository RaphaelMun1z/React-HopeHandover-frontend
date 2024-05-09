import styles from './MyProjects.module.scss'
import Axios from "axios";
import { toast } from "react-toastify";
import { motion } from 'framer-motion'
import { useEffect, useState, useRef, useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext'

// Components
import ProjectCard from '../Projects/Card/ProjectCard'

import img1 from '../../img/projetosocial.png'
import img2 from '../../img/projetosocial.png'
import img3 from '../../img/projetosocial.png'
import img4 from '../../img/projetosocial.png'
import img5 from '../../img/projetosocial.png'
import NoDataMensage from '../../components/NoDataMensage/NoDataMensage';

const images = [img1, img2, img3, img4, img5]

function MyProjects() {
    const carousel = useRef()
    const [width, setWidth] = useState(0)
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true);
    const { authuser } = useContext(AuthContext)

    useEffect(() => {
        getProjects()
        setWidth(window.innerWidth - (carousel.current?.scrollWidth) / 2)
    }, [])

    Axios.defaults.withCredentials = true;

    const getProjects = async () => {
        try {
            const response = await Axios.get('http://localhost:8080/projects/' + authuser.id);
            if (response.status === 201) {
                setProjects(response.data.projects);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.error('Erro na solicitação:', error);
            toast.error('Ocorreu um erro na solicitação!');
            setLoading(false);
        }
    };

    return (
        <>
            <section className={styles.container}>
                <div className={styles.secTitle}>
                    <h1>Meus projetos</h1>
                    <p>
                        Aqui você encontra seus <b>Projetos</b>.
                    </p>
                </div>
                <div className={styles.containerProjects}>
                    {projects.filter(project => project.status === 1).length > 0 && (
                        <div className={styles.secTitle}>
                            <h1>Em andamento</h1>
                        </div>
                    )}
                    <motion.div ref={carousel} className={styles.carousel} whileTap={{ cursor: "grabbing" }}>
                        <motion.div className={styles.inner}
                            drag="x"
                            dragConstraints={{ right: 0, left: -width }}
                            dragElastic={0.2}
                            initial={{ x: 100 }}
                            animate={{ x: 0 }}
                        >
                            {loading ? (
                                <p>Carregando projetos...</p>
                            ) : Array.isArray(projects) && projects.length > 0 ? (
                                projects
                                    .filter(project => project.status === 1)
                                    .map((MyProject) => (
                                        <motion.div className={styles.item} key={MyProject.id} >
                                            <ProjectCard event={MyProject.event} saved={MyProject.user} project_id={MyProject.id} title={MyProject.title} username={MyProject.user.firstname} image1={MyProject.image1} image2={MyProject.image2} image3={MyProject.image3} personalProject={true} status={MyProject.status} />
                                        </motion.div>
                                    ))
                            ) : (
                                <NoDataMensage type="noData" msg="Nenhum projeto em andamento encontrado!" />
                            )}
                        </motion.div>
                    </motion.div>
                    {projects.filter(project => project.status === 0).length > 0 && (
                        <div className={styles.secTitle}>
                            <h1>Finalizados</h1>
                        </div>
                    )}
                    <motion.div ref={carousel} className={styles.carousel} whileTap={{ cursor: "grabbing" }}>
                        <motion.div className={styles.inner}
                            drag="x"
                            dragConstraints={{ right: 0, left: -width }}
                            initial={{ x: 100 }}
                            animate={{ x: 0 }}
                        >
                            {loading ? (
                                <NoDataMensage type="loading" msg="Buscando dados!" />
                            ) : Array.isArray(projects) && projects.length > 0 ? (
                                projects
                                    .filter(MyProject => MyProject.status === 0)
                                    .map((MyProject) => (
                                        <motion.div className={styles.item} key={MyProject.id} >
                                            <ProjectCard event={MyProject.event} saved={MyProject.user} project_id={MyProject.id} title={MyProject.title} username={MyProject.user.firstname} image1={MyProject.image1} image2={MyProject.image2} image3={MyProject.image3} personalProject={true} status={MyProject.status} />
                                        </motion.div>
                                    ))
                            ) : (
                                <NoDataMensage type="noData" msg="Nenhum projeto finalizado encontrado!" />
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}

export default MyProjects