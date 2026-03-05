import React, { useState } from 'react'
import "../Style/Register.scss"
import FormGroup from '../Components/FormGroup'
import { Link } from 'react-router';

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    return (
        <main className='register-page'>
            <div className="form-container">
                <h1>Register</h1>
                <form>
                    <FormGroup
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        label="Name"
                        placeholder="Enter your name" />
                    <FormGroup
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email"
                        placeholder="Enter your email" />
                    <FormGroup
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        placeholder="Enter your password" />
                    <button className='button' type="submit">Register</button>
                </form>
                <p> Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </main>
    )
}

export default Register
