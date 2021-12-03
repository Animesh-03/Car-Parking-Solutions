import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LocationItem from "./LocationItem";
import OrderItem from "./OrderItem";


const Dashboard = () => {
    const history = useHistory();
    const location = useLocation();

    const tempUser = location.state.user;
    const [user,setUser] = useState();
    const [foundUser,setFoundUser] = useState(false);

    const [userBalance,setUserBalance] = useState(0);
    
    const [balance,setBalance] = useState(0);

    const [locations,setLocations] = useState();  
    const [foundLocations,setFoundLocations] = useState(false); 
    
    const [orders,setOrders] = useState();
    const [foundOrders,setFoundOrders] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/users/getById",{params:{
            id:tempUser.id
        }}).then(res => {
            setUser(res.data);  
            setUserBalance(res.data.balance);          
            setFoundUser(true);
            
        })

        axios.get("http://localhost:8080/location/all")
        .then((res) => {    
            setLocations(res.data);
            setTimeout(() => setFoundLocations(true),50);
        });

        axios.get("http://localhost:8080/orders/get",{params:{
            id:tempUser.id
        }}).then(res => {
            setOrders(res.data);
            setFoundOrders(true);
        })
    },[]);

    const addBalance = () => {
        axios.post("http://localhost:8080/users/addBalance",null,{params:{
            id: tempUser.id,
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
            <button id="logout-btn" onClick={() => history.push("/")}>Logout</button>
            <p id = "payment-p-green">Current Balance: { foundUser && userBalance}</p>
            <button id="edit-details" onClick={editDetails}>Edit Details </button>
            <div className="container-fluid">
                <h1>Hello, {foundUser && user.firstName}</h1>
                <h2>All Locations </h2>
                <div id="all-locations">{foundLocations && (locations.map((loc) => <LocationItem location={JSON.stringify(loc)} user={JSON.stringify(user)} admin={false} />))}</div>
                <h2>Your Orders</h2>
                <div id="order-list">{foundOrders && (orders.map((o) => <OrderItem order={o} user={user} admin={false} />))}</div>
                <h2>Add Balance</h2>
                <input id="add-balance" placeholder="Add amount to Wallet" onChange={e => setBalance(e.target.value)} />
                <button id="add-balance-btn" onClick={addBalance}>Add to Wallet</button>
            </div>
        </div>
            
     );
}
 
export default Dashboard;
