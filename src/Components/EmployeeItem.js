import axios from "axios";
import { useEffect, useState } from "react";

const EmployeeItem = (props) => {

    const employee = props.employee;

    const [locationAssigned,setLocationAssigned] = useState();
    const [foundLocationAssigned,setFoundLocation] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/location/get",{params:{
            id:employee.assignedTo
        }}).then(res => {
            setLocationAssigned(res.data);
            setFoundLocation(true);
        })
    },[])


    return ( 
        <div id="employee-item">
            <h3>Employee Name: {employee.firstName}  ID: {employee.id}</h3>
            <p>Assigned to location: <b>{foundLocationAssigned && locationAssigned.location + " Location ID: " + locationAssigned.id} </b> </p>
            <p>Number of Orders completed: <b>{employee.numberOfOrders}</b>, Rating: <b>{employee.rating}</b></p>
        </div>
     );
}
 
export default EmployeeItem;