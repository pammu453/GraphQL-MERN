import { Navbar, Container} from 'react-bootstrap'

const Header = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">Project MGMT</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Header
