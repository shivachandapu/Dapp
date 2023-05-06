import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
import web3 from "web3";
import RegisterContract from "../contracts/Register.json";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const [address, setAddress] = useState("");
  const [pass, setPass] = useState("");
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  let navigate = useNavigate();

  async function loadBlockchainData() {
    const web3 = window.web3;
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();  
    setAccount(accounts);

    const networkId = await web3.eth.net.getId();
    const networkData = RegisterContract.networks[networkId];
    if (networkData) {
      const _contract = new web3.eth.Contract(
        RegisterContract.abi,
        networkData.address
      );
      setContract(_contract);
    } else {
      window.alert("Smart contract not deployed to detected network!");
    }
  }

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const handleLogin = async (e) => {
    
    e.preventDefault();
    let result = await contract.methods.login(address, pass).call();
    if (result ){  
        navigate('/home',{replace:true});
    } 
    else {
        window.alert("Wrong User Address or Password!")
    }

  };

  return (
    <div className="auth-form-container" >
      <form className="login-form" >
        <label htmlFor="address">Address</label>
        <input
          checked
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
          placeholder="Enter password"
          id="password"
          name="password"
        />

        <br />
        <button type="submit" onClick={(e) => (handleLogin(e))}>
          Log In
        </button>
       
      </form>
      
      <button className="link-btn" onClick={() => props.onFormSwitch("register")}>
        Don't have an account? Register here.
      </button>
    </div>
  );
};
