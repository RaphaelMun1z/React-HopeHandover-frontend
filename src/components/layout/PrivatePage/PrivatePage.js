import styles from './PrivatePage.module.scss'
import img1 from '../../../img/401.png'
import { useNavigate } from 'react-router-dom';

const PrivatePage = () => {
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate('/');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Ops! Página restrita.</h1>
            <img src={img1} alt="Página não encontrada" className={styles.image} />
            <p className={styles.message}>
                Você não tem acesso a esta página.
            </p>
            <button onClick={handleRedirect}>Ir para a Raiz</button>
        </div>
    );
};

export default PrivatePage;