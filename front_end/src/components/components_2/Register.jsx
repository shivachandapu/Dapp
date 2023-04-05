import React ,{useState} from 'react';
import Registers from "../contracts/Register.json";

export const Register = (props) => {
    const [name,  setName] = useState('');
    const [address, setAddress] = useState('');
    const [pass,  setPass] = useState('');
    const [conPass,  setConPass] = useState('');
      
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(address);
    }

    return (
        <div className="auth-form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlfor="name">User Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter username" id="name" name="name"/>

                <label htmlfor="address">Address</label>
                <input value={address} onChange={(e) => setAddress(e.target.value)} type="address" placeholder="Enter Metamask address" id="address" name="address"/>

                <label htmlfor="password">Password</label>
                <input value={pass}  type="password" placeholder="Enter your password" id="password" name="password"/>

                <label htmlfor="password">Conform Password</label>
                <input value={conPass}  type="password" placeholder="Enter your password" id="password" name="password"/>
                
                <br/>
                <button type="submit">Register</button>
            </form>

            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Log In </button>
        </div>
    )
}