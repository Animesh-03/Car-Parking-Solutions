import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { LoginContext } from "./LoginContext";
import { UserContext } from "./UserContext";


const BookSlot = () => {
    const params = useParams();
    const location = useLocation();
    const {isLoggedIn,setLoggedIn} = useContext(LoginContext);
    // const {user,setUser} = useContext(UserContext);
    const user = location.state.user;
    const history = useHistory();

    let userId = user.id;
    const slotId = params.id;
    const [checkInTime,setCheckInTime] = useState("");
    const [checkOutTime,setCheckOutTime] = useState("");

    const [dryWash,setDryWash] = useState(false);
    const [carWash,setCarWash] = useState(false);
    const [repairs,setRepairs] = useState(false);
    
    let [slot,setSlot] = useState();
    
    useEffect(_ => {
        axios.get("http://localhost:8080/slots/get",{params:{
            id:slotId
        }}).then((res) => {
            setSlot(res.data);
            axios.get("http://localhost:8080/location/get",{params:{
                id: res.data.locationId
            }}).then(res => {
                let location = res.data;
                console.log(location);
                setTimeout(() => {
                    if(location.dryWashOffered == false)
                    {
                        let chkBox = document.getElementById("dryWash-chkbox");
                        let label = document.getElementById("dryWash-label");
                        chkBox.remove();
                        label.remove();
                        console.log("Removed DryWash");
                    }
                    if(location.carWashOffered == false)
                    {
                        let chkBox = document.getElementById("carWash-chkbox");
                        let label = document.getElementById("carWash-label");
                        chkBox.remove();
                        label.remove();
                    }
                    if(location.repairsOffered == false)
                    {
                        let chkBox = document.getElementById("repairs-chkbox");
                        let label = document.getElementById("repairs-label");
                        chkBox.remove();
                        label.remove();
                    }
                },10);
            })
        })
    },[]);

    const calculatePayment = () => {
        return 100;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        var chkInTime = checkInTime.split(':');
        var chkOutTime = checkOutTime.split(':');
        console.log("Check In Time : "+chkInTime[0] + ":" + chkInTime[1]);
        axios.post("http://localhost:8080/orders/new",null,{params:{
            locationId: slot.locationId,
            bookedBy:userId,
            slotId:slotId,
            wantDryWash:dryWash,
            wantCarWash:carWash,
            wantRepairs:repairs,
            checkInTime:checkInTime,
            checkOutTime:checkOutTime,
            amount:calculatePayment(),
        }}).then(res => {
            console.log(res);
            history.push("/dashboard",{user:user});
        });
    }

    return ( 
        <div className="container-fluid">
            <p>{JSON.stringify(slot)}</p>
            
            <input id="check-in-time" placeholder="Check in time"
            value={checkInTime}
            onChange={(e) => setCheckInTime(e.target.value)} />
            <input id="check-out-time" placeholder="Check out time"
            value={checkOutTime}
            onChange={(e) => setCheckOutTime(e.target.value)} />
            
            
            <h1>Additional Options</h1>
            <input type="checkbox" id="dryWash-chkbox"  onChange={(e) => setDryWash(e.target.value)} />
            <label id="dryWash-label" htmlFor="dryWash-chkbox">Request Dry Wash</label>
            <input type="checkbox" id="carWash-chkbox"  onChange={(e) => setCarWash(e.target.value)} />
            <label id="carWash-label" htmlFor="carWash-chkbox">Request Car Wash</label>
            <input type="checkbox" id="repairs-chkbox"  onChange={(e) => setRepairs(e.target.value)} />
            <label id="repairs-label" htmlFor="repairs-chkbox">Request Repairs</label>
            <br /><br />
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
    )
}
 
export default BookSlot;