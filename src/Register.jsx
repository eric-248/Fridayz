import React, {useState} from "react";
import {Link} from 'react-router-dom';

//import css
import "./Authentication.css"

//define React functional componenet named 'Register'
export const Register = () => {

    //create useStates
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [username, setUsername] = useState('');

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

                <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="username"
                        placeholder="username"
                        id="username"
                        name="username"
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