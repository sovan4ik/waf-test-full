import React from 'react';
import { Container, Navbar, Badge } from "react-bootstrap";

const Copyright = () => {
    return (
        <Navbar>
            <Container>
                <Navbar.Text
                style={{fontSize: '.75em'}}
                >
                    Fullstack App(PostgreSQL, Node.js(Express, JWT), React(Redux, JWT, LocalStorage)
                </Navbar.Text>
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text
                style={{fontSize: '.75em'}}
                >
                    Created by 
                    <Badge 
                    pill
                    bg="light"
                    text="dark"
                    style={{fontSize: '1em'}}
                    >
                        <a href="https://github.com/sovan4ik" target="_blank">sovan4ik</a>
                    </Badge>
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Copyright;

