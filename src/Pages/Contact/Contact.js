import ContentSection from "../../components/ContentSection/ContentSection"
import ContactForm from "../../components/ContactForm/ContactForm"
import img1 from '../../img/contact.png'

function Contact() {
    return (
        <>
            <ContentSection
                title='Entre em Contato por'
                paragraph='Aut vitae consequatur qui minima ipsa id libero repudiandae id voluptas amet qui officia suscipit. Aut praesentium voluptas rem illo aliquam ut minus doloremque qui saepe nisi non illum autem'
                btnText='Saiba Mais'
                img={img1}
                type={1}
            />
            <ContactForm/>
        </>
    )
}

export default Contact