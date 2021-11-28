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
    const tempUser = location.state.user;
    const [user,setUser] = useState(tempUser);
    const [userBalance,setUserBalance] = useState(user.balance);
    
    const [balance,setBalance] = useState(0);
    let orders = [];

    let locations = [];    

    useEffect(() => {
        axios.get("http://localhost:8080/location/all")
        .then((res) => {            
            locations = res.data;
            var ul = document.getElementById("all-locations");
            locations.forEach(loc => {
                var li = document.createElement("li");
                li.append(document.createTextNode(JSON.stringify(loc)));
                li.onclick = () => history.push("/location/" + loc.id,{user:user});
                li.id = "location-item";
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
                li.id = "order-item"; 
                console.log(li);
                ul.appendChild(li);
            });
        })
    },[]);

    const addBalance = () => {
        axios.post("http://localhost:8080/users/addBalance",null,{params:{
            id: user.id,
            amount:balance
        }}).then(res => {
            console.log(balance);
            
            setUserBalance(res.data.balance);
        });
    }

    const editDetails = () => {
        history.push("/editDetails",{user:user});
    }
    
    return (
        <div id="dashboard">
            <p>Current Balance: {userBalance}</p>
            <button id="edit-details" onClick={editDetails}>Edit Details </button>
            <div className="container-fluid">
                <h1>Hello, {user.firstName}</h1>
                <h2>All Locations </h2>
                <ul id="all-locations"></ul>
                <h2>Your Orders</h2>
                {/* <p>{JSON.stringify(orders)}</p> */}
                <ul id="order-list"></ul>
                <h2>Add Balance</h2>
                <input id="add-balance" placeholder="Add amount to Wallet" onChange={e => setBalance(e.target.value)} />
                <button id="add-balance-btn" onClick={addBalance}>Add to Wallet</button>
            </div>
        </div>
            
     );
}
 
export default Dashboard;