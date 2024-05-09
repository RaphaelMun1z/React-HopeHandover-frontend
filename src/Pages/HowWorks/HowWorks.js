import HowItWorks from "../HowItWorks/HowItWorks"
import ContentSection from "../../components/ContentSection/ContentSection"

import img1 from '../../img/imgCarousel1.png'
import img2 from '../../img/imgCarousel2.png'
import img3 from '../../img/imgCarousel3.png'

function HowWorks() {
    return (
        <>
            <HowItWorks />
            <ContentSection 
                title='Passo 1'
                paragraph='Crie uma conta como pessoa física ou jurídica.'
                btnText='Saiba Mais'
                img={img1}
                type={1}
            />
            <ContentSection
                title='Passo 2'
                paragraph="Primeiramente, crie um projeto. Acesse o ícone 'engrenagem' → Minha Área → Criar Novo Projeto"
                btnText='Saiba Mais'
                img={img2}
                type={2}
            />
            <ContentSection
                title='Passo 3'
                paragraph="Acesse: Ver Meus Projetos → Adicionar Item. Agora é só fornecer as informações e publicar."
                btnText='Saiba Mais'
                img={img3}
                type={1}
            />
        </>
    )
}

export default HowWorks