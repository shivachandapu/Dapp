import React, {useState} from 'react';
import './App.css';

import {Login} from './components/components_2/Login'
import {Register} from './components/components_2/Register'
import {Nav} from './components/components_2/Nav'

function App () {
  const [currentForm, setCurrentForm] = useState('login');
  
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  
  return (
    <>
    <Nav/>
    <div className='App' >
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      } 
 
    </div>
    </>
  )
};

export default App;
