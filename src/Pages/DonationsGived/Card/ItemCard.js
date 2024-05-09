import styles from './ItemCard.module.scss'

function ItemCard(props) {

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className={styles.itemContainer}>
            <div className={styles.contentContainer}>
                <div className={styles.imgContainer}>
                    <img src={`http://localhost:8080/images/${props.dados.project.image1}`} alt="Imagem do projeto" />
                </div>
                <div className={styles.dataContainer}>
                    <h1>{props.dados.title}</h1>
                    <h3>
                        {props.dados.status === 0
                            ? 'Publicado'
                            : props.dados.status === 1
                                ? 'Em andamento'
                                : props.dados.status === 2
                                    ? 'Finalizado'
                                    : 'Cancelado pelo receptor'}
                    </h3>
                    <p>Projeto: {props.dados.project.title}</p>
                    <p>Quantidade: {props.dados.amount}</p>
                    <p>Publicado em: {formatDate(props.dados.createdAt)}</p>
                    <p>Finalizado em: {formatDate(props.dados.updatedAt)}</p>
                </div>
                <div className={styles.flagStatus}></div>
            </div>
        </div>
    )
}

export default ItemCard