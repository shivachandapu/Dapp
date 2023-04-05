import React, {useState} from "react"

export const Login = (props) => {
    const [address, setAddress] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(address);
    }

    return (
        <div className="auth-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlfor="address">Address</label>
                <input checked value={address} onChange={(e) => setAddress(e.target.value)} type="address" placeholder="Enter Metamask address" id="address" name="address"/>

                <label htmlfor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Enter password" id="password" name="password"/>
                
                <br/>
                <button type="submit">Log In</button>
            </form>

            <button className="link-btn" onClick={() => props.onFormSwitch('register')} >Don't have an account? Register here.</button>
        </div>
    )
}