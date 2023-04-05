import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
// import Web3 from "web3";
// import LoginDetailsContract from "./contracts/LoginDetails.json";

// const web3 = new Web3("http://localhost:8545"); // Replace with your own node URL
// const contractAddress = "0x1234567890123456789012345678901234567890"; // Replace with your deployed contract address
// const contract = new web3.eth.Contract(LoginDetailsContract.abi, contractAddress);

export const Loginpage = () => {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");

        const handleUsernameChange = (event) => {
            setUsername(event.target.value);
        };

        const handlePasswordChange = (event) => {
            setPassword(event.target.value);
        };

        const handleSubmit = async (event) => {
            event.preventDefault();
            console.log("Submitted!");
            // await contract.methods.login(web3.utils.asciiToHex(username), web3.utils.asciiToHex(password)).send({ from: web3.eth.defaultAccount });
        };

        return (
            <Container className="my-5">
            <h1 className="text-center">Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={handleUsernameChange}
                />
                </Form.Group>
                <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                </Form.Group>
                <Button variant="primary" type="submit">
                Submit
                </Button>
            </Form>
            </Container>
        );
};

export default Loginpage;
