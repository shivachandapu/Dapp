import React, { useState, useEffect } from "react";
import RegisterContract from "../contracts/Register.json";
import { useNavigate } from "react-router-dom";
import { Nav } from "./Nav";
import UploadButton from "./UploadButton";
import "./Login"

const Home = () => {
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

  return (
    <div>
      <Nav/>
      <div className="home-page">
      <UploadButton ctr={contract} acc={account} />
      </div>      
    </div>
  );
};

export default Home;
