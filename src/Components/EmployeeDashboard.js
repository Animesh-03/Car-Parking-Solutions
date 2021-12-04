import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import OrderItem from "./OrderItem";

const EmployeeDashboard = () => {

    const location = useLocation();
    const history = useHistory();

    const emp = location.state.user;
    const [orders,setOrders] = useState();
    const [foundOrders,setFoundOrders] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/orders/getInLocation",{params:{
            id:emp.assignedTo
        }}).then((res) => {
            setOrders(res.data);
            setFoundOrders(true);
        })
    },[])

    let slotNumber = 1;
    return ( 
        <div className="employee-dashboard">
            <button id="logout-btn" onClick={() => history.push("/")}>Logout</button>
            <h1>Employee Name: {emp.firstName}</h1>
            <p>Assigned To: {emp.assignedTo}</p>
            <p>Your Rating: {emp.rating}</p>
            <p>Number of orders completed: {emp.numberOfOrders}</p>
            <div id="assigned-slots">
            {foundOrders && (orders.map((o) => <OrderItem order={o} user={null} admin={false} emp={true} />))}
            </div>
        </div>
     );
}
 
export default EmployeeDashboard;