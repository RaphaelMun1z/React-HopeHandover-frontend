import ContentSection from "../../components/ContentSection/ContentSection"
import ContentCards from "../../components/ContentCards/ContentCards"
import img1 from '../../img/aboutus.png'

function About() {
    return (
        <>
            <ContentSection
                title='Somos a equipe FindForMe'
                paragraph='Aut vitae consequatur qui minima ipsa id libero repudiandae id voluptas amet qui officia suscipit. Aut praesentium voluptas rem illo aliquam ut minus doloremque qui saepe nisi non illum autem'
                btnText='Saiba Mais'
                img={img1}
                type={2}
            />
            <ContentCards />
        </>
    )
}

export default About