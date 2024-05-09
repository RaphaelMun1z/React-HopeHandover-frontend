import styles from './PageNotFound.module.scss'
import img1 from '../../../img/404.png'
import LogoutButton from "../../LogoutButton/LogoutButton"

const PageNotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ops! Página não encontrada</h1>
      <img src={img1} alt="Página não encontrada" className={styles.image}/>
        <p className={styles.message}>
          Desculpe, a página que você está procurando não existe. Por favor, verifique a URL e tente novamente.
        </p>
        <LogoutButton />
    </div>
  );
};

export default PageNotFound;