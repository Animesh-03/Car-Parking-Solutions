import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { renderIntoDocument } from "react-dom/test-utils";
import { Link, useLocation, useParams, Router } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LocationItem from "./LocationItem";
import { LoginContext } from "./LoginContext";
import OrderItem from "./OrderItem";
import { UserContext } from "./UserContext";


const Dashboard = () => {
    const history = useHistory();
    const location = useLocation();
    const {isLoggedIn,setLoggedIn} = useContext(LoginContext);
    const tempUser = location.state.user;
    const [user,setUser] = useState(tempUser);
    const [userBalance,setUserBalance] = useState(user.balance);
    
    const [balance,setBalance] = useState(0);
    

    const [locations,setLocations] = useState();  
    const [foundLocations,setFoundLocations] = useState(false); 
    
    const [orders,setOrders] = useState();
    const [foundOrders,setFoundOrders] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/location/all")
        .then((res) => {    
            setLocations(res.data);
            setFoundLocations(true);
        });

        axios.get("http://localhost:8080/orders/get",{params:{
            id:user.id
        }}).then(res => {
            setOrders(res.data);
            setFoundOrders(true);
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
                <ul id="all-locations">{foundLocations && (locations.map((loc) => <LocationItem location={JSON.stringify(loc)} user={JSON.stringify(user)} admin={false} />))}</ul>
                <h2>Your Orders</h2>
                {/* <p>{JSON.stringify(orders)}</p> */}
                <ul id="order-list">{foundOrders && (orders.map((o) => <OrderItem order={o} user={user} />))}</ul>
                <h2>Add Balance</h2>
                <input id="add-balance" placeholder="Add amount to Wallet" onChange={e => setBalance(e.target.value)} />
                <button id="add-balance-btn" onClick={addBalance}>Add to Wallet</button>
            </div>
        </div>
            
     );
}
 
export default Dashboard;