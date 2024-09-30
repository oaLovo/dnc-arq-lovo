import { useContext, useState, useEffect} from 'react'

//ASSETS
import './ProjectsList.css'
import likeFilled from '../../assets/like-filled.svg'
import likeOutLine from '../../assets/like.svg'

//COMPONENTS
import Button from '../Button/Button'

//CONTEXT
import { AppContext } from '../../Contexts/AppContext'

// UTILS
import { getApiData } from '../../Services/apiServices'

function ProjectsList() {
    const [projects, setProjects] = useState([])
    const appContext = useContext(AppContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectsResponse = await getApiData(`projects`)
                setProjects(projectsResponse)
            } catch {
                setProjects([])
            }
        }

        fetchData()
    }, [])

     // FAV PROJECTS

    const [favProjects, setFavProject] = useState([])

    useEffect(() =>{
        const savedFavProjects = JSON.parse(sessionStorage.getItem('favProjects'))
        if (savedFavProjects) {
            setFavProject(savedFavProjects)
        }
    }, [])

    const handleFavProjects = (id) => {
        setFavProject((prevFavProjects) => {
            if (prevFavProjects.includes(id)) {
                const filtedArray = prevFavProjects.filter((projectId) => projectId !== id)
                sessionStorage.setItem('favProjects', JSON.stringify(filtedArray))
                return prevFavProjects.filter((projectId) => projectId !== id)
            } else {
                sessionStorage.setItem('favProjects', JSON.stringify([...prevFavProjects, id]))
                return [...prevFavProjects, id]
            }
        })
    }


    
    return(
        <div className="Projects-section">
            <div className="Projects-hero">
                <h2>{appContext.languages[appContext.language].projects.title} </h2>
                <p>{appContext.languages[appContext.language].projects.subtitle} </p>
            </div>
            <div className="projects-grid">
                { projects ? 
                        projects.map((project) => (
                            <div className="projects-card d-flex jc-center al-center fd-column" key={project.id}>
                                <div
                                    className="thumb tertiary-background"
                                    style={{ backgroundImage: `url(${project.thumb})`}}>
                                    </div>
                                <h3>{project.title}</h3>
                                <p>{project.subtitle}</p>
                                <Button buttonStyle="unstyled"
                                onClick={() => handleFavProjects(project.id)}>
                                    <img src={favProjects.includes(project.id) ? likeFilled : likeOutLine} height="20px" />
                                </Button>
                            </div>
                    ))
                    : null
                }
            </div>
        </div>
    )

}

export default ProjectsList