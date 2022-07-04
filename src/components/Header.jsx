import React from 'react';
import { Container, Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate()

    const logoutComponent = () => {
        if (localStorage.getItem('id') !== null) {
            return (
                <Nav>
                    <Container>
                        <Nav.Link onClick={toRanking} style={{ color: 'white' }}>Ranking Anual</Nav.Link>
                    </Container>
                    <Container>
                        <Nav.Link onClick={logout} style={{ color: 'white' }}>Logout</Nav.Link>
                    </Container>
                </Nav>
            )
        }
    }

    const toRanking = () => {
        navigate('/ranking')
    }

    const datos = () => {
        if (localStorage.getItem('id') !== null) {
            return (
                <Nav>
                    <Container>
                        <Navbar.Text style={{ color: 'white', fontWeight: 'bold' }}>
                            {localStorage.getItem('username')}
                        </Navbar.Text>
                    </Container>
                    <Container>
                        <Navbar.Text style={{ color: 'white' }}>
                            Puntaje Anual: {localStorage.getItem('puntajeAnual')}
                        </Navbar.Text>
                    </Container>
                    <Container>
                        <Navbar.Text style={{ color: 'white' }}>
                            Puntaje Total: {localStorage.getItem('puntajeTotal')}
                        </Navbar.Text>
                    </Container>
                    <Container>
                        <Navbar.Text style={{ color: 'white' }}>
                            Nivel: {localStorage.getItem('nivel')}
                        </Navbar.Text>
                    </Container>
                </Nav>
            )
        }
    }

    const logout = () => {
        localStorage.removeItem('id')
        localStorage.removeItem('token')
        localStorage.removeItem('puntajeAnual')
        localStorage.removeItem('puntajeTotal')
        localStorage.removeItem('nivel')
        navigate('/')
    }

    return (
        <div>
            <Navbar bg="dark" expand='lg'>
                <Container fluid>
                    <Navbar.Brand href='/' style={{ color: "white" }}>CodeMasters</Navbar.Brand>
                    {datos()}
                    {logoutComponent()}

                </Container>
            </Navbar>
            <br />
        </div>
    );
}

export default Header;