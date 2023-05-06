import React, { useState, useEffect } from "react";
import web3 from "web3";
import RegisterContract from "../contracts/Register.json";

export const Register = (props) => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  async function loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    console.log(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const networkData = RegisterContract.networks[networkId];
    if (networkData) {
      const _contract = new web3.eth.Contract(
        RegisterContract.abi,
        networkData.address
      );
      setContract(_contract);
      
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
    console.log(contract);
  }

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pass, setPass] = useState("");
  const [conPass, setConPass] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    let isSame;
    pass === conPass ? (isSame = true) : (isSame = false);

    if (!isSame) {
      alert("Passwords did not match!");
    } else {
      let result = await contract.methods.register(address, name, pass).send({ from: account });
      console.log(result);
    }
  };

  return (
    <div className="auth-form-container">
      <form className="register-form" onSubmit={handleRegister}>
        <label htmlFor="name">User Name</label>
        <input
          value={name}
          type="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter username"
          id="name"
          name="name"
        />

        <label htmlFor="address">Address</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="address"
          placeholder="Enter Metamask address"
          id="address"
          name="address"
        />

        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="Enter your password"
          id="password"
          name="password"
        />

        <label htmlFor="password">Conform Password</label>
        <input
          value={conPass}
          onChange={(e) => setConPass(e.target.value)}
          type="password"
          placeholder="Conform your password"
          id="Conpassword"
          name="password"
        />

        <br />
        <button type="submit" onClick={(e) => (handleRegister(e))}>
          Register
        </button>
      </form>

      <button className="link-btn" onClick={() => props.onFormSwitch("login")}>
        Already have an account? Log In{" "}
      </button>
    </div>
  );
};
