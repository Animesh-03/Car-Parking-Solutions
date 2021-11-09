import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { renderIntoDocument } from "react-dom/test-utils";
import { Link, useLocation, useParams, Router } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { LoginContext } from "./LoginContext";
import { UserContext } from "./UserContext";


const Dashboard = () => {
    const history = useHistory();
    const location = useLocation();
    const {isLoggedIn,setLoggedIn} = useContext(LoginContext);
    const {user,setUser} = useContext(UserContext);
    

    // const user = location.state.user;
    // console.log(user);
   

    let slots = [];    

    useEffect(() => {
        axios.get("http://localhost:8080/slots/all")
        .then((res) => {            
            slots = res.data;
            // console.log(slots[0].parkingSlotId);
            var ul = document.getElementById("all-slots");
            setTimeout(_ => {console.log(isLoggedIn);console.log(user);},3000)
            for(var i = 0; i < slots.length; i++)
            {
                // var a = document.createElement("a");
                // a.href= "/slots/" + slots[i].parkingSlotId;
                // a.appendChild(document.createTextNode((slots[i].location).toString()))
                // var li = document.createElement("li");
                // li.appendChild(a)
                // ul.appendChild(li);
                let sltID = slots[i].parkingSlotId;
                var li = document.createElement("li");
                li.appendChild(document.createTextNode((slots[i].location).toString()));
                console.log(slots[i]);
                li.onclick=() => {history.push("/slots/" +  sltID )}
                ul.appendChild(li);
            }
        })
    },[])

    console.log(isLoggedIn);
    // if(!isLoggedIn)
    // {
    //     console.log("Invalid Access");
    //     history.push("/login");
    //     return <p>Redirecting...</p>
    // }
    
    return (
        isLoggedIn ? (
            <div className="container-fluid">
            <h1>Hello, {user.username}</h1>
            <ul id="all-slots"></ul>
            
        </div>
        ) : <p>Not Logged In</p>
     );
}
 
export default Dashboard;