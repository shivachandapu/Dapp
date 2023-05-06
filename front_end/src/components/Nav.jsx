import React from 'react';
import {Container, Navbar, Dropdown} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export const Nav = () => {
    let navigate = useNavigate();
    
    const [login, setLogin] = useState(true);
    
    const handleLogout = () => {
        navigate('/',{replace:true});
        login = false;
    }

    return(<>
        <Navbar bg="dark" expand="sm" variant='dark'>
            <Container>
                
                <Navbar.Brand href="http://localhost:3000">
                   Trove
                </Navbar.Brand>

                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-autoclose-true">Menu</Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                
            </Container>
        </Navbar>
    </>
    )
};

// export default NavBar;