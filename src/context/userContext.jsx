import axios from 'axios';
import {createContext, useState, useEffect} from 'react';

export const UserContext = createContext({});

function parseCookies(cookieString) {
    const parsedCookies = {};
    const cookiePairs = cookieString.split(';');
    cookiePairs.forEach(cookiePair => {
        const [key, value] = cookiePair.trim().split('=');
        parsedCookies[key] = decodeURIComponent(value);
    });
    return parsedCookies;
}


export function UserContextProvider({children}){
    const [user, setUser] = useState(null);

    useEffect(() => {
        if(!user) {
            const cookies = parseCookies(document.cookie);
            axios.post('http://localhost:5050/record/users/current', 
            {
                email: cookies.email, 
                password: cookies.password,
                _id: cookies._id,
                username: cookies.username,
            }).then((response) => {
                if (response.data.error) {
                    window.alert(response.data.error); 
                  }
                else{
                    setUser(response.data);
                }
              });
        }
    }, []);
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}