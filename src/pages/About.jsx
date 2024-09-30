import { useContext } from "react"
import AboutText from "../components/AboutText/AboutText"
import Banner from "../components/Banner/Banner"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"

//CONTEXT
import { AppContext } from '../Contexts/AppContext'

function About() {
    const appContext = useContext(AppContext)
    return (
        <>
            <Header />
            <Banner title={appContext.languages[appContext.language].menu.about} image="About.jpg"/>
            <div className="container">
                <AboutText />
            </div>
            
            <Footer />
        </>
        
    )
}

export default About