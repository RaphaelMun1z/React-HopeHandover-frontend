import { useEffect, useState } from 'react';
import Axios from "axios";
import { toast } from "react-toastify";
import styles from './AboutProject.module.scss'
import { useParams } from 'react-router-dom';
import NoDataMensage from '../../components/NoDataMensage/NoDataMensage';

import PageNotFound from '../../components/layout/PageNotFound/PageNotFound';

import { AiOutlinePhone, AiOutlineInfoCircle } from 'react-icons/ai';
import { SiGooglestreetview } from 'react-icons/si';
import { MdPublish } from 'react-icons/md';
import { RxUpdate } from 'react-icons/rx';
import { BsBuilding, BsPersonCircle } from 'react-icons/bs';

function AboutProject() {
    const { project_id } = useParams();
    const [project, setProject] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProject()
    }, [])

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

    useEffect(() => {

    }, [project])

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            {loading ? (
                <p>Carregando dados do projeto...</p>
            ) : (
                project.id ? (
                    <>
                        <section className={styles.container}>
                            <div className={styles.projectHeader}>
                                <div className={styles.projectData}>
                                    <h1 className={styles.title}>{project.title}</h1>
                                    <p className={styles.description}>{project.description}</p>
                                    <div className={styles.mainImagesContainer}>
                                        <div className={styles.imageContainer}>
                                            <img src={`http://localhost:8080/images/${project.image1}`} />
                                        </div>
                                        <div className={styles.imageContainer}>
                                            <img src={`http://localhost:8080/images/${project.image2}`} />
                                        </div>
                                        <div className={styles.imageContainer}>
                                            <img src={`http://localhost:8080/images/${project.image3}`} />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.projectData}>
                                    <h3 className={styles.generalData}>{project.user.usertype === 2 ? (<><BsBuilding /><i>Pessoa jurídica</i> </>) : (<><BsPersonCircle /><i>Pessoa física</i> </>)}{project.user.firstname}</h3>
                                    <h3 className={styles.generalData}><AiOutlinePhone />{project.contact}</h3>
                                    <h3 className={styles.generalData}><SiGooglestreetview />{project.address.street} {project.address.number}, {project.address.district}, {project.address.city} - {project.address.uf}</h3>
                                    <h3 className={styles.generalData}><AiOutlineInfoCircle />{project.event}</h3>
                                    <h3 className={styles.generalData}><MdPublish />{formatDate(project.createdAt)}</h3>
                                    <h3 className={styles.generalData}><RxUpdate />{formatDate(project.updatedAt)}</h3>
                                </div>
                            </div>
                        </section>
                        <section className={styles.midiaMainContainer}>
                            <div className={styles.midiaContainer}>
                                <h1 className={styles.title}>Fotos</h1>
                                <div className={styles.picturesContainer}>
                                    {project.projectmidia.length > 0 ? (
                                        project.projectmidia.map((midia) => {
                                            return <div className={styles.contentBase}>
                                                <h3>{midia.description}</h3>
                                                <div className={styles.picture}>
                                                    <img src={`http://localhost:8080/images/${midia.image}`} alt="Imagem" />
                                                </div>
                                                <p>{formatDate(midia.created_at)}</p>
                                            </div>;
                                        })
                                    ) : (
                                        <NoDataMensage type="noData" msg="Nenhuma mídia encontrada!" />
                                    )
                                    }
                                </div>
                            </div>
                        </section>
                    </>
                ) : (
                    <PageNotFound />
                )
            )}
        </>
    )
}

export default AboutProject