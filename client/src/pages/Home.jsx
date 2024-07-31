import AddCLientModel from "../components/AddClientModel"
import AddProjectModel from "../components/AddProjectModel"
import Clients from "../components/Clients"
import Projects from "../components/Projects"


const Home = () => {
    return (
        <>
            <div className="d-flex">
                <AddCLientModel />
                <AddProjectModel />
            </div>
            <Projects />
            <Clients />
        </>
    )
}

export default Home
