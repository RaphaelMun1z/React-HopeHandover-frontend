import styles from './Home.module.scss'
import Landing from "./Landing/Landing"
import ContentCards from "../../components/ContentCards/ContentCards"
import HowItWorks from '../HowItWorks/HowItWorks';
import Contact from '../../components/ContactForm/ContactForm';

function Home() {
    return (
        <>
            <Landing />
            <ContentCards />
            <HowItWorks tipo='1' />
            <HowItWorks tipo='2' />
            <Contact />
        </>
    )
}

export default Home