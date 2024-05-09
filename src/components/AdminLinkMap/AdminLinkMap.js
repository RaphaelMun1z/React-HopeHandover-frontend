import styles from './AdminLinkMap.module.scss'
import { Link } from 'react-router-dom'

// Icons
import { MdManageSearch, MdOutlineManageAccounts, MdContactSupport } from 'react-icons/md';
import { BsBox } from 'react-icons/bs';

function AdminLinkMap() {
    return (
        <section className={styles.container}>
            <div className={styles.mapLinkTitleContainer}>
                <h1>Mapa de Gerenciamento </h1>
                <p>
                    Aqui você encontra <b>Links</b> disponíveis para gerenciar o sistema geral.
                </p>
            </div>
            <div className={styles.cardsContainer}>
                <Link to="/adm/projects" className={styles.card}>
                    <div className={styles.content}>
                        <div className={styles.iconContainer}>
                            <MdManageSearch />
                        </div>
                        <div className={styles.textContainer}>
                            <p>Situação projetos</p>
                        </div>
                    </div>
                </Link>
                <Link to="/adm/users" className={styles.card}>
                    <div className={styles.content}>
                        <div className={styles.iconContainer}>
                            <MdOutlineManageAccounts />
                        </div>
                        <div className={styles.textContainer}>
                            <p>Situação usuários</p>
                        </div>
                    </div>
                </Link>
                <Link to="/adm/contacts" className={styles.card}>
                    <div className={styles.content}>
                        <div className={styles.iconContainer}>
                            <MdContactSupport />
                        </div>
                        <div className={styles.textContainer}>
                            <p>Mensagens Recebidas</p>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    )
}

export default AdminLinkMap