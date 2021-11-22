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
    
    const [orders,setOrders] = useState();

    // const user = location.state.user;
    // console.log(user);
   

    let locations = [];    

    useEffect(() => {
        axios.get("http://localhost:8080/location/all")
        .then((res) => {            
            locations = res.data;
            var ul = document.getElementById("all-slots");
            locations.forEach(loc => {
                var li = document.createElement(li);
                var a = document.createElement("a");
                a.append(document.createTextNode(JSON.stringify(loc)));
                console.log("Id: " + loc.id);
                a.href = "/location/" + loc.id;
                li.appendChild(a);
                ul.appendChild(li);
                
            });

        });

        axios.get("http://localhost:8080/orders/get",{params:{
            id:user.id
        }}).then(res => {
            setOrders(res.data);
            console.log(orders);
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
            <h2>Your Orders</h2>
            <p>{JSON.stringify(orders)}</p>
            
        </div>
        ) : <p>Not Logged In</p>
     );
}
 
export default Dashboard;