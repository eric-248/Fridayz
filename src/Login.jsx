//to capture values of email and password
//state variables allow us to capture the values and perform further processing
import React, { useState } from "react";
//import Link
import {Link} from 'react-router-dom';

//define function Login
export const Login = () => {

    {/*
    - create states to store information 
    - these functions allow email and pass to have a 'state'
    - notice the the inital values are set to empty strings
    */}

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    // Function to handle state submission 
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (

        <>
            {/* link submit function via onSubmit
            onSubmit will fire the handleSubmit funvtion everytime a form is submitted */}
            <form onSubmit={handleSubmit}>

                {/*Email*/}
                <label for="email">Email</label>
                <input value = {email} type="email" placeholder="abc@gmail.com" id="email" name="email"/>

                {/*Password*/}
                <label for="password">Password</label>
                <input value = {pass} type="password" placeholder="******" id="password" name="password"/>

                {/*Add Button */}
                <button>Log In</button>

            </form>

            {/* add link to allow users to register */}
            <Link to="/register">Don't have an account? Register.</Link>
        </>
        
    )
}