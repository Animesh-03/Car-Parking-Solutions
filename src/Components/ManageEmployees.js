import axios from 'axios';
import {useEffect, useState} from 'react'
import EmployeeItem from './EmployeeItem';

const ManageEmployees = () => {

    const [employees,setEmployees] = useState();
    const [foundEmployees,setFoundEmployees] = useState(false);

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [assignedTo,setAssignedTo] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const handleAddEmployee = (e) => {
        e.preventDefault();
        

        axios.post("http://localhost:8080/employee/add",null, {params:{
            "firstName":firstName,
            "lastName":lastName,
            "email":email,
            "phoneNumber":phoneNumber,
            "assignedTo":assignedTo,
            "userName":username,
            "password":password
        }}).then(res => {
            console.log(res);
        })
    }

    useEffect(() => {
        axios.get("http://localhost:8080/employee/all").then((res) => {setEmployees(res.data); setFoundEmployees(true)});
    },[])



    return (
        <div className="ManageEmployees">
            <h1>Add Employee </h1>
            <input id="employee-first-name" placeholder="Enter first name" onChange={e => setFirstName(e.target.value)} />
            <input id="employee-last-name" placeholder="Enter last name" onChange={e => setLastName(e.target.value)} />
            <input id="employee-email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
            <input id="employee-phone-number" placeholder="Enter phone number" onChange={e => setPhoneNumber(e.target.value)} />
            <input id="employee-assigned-to" placeholder="Enter assigned to" onChange={e => setAssignedTo(e.target.value)} />
            <input id="employee-username" placeholder="Enter username" onChange={e => setUsername(e.target.value)} />
            <input id="employee-password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
            <button id="employee-add-btn" onClick={handleAddEmployee} >Add</button>

            <h2>Employee List</h2>
            <ul>{foundEmployees && (employees.map((employee) => <EmployeeItem employee={employee} />))}</ul>
        </div>  
     );
}
 
export default ManageEmployees;