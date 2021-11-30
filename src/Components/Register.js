import "./CSS/register.css"
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import {getAuth,RecaptchaVerifier,signInWithPhoneNumber} from 'firebase/auth';


const Register = () => {

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [confPassword,setConfPassword] = useState("");
    const [email,setEmail] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [otp,setOtp] = useState("0");

    let history = useHistory();

    const auth = getAuth();
    const ConfigureRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('otp-generator', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              validateOtp();
            }
          }, auth);
    }

    const validateOtp = (e) => {
        e.preventDefault();
        ConfigureRecaptcha();
        let number ="+91" + phoneNumber;
        signInWithPhoneNumber(auth,number,window.recaptchaVerifier)
            .then((response) => {
                window.confirmationResult=response;
                console.log("OTP Sent");
            }).catch((error) => {
                console.log(number);
                console.log(error);
                window.recaptchaVerifier.clear();
            })
    }

    const handleRegister = (e) => {
        e.preventDefault();

        
        axios.get("http://localhost:8080/users/get",{params:{
            userID:username
        }}).then(res => {
            let usernameExists = false;
            if(res.data.length != 0)
            {
                alert("Username already exists, please use a different username");
                setUserNameErrorMsg("Username already exists, please use a different username");
                console.log(userNameErrorMsg);
                usernameExists = true;
            }

            
            if(validateForm() && !usernameExists)
            {
                axios.post("http://localhost:8080/users/add",null,{params:{
                    firstName:firstName,
                    lastName:lastName,
                    username:username,
                    password:password,
                    email:email,
                    phoneNumber:phoneNumber
                }});
                history.push("/");
            }
        })
        

        
        
    }

    const [lastNameErrorMsg,setLastNameErrorMsg] = useState("");
    function lastNameError() {
        
        if(lastName == null || lastName == "")
        {
            setLastNameErrorMsg("First Name cannot be Empty");
            return !false;
        }
        else
        {
            setLastNameErrorMsg("");
            return !true;
        }
    }

    const [firstNameErrorMsg,setFirstNameErrorMsg] = useState("");
    function firstNameError() {
        
        if(firstName == null || firstName == "")
        {
            setFirstNameErrorMsg("First Name cannot be Empty");
            return !false;
        }
        else
        {
            setFirstNameErrorMsg("");
            return !true;
        }
    }

    const [userNameErrorMsg,setUserNameErrorMsg] = useState("");
    function userNameError() {
        
        if(username == null || username == "")
        {
            setUserNameErrorMsg("First Name cannot be Empty");
            return !false;
        }
        else
        {
            setUserNameErrorMsg("");
            return !true;
        }
    }

    const [passwordErrorMsg,setPasswordErrorMsg] = useState("");
    function passwordError() {
        
        if(password == null || password == "")
        {
            setPasswordErrorMsg("Password cannot be empty");
            return !false;
        }
        else if(password != confPassword)
        {
            setPasswordErrorMsg("Passwords do not match");
            return true;
        }
        else
        {
            setPasswordErrorMsg("");
            return !true;
        }
    }

    const [emailErrorMsg,setEmailErrorMsg] = useState("");
    function emailError() {
        let pattern = /[A-Za-z0-9]+@[a-z\-]+.[a-z]/;
        let result = pattern.test(email);
        console.log(result);
        
        if(!result)
        {
            setEmailErrorMsg("Invalid E-mail");
            return !false;
        }
        else
        {
            setEmailErrorMsg("");
            return !true;
        }
    }

    const [phoneErrorMsg,setPhoneErrorMsg] = useState("");
    function phoneNumberError() {
        let pattern = /^\d{10}/;
        let result = pattern.test(phoneNumber)

        if(!result)
        {
            setPhoneErrorMsg("Mobile Number invalid");
            return !false;
        }
        else
        {
            setPhoneErrorMsg("");
            return !true;
        }
    }

    function validateForm()
    {
        

        let bool = true;
        if(firstNameError())
        {
            bool = false;
            console.log("firstName error");
        }
            
        if(lastNameError())
        {
             bool = false;   
             console.log("lastName Error");
        }
            
        if(userNameError())
        {
            bool = false;
            console.log("userName error");
        }
            
        if(passwordError())
        {
            bool = false;
            console.log("passwordError");
        }
            
        if(emailError())
        {
            bool = false;
            console.log("Email error");
        }
            
        if(phoneNumberError())
        {
            bool = false;
            console.log("Phone error");
        }
        if(window.confirmationResult != undefined)
        {
            window.confirmationResult.confirm(otp).then((res) => {
                console.log("OTP match");
            }).catch((error) => {
                console.log(error);
                console.log("OTP Incorrect");
                window.recaptchaVerifier.clear();
                bool = false;
            })
        }
        
            
        return bool;
    }

    


    return (
        <div className='container register-container'>
            <div className="register-form">
                <form id="register-form" className="register-form">
                    <h1 className="register-h1">Registration Form</h1>
                    <br/>
                    <div className="row">
                        <div className="col-6">
                            <label className="form-label" htmlFor="first-name">First Name</label>
                            <input id="first-name" type="text" className="form-control first-name" placeholder="Last Name" required
                                value={firstName}
                                onChange = {(e) => setFirstName(e.target.value)}
                            />
                            <label className="text-danger" htmlFor="first-name">{firstNameErrorMsg}</label>
                        </div>
                        <div className="col-6">
                            <label className="form-label" htmlFor="last-name">First Name</label>
                            <input id="last-name" className="form-control last-name" placeholder="Last Name" required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <label className="text-danger" htmlFor="last-name">{lastNameErrorMsg}</label>
                        </div>
                    </div>
                    
                    <br/>
                    <div className="row">
                        <div className="col-6">
                            <label className="form-label" htmlFor="username">Username</label>
                            <input id="username" className="form-control register-username" placeholder="Username" required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label className="text-danger" htmlFor="first-name">{userNameErrorMsg}</label>
                        </div>
                        <div className="col-6">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input id="password" className="form-control register-password" placeholder="Password" required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className="text-danger" htmlFor="first-name">{passwordErrorMsg}</label>
                        </div>
                    </div>
                    <div className="row">
                        <label className="form-label" htmlFor="confirm-password">Confirm Password</label>
                        <input className="form-control" id="confirm-password" placeholder="Re-Enter Password" required
                            onChange={(e) => setConfPassword(e.target.value)} />
                    </div>
                    <br/>
                    <div className="row">
                        <label className="form-label" htmlFor="email-address">E-mail</label>
                        <input className="form-control" id="email-address" type="email" placeholder="E-mail" required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="text-danger" htmlFor="first-name">{emailErrorMsg}</label>
                    </div>
                    <br/>
                    <div className="row">
                        <label className="form-label" htmlFor="phone-number">Mobile Number</label>
                        <input className="form-control" id="phone-number" placeholder="Mobile Number" required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <button id="otp-generator" className="btn btn-sm btn-outline-secondary btn-otp"
                            onClick={validateOtp}
                        >Generate OTP</button>
                        <label className="text-danger" htmlFor="first-name">{phoneErrorMsg}</label>
                        <label className="form-label" htmlFor="register-otp">OTP</label>
                        <input className="form-control" id="register-otp" placeholder="OTP"
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                    <br/>
                    <button className="btn btn-primary" type="submit"
                        onClick={handleRegister}
                    >Register</button>
                </form>
            </div>
        </div>
      );
}
 
export default Register;