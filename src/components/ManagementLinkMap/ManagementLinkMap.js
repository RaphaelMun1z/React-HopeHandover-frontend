import styles from './ManagementLinkMap.module.scss'
import { Link } from 'react-router-dom'

// Icons
import { FaHandsHelping } from 'react-icons/fa';
import { RiMapPinLine, RiGlobalLine, RiAccountPinBoxLine, RiChatHeartFill, RiMagicLine, RiFileListLine, RiPlayListAddLine } from 'react-icons/ri';

function ManagementLinkMap() {
    return (
        <section className={styles.container}>
            <div className={styles.mapLinkTitleContainer}>
                <h1>Mapa Administrativo</h1>
                <p>
                    Aqui você encontra <b>Links</b> disponíveis para facilitar sua navegação no sistema.
                </p>
            </div>
            <div className={styles.cardsContainer}>
                <Link to="/projects/my" className={styles.card}>
                    <div className={styles.content}>
                        <div className={styles.iconContainer}>
                            <RiFileListLine/>
                        </div>
                        <div className={styles.textContainer}>
                            <p>Ver meus projetos</p>
                        </div>
                    </div>
                </Link>
                <Link to="/projects/register" className={styles.card}>
                    <div className={styles.content}>
                        <div className={styles.iconContainer}>
                            <RiPlayListAddLine />
                        </div>
                        <div className={styles.textContainer}>
                            <p>Criar novo projeto</p>
                        </div>
                    </div>
                </Link>
                <Link to="/projects/saved" className={styles.card}>
                    <div className={styles.content}>
                        <div className={styles.iconContainer}>
                            <RiMagicLine/>
                        </div>
                        <div className={styles.textContainer}>
                            <p>Projetos salvos</p>
                        </div>
                    </div>
                </Link>
                <Link to="/donates/gived" className={styles.card}>
                    <div className={styles.content}>
                        <div className={styles.iconContainer}>
                            <FaHandsHelping/>
                        </div>
                        <div className={styles.textContainer}>
                            <p>Doações realizadas</p>
                        </div>
                    </div>
                </Link>
                <Link to="/acknowledgment"  className={styles.card}>
                    <div className={styles.content}>
                        <div className={styles.iconContainer}>
                            <RiChatHeartFill/>
                        </div>
                        <div className={styles.textContainer}>
                            <p>Agradecimentos recebidos</p>
                        </div>
                    </div>
                </Link>
                <Link to="/profile"  className={styles.card}>
                    <div className={styles.content}>
                        <div className={styles.iconContainer}>
                            <RiAccountPinBoxLine/>
                        </div>
                        <div className={styles.textContainer}>
                            <p>Editar conta</p>
                        </div>
                    </div>
                </Link> 
                <Link to="/donates/published"  className={styles.card}>
                    <div className={styles.content}>
                        <div className={styles.iconContainer}>
                            <RiGlobalLine/>
                        </div>
                        <div className={styles.textContainer}>
                            <p>Situação dos itens publicados</p>
                        </div>
                    </div>
                </Link>   
                <Link to="/addresses/register"  className={styles.card}>
                    <div className={styles.content}>
                        <div className={styles.iconContainer}>
                            <RiMapPinLine/>
                        </div>
                        <div className={styles.textContainer}>
                            <p>Cadastrar endereço</p>
                        </div>
                    </div>
                </Link> 
            </div>
        </section>
    )
}

export default ManagementLinkMap