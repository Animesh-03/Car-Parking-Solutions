import './CSS/login.css'
import { useContext, useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import firebase from '../Others/firebase';
import { LoginContext } from './LoginContext';
import { UserContext } from './UserContext';
import {getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider} from 'firebase/auth'

const Login = () => {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const {user,setUser} = useContext(UserContext);
    const {isLoggedIn,setLoggedIn} = useContext(LoginContext);

    const history = useHistory();    

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
                        if(user.role != "admin" && (user.email == null || user.firstName == null || user.lastName == null || user.password == null || user.username == null || user.phoneNumber == null || user.carModel == null || user.carNumber == null || user.address == null || user.zipCode == null))
                        {
                            history.push("/editDetails",{user:user});
                        }
                        else
                        {
                            switch(user.role)
                            {
                                case "customer": history.push("/dashboard",{user:user}); break;
                                case "admin": history.push("/admin",{user:user}) ; break;
                            }
                        }
                        
                    },500);
                    
                }
                else
                {
                    console.log("Password mis-match");
                    alert("Incorrect username or password");
                }
            }
            else
            {
                axios.get("http://localhost:8080/employee/getByUsername",{params:{
                    userName:username
                }}).then(res => {
                    console.log(res.data);
                    const emp = res.data;
                    if(emp.password == password)
                    {
                        console.log("Employee found");
                        history.push("/employee",{user:emp});
                    }
                    else
                    {
                        console.log("Employee Not found");
                        alert("Incorrect username or password");
                    }
                })
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
            const GoogleUser = result.user;
            console.log(GoogleUser);

            let user;

            axios.get("http://localhost:8080/users/getByEmail",{params:{
                email:GoogleUser.email
            }}).then(res => {
                console.log(res);
                if(res.data == "")
                {
                    console.log("User does not exist");
                    axios.post("http://localhost:8080/users/emailAdd",null,{params:{
                        email:GoogleUser.email,
                        firstName:GoogleUser.displayName
                    }}).then(res => {
                        user = res.data;
                        console.log("New User created: " + user);
                        history.push("/editDetails",{user:user})
                    });
                }
                else
                {
                    user = res.data;
                    console.log("User exists");
                    if(user.role != "admin" && user.email == null || user.firstName == null || user.lastName == null || user.password == null || user.username == null || user.phoneNumber == null || user.carModel == null || user.carNumber == null || user.address == null || user.zipCode == null)
                    {
                        console.log("User existed with incomplete profile: " + user);
                        history.push("/editDetails",{user:user});
                    }
                    else
                    {
                        history.push("/dashboard",{user:user});
                    }
                }
                        
            });
            
        }).catch((error) => {
            console.log(error.message);

        });

    }

    const handleFacebookSignIn = () => {
        const provider = new FacebookAuthProvider();
        const auth = getAuth();

        signInWithPopup(auth,provider)
        .then(res => {
            const FacebookUser = res.user;
            console.log(FacebookUser);

            let user;

            axios.get("http://localhost:8080/users/getByEmail",{params:{
                email:FacebookUser.email
            }}).then(res => {
                console.log(res);
                if(res.data == "")
                {
                    console.log("User does not exist");
                    axios.post("http://localhost:8080/users/emailAdd",null,{params:{
                        email:FacebookUser.email,
                        firstName:FacebookUser.displayName
                    }}).then(res => {
                        user = res.data;
                        console.log("New User created: " + user);
                        history.push("/editDetails",{user:user})
                    });
                }
                else
                {
                    user = res.data;
                    console.log("User exists");
                    if(user.role != "admin" && user.email == null || user.firstName == null || user.lastName == null || user.password == null || user.username == null || user.phoneNumber == null || user.carModel == null || user.carNumber == null || user.address == null || user.zipCode == null)
                    {
                        console.log("User existed with incomplete profile: " + user);
                        history.push("/editDetails",{user:user});
                    }
                    else
                    {
                        history.push("/dashboard",{user:user});
                    }
                }
                        
            });
        })

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

                <button id="register-redirect" onClick={() => (history.push("/register"))}>Register Here</button>

            </div>
        </div>

     );
}
 
export default Login;
