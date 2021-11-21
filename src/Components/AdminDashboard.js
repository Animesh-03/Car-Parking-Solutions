import { useState } from "react";
import { useLocation } from "react-router";
import AdminDash from "./AdminDash";
import ManageEmployees from "./ManageEmployees";
import ManageParkingSlots from "./ManageParkingSlots";

const AdminDashboard = () => {
    const location = useLocation();
    const user = location.state.user;
    var [currentComponent,setComponent] = useState("Dashboard");


    return ( 
        <div className="admin">
            <h1>{user.firstName}'s Dashboard</h1>
            <button onClick={_ => setComponent("Employees")}>Employees</button>
            <button onClick={_ => setComponent("ParkingSlots")}>Parking Slots</button>
            <button onClick={_ => setComponent("Dashboard")}>Dashboard</button>
            {(currentComponent == "Employees") ? <ManageEmployees /> : (currentComponent == "ParkingSlots" ) ?  <ManageParkingSlots /> : <AdminDash />}
        </div>
        
    );
}
 
export default AdminDashboard;