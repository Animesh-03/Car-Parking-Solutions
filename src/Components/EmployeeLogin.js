import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";

const EmployeeLogin = () => {

    const history = useHistory();

    const [userName,setUsername] = useState("");
    const [password,setPassword] = useState("");

    let tempUser;

    const handleEmployeeLogin = () => {
        axios.get("http://localhost:8080/employee/get", {params:{
            "userName":userName
        }}).then((res) => {
            console.log(res);
            tempUser = res.data;
            
            if(tempUser.password == password)
            {
                history.push("/employee", {user:tempUser})
            }
        });
    }

    return ( 
        <div className="employee-login">
            <input id="employee-username" placeholder="User Name" onChange={(e) => setUsername(e.target.value)} />
            <input id="employee-password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button id="employee-login-btn" onClick={handleEmployeeLogin}>Login</button>
        </div>
     );
}
 
export default EmployeeLogin;