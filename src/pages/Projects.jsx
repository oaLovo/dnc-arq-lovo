import { useContext } from "react"
import Banner from "../components/Banner/banner"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import ProjectsList from "../components/ProjectsList/ProjectsList"

//CONTEXT
import { AppContext } from '../Contexts/AppContext'

function projects() {
    const appContext = useContext(AppContext)
    return (
        <>
            <Header />
            <Banner title={appContext.languages[appContext.language].menu.projects} image="Projetcts.jpg"/>
            <div className="container">
                <ProjectsList />
            </div>
            <Footer />
        </>
    )
}

export default projects