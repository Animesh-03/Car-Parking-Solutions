import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { UserContext } from "./UserContext";

const EmployeeDashboard = () => {

    const location = useLocation();
    const user = location.state.user;
    console.log(user);
    let slots;
    let [temp,setTemp] = useState();

    useEffect(() => {
        axios.get("http://localhost:8080/slots/get",{params:{
            "id":user.assignedTo
        }}).then((res) => {
            slots = res.data; 
            console.log(slots)
            setTemp(JSON.stringify(slots));
        })
    },[])

    return ( 
        <div className="employee-dashboard">
            <h1>Employee Name: {user.firstName}</h1>
            <p>{temp}</p>
        </div>
     );
}
 
export default EmployeeDashboard;