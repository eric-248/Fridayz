import React, {useState} from "react";
import {Link} from 'react-router-dom';
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
        <form onSubmit={handleSubmit}>

                {/* Name*/}
                <label for="name">Name</label>
                <input value={name} name="name" id="name" placeholder="Full Name" />

                {/*Email*/}
                <label for="email">Email</label>
                <input value = {email} type="email" placeholder="abc@gmail.com" id="email" name="email"/>

                {/*Password*/}
                <label for="password">Password</label>
                <input value = {pass} type="password" placeholder="******" id="password" name="password"/>

                {/*Login if already have account*/}
                <Link to="/login">Already have an account? Login.</Link>

            </form>
    )
}