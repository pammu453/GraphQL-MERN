import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <Navbar bg="light" data-bs-theme="light" className='mb-2'>
            <Link to={"/"} style={{textDecoration:"none"}}>
                <Navbar.Brand >Project MGMT</Navbar.Brand>
            </Link>
        </Navbar>
    )
}

export default Header
