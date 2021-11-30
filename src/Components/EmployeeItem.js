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
        });
    },[]);

    const handleDelete = () => {
        axios.post("http://localhost:8080/employee/delete",null,{params:{
            id: employee.id
        }}).then(res => console.log(res.data));
    }


    return ( 
        <div id="employee-item">
            <h4>Employee Name: {employee.firstName}  ID: {employee.id}</h4>
            <p>Assigned to location: <b>{foundLocationAssigned && locationAssigned.location + " Location ID: " + locationAssigned.id} </b> </p>
            <p>Number of Orders completed: <b>{employee.numberOfOrders}</b>, Rating: <b>{employee.rating}</b></p>
            <button id="employee-item-delete-btn" onClick={handleDelete}>Remove Employee</button>
        </div>
     );
}
 
export default EmployeeItem;