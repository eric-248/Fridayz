import React, {useState} from "react";
import {Link} from 'react-router-dom';

//import css
import "./Authentication.css"

//define React functional componenet named 'Register'
export const Register = () => {

    //create useStates
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    //function handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (

        <div className="registration-page">
            
            <div className="auth-form-container">

                <h2>Register</h2>
                
                <form className="registration-form" onSubmit={handleSubmit}>

                {/* Name*/}
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    id="name"
                    placeholder="Full Name"
                />

                {/*Email*/}
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="abc@gmail.com"
                    id="email"
                    name="email"
                />

                {/*Password*/}
                <input
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password"
                />
               
                {/*Register Button */}
                <button>Register</button>

                {/*Login if already have account*/}
                <Link to="/login" style={{color: 'white'}}>Already have an account? Login.</Link>

                </form>
            </div>

        </div>

        
    )
}