import React from 'react';
import {Container, Navbar, Dropdown} from "react-bootstrap";

export const Nav = () => {
    return(<>
        <Navbar bg="dark" expand="sm" variant='dark'>
            <Container>
                
                <Navbar.Brand href="http://localhost:3000">
                   Trove
                </Navbar.Brand>

                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-autoclose-true">Menu</Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="action-1">Logout</Dropdown.Item>
                        <Dropdown.Item href="action-2">Packoff</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

            </Container>
        </Navbar>
    </>
    )
};

// export default NavBar;