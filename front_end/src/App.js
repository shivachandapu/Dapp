import React, { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';

import { Login } from './components/Login'
import { Register } from './components/Register'
import { Nav } from './components/Nav'


function App() {

  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. Please install MetaMask to work with the Application!')
    }
  }

  useEffect(() => {
    loadWeb3();
  }, []);

  return (
    <>
      <Nav />
      <div className='App' >
        {
          currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
        }
      </div>
    </>
  )
};

export default App;
