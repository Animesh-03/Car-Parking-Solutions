import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import SlotItem from "./SlotItem";

const EmployeeDashboard = () => {

    const location = useLocation();
    const history = useHistory();

    const emp = location.state.user;
    const [slots,setSlots] = useState();
    const [foundSlots,setFoundSlots] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/slots/getByLocation",{params:{
            id:emp.assignedTo
        }}).then((res) => {
            setSlots(res.data);
            setFoundSlots(true);
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
            {foundSlots && (slots.map((slt) => <SlotItem slot={slt} user={null} admin={true} slotNumber={slotNumber++}  />))}
            </div>
        </div>
     );
}
 
export default EmployeeDashboard;