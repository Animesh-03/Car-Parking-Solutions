import './CSS/login.css'
import { useContext, useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import firebase from '../Others/firebase';
import { LoginContext } from './LoginContext';
import { UserContext } from './UserContext';
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'

const Login = () => {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const {user,setUser} = useContext(UserContext);
    const {isLoggedIn,setLoggedIn} = useContext(LoginContext);

    const history = useHistory();

    // console.log("initial: " + isLoggedIn);
    

    const HandleSignIn = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(password);
        

        axios.get("http://localhost:8080/users/get",{params:{
            "userID":username,
        }}).then((res) => {
            if(res.data.length != 0)
            {
                const user = res.data[0];
                if(user.password == password)
                {
                    console.log("Found User");
                    setLoggedIn(true);
                    setUser(user);
                    setTimeout(_ => {
                        console.log(isLoggedIn);
                        console.log(user);
                        localStorage.setItem("currentUser",JSON.stringify(user));
                        switch(user.role)
                        {
                            case "customer": history.push("/dashboard",{user:user}); break;
                            case "employee": history.push("/employee",{user:user}) ; break;
                            case "admin": history.push("/admin",{user:user}) ; break;
                        }
                    },500);
                    
                }
                else
                {
                    console.log("Password mis-match");
                }
            }
            else
            {
                console.log("Not found");
            }
        });

        


    }

    const handleGoogleSignIn = () => {

        //Console Logs user Info for now
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider)
        .then((result) => {
            const credeintial = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            console.log(user);
        }).catch((error) => {

        })

    }

    const handleFacebookSignIn = () => {

    }

    return ( 
        <div className="login">
            <div className="login-form">
                <form id="login-form" className="form-control">
                    <div className="logo">
                        <img width="150px" height="150px" />
                        <h2 className="logo-name">Project Name</h2>
                    </div>
                
                
                    <label htmlFor="username">Username</label>
                    <input 
                        id="username" className="form-control" placeholder="Enter Username"
                        value={username}
                        onChange= {(e) => {setUsername(e.target.value);}}
                    />

                    <br />

                    <label htmlFor="password">Password</label>
                    <input 
                        id="password" className="form-control" placeholder="Enter Password" autoComplete="off"
                        value={password}
                        onChange= {(e) => {setPassword(e.target.value);}}
                    />

                    <br />

                    <button 
                        id="submit-btn" className="btn btn-primary"
                        onClick= {(e) => {HandleSignIn(e);}}
                    >
                        Sign-in
                    </button>

                    <br /><br />

                    <div className="signin">
                        <button
                            type="button" className="btn btn-outline-secondary btn-sm "
                            onClick= {handleGoogleSignIn}
                        >
                            <img src="./icons/icons8-google.svg" width="24px" height="24px" />
                            Sign-in
                        </button>
                        
                        <button 
                            type="button" className="btn btn-outline-secondary btn-sm "
                            onClick= {handleFacebookSignIn}
                        >
                            <img src="./icons/icons8-facebook.svg" width="24px" height="24px" />
                            Sign-in
                        </button>
                    </div>

                    <br />

                    <a className="text-center" href=""><p>Forgot Password?</p> </a>
                </form>

            </div>
        </div>

     );
}
 
export default Login;