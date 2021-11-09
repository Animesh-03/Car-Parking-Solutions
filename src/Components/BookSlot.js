import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { LoginContext } from "./LoginContext";
import { UserContext } from "./UserContext";


const BookSlot = () => {
    const params = useParams();
    const {isLoggedIn,setLoggedIn} = useContext(LoginContext);
    const {user,setUser} = useContext(UserContext);
    const [parkingSlot,setParkingSlot] = useState(null);
    const slotId = params.id;
    const [checkInTime,setCheckInTime] = useState("");
    const [checkOutTime,setCheckOutTime] = useState("");
    
    useEffect(() => {
        axios.get("http://localhost:8080/slots/get",{params:{
            id:slotId,
        }}).then((res) => {
            setParkingSlot(res.data);
        });
        
        setTimeout(_ => {console.log(user)},3000);
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        var chkInTime = checkInTime.split(':');
        var chkOutTime = checkOutTime.split(':');
        console.log("Check In Time : "+chkInTime[0] + ":" + chkInTime[1]);
        axios.post("http://localhost:8080/slots/update",null,{params:{
            slotId:slotId,
            checkInTime:checkInTime,
            checkOutTime:checkOutTime,
            bookedBy:user.id,
        }}).then(res => console.log(res));
    }

    return ( 
        <div className="container-fluid">
            <p>{JSON.stringify(parkingSlot)}</p>
            <input id="check-in-time" placeholder="Check in time"
            value={checkInTime}
            onChange={(e) => setCheckInTime(e.target.value)} />
            <input id="check-out-time" placeholder="Check out time"
            value={checkOutTime}
            onChange={(e) => setCheckOutTime(e.target.value)} />
            <br /><br />
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            
        </div>
    )
}
 
export default BookSlot;