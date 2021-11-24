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
    
    const [balance,setBalance] = useState(0);
    let orders = [];

    // const user = location.state.user;
    // console.log(user);
   

    let locations = [];    

    useEffect(() => {
        axios.get("http://localhost:8080/location/all")
        .then((res) => {            
            locations = res.data;
            var ul = document.getElementById("all-slots");
            locations.forEach(loc => {
                var li = document.createElement("li");
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
            orders = res.data;
            console.log(orders);
            var ul = document.getElementById("order-list");
            orders.forEach(o => {
                let li = document.createElement("li");
                li.onclick = (e) => history.push("/orders/" + o.orderId, {order:o,user:user});
                li.appendChild(document.createTextNode(JSON.stringify(o)));
                console.log(li);
                ul.appendChild(li);
            });
        })
    },[]);

    const addBalance = () => {
        axios.post("http://localhost:8080/users/addBalance",null,{params:{
            id: user.id,
            amount:balance
        }});
    }

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
            <h2>All Locations </h2>
            <ul id="all-slots"></ul>
            <h2>Your Orders</h2>
            {/* <p>{JSON.stringify(orders)}</p> */}
            <ul id="order-list"></ul>
            <h2>Add Balance</h2>
            <input id="add-balance" placeholder="Add amount to Wallet" onChange={e => setBalance(e.target.value)} />
            <button id="add-balance-btn" onClick={addBalance}>Add to Wallet</button>
            <p>Current Balance: {user.balance}</p>
            
        </div>
        ) : <p>Not Logged In</p>
     );
}
 
export default Dashboard;