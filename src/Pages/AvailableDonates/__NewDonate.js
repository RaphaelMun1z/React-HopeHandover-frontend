import styles from './__NewDonate.module.css'
import { useState } from 'react';

function NewDonate() {

    const [formData, setFormData] = useState({});

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        enviarDados(formData);
    };

    async function enviarDados(dados) {
        try {
          // Adiciona a propriedade createdAt ao objeto formData
          dados = { ...dados, createdAt: new Date(), sold: 0 };

          console.log(dados)
      
          const response = await fetch("http://localhost:3000/product", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
          });
      
          if (!response.ok) {
            throw new Error("Não foi possível salvar os dados.");
          }
      
          alert("Dados salvos com sucesso!");
        } catch (error) {
          alert(error.message);
        }
      }
      
    return (
        <>
            <section className={styles.container}>
                <div className={styles.secTitle}>
                    <h1>Cadastrar produto</h1>
                    <p>
                        Aqui você é capaz de <b>adicionar</b> ao banco de dados novos produtos.
                    </p>
                </div>
                <div className={styles.containerForm}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.form_group}>
                            <label htmlFor="title">Título:</label>
                            <input type="text" id="titulo" name="title" required onChange={handleChange} />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="brand">Marca:</label>
                            <input type="text" id="marca" name="brand" required onChange={handleChange} />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="amount">Quantia:</label>
                            <input type="number" id="quantia" name="amount" required onChange={handleChange} />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="description">Descrição:</label>
                            <textarea id="descricao" name="description" onChange={handleChange}></textarea>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="assesment">Avaliação:</label>
                            <select id="avaliacao" name="assesment" onChange={handleChange}>
                                <option value="1">1 Estrela</option>
                                <option value="2">2 Estrelas</option>
                                <option value="3">3 Estrelas</option>
                                <option value="4">4 Estrelas</option>
                                <option value="5">5 Estrelas</option>
                            </select>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="price">Preço:</label>
                            <input type="number" id="preco" name="price" required onChange={handleChange} />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="active">Ativo:</label>
                            <input type="checkbox" id="ativo" name="active" value='true' onChange={handleChange} />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="section">Seção:</label>
                            <select id="secao" name="section" onChange={handleChange}>
                                <option value="eletronicos">Eletrônicos</option>
                                <option value="informatica">Informática</option>
                                <option value="moveis">Móveis</option>
                                <option value="moda">Moda</option>
                            </select>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="category">Categoria:</label>
                            <select id="categoria" name="category" onChange={handleChange}>
                                <option value="smartphones">Smartphones</option>
                                <option value="computadores">Computadores</option>
                                <option value="cadeiras">Cadeiras</option>
                                <option value="vestidos">Vestidos</option>
                            </select>
                        </div>

                        <button type="submit">Salvar</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default NewDonate