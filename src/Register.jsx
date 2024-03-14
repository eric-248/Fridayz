import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
//import css
import "./Authentication.css"

//define React functional componenet named 'Register'
export const Register = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        currUsername: '',
        currEmail: '',
        currPassword: '',
    })

    //function handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const {currUsername, currEmail, currPassword} = data;
        try {
            axios
            .post("http://localhost:5050/record/users/register", {
                email: currEmail, 
                username: currUsername,  
                password: currPassword,
            })
            .then((response) => {
              console.log(response.data);
              if (response.data.error) {
                window.alert(response.data.error); // Display error message in a pop-up
              }
              else{
                setData({});
                window.alert("Registration success!");
                navigate('/login');
                }
            })
        }
            catch(error){
                console.log(error);
            }
        
    };

    return (

        <div className="registration-page">
            
            <div className="auth-form-container">

                <h2>Register</h2>
                
                <form className="registration-form" onSubmit={handleSubmit}>

                <input
                        value={data.username}
                        onChange={(e) => setData({ ...data, currUsername: e.target.value })}
                        type="username"
                        placeholder="username"
                        id="username"
                        name="username"
                    />

                {/*Email*/}
                <input
                    value={data.email}
                    onChange={(e) => setData({ ...data, currEmail: e.target.value })}
                    type="email"
                    placeholder="abc@gmail.com"
                    id="email"
                    name="email"
                />

                {/*Password*/}
                <input
                    value={data.password}
                    onChange={(e) => setData({ ...data, currPassword: e.target.value })}
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