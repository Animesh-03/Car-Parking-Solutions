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
    var slotId = params.id;
    const [checkInTime,setCheckInTime] = useState("");
    const [checkOutTime,setCheckOutTime] = useState("");
    const [bookingDate,setBookingDate] = useState("");

    const [dryWash,setDryWash] = useState(false);
    const [carWash,setCarWash] = useState(false);
    const [repairs,setRepairs] = useState(false);
    
    let [slot,setSlot] = useState();
    const [slotid,setSlotid] = useState(slotId);
    
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

    const calculatePayment = (chkInTime,chkOutTime) => {
        let amount = 100;
        let hours = chkOutTime[0] - chkInTime[0];
        let min = chkOutTime[1] - chkInTime[1];
        console.log(chkOutTime[1] - chkOutTime[1]);
        if(min < 0)
        {
            min += 60;
            hours--;
        }
        console.log("Hours: " + hours + " Min: " + min);
        amount += hours*25;
        amount += min/60*25;

        if(dryWash) amount += 100;
        if(carWash) amount += 250;
        if(repairs) amount += 300;

        return Math.round(amount);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        var chkInTime = checkInTime.split(':');
        var chkOutTime = checkOutTime.split(':');
        console.log("Check In Time : "+chkInTime[0] + ":" + chkInTime[1]);
        console.log("Slot id:" + slotId);
        axios.post("http://localhost:8080/orders/new",null,{params:{
            locationId: slot.locationId,
            bookedBy:userId,
            slotId:slotid,
            wantDryWash:dryWash,
            wantCarWash:carWash,
            wantRepairs:repairs,
            checkInTime:checkInTime,
            checkOutTime:checkOutTime,
            bookingDate:bookingDate,
            amount:calculatePayment(chkInTime,chkOutTime),
        }}).then(res => {
            console.log(res);

            axios.post("http://localhost:8080/slots/setBooked", null, {params:{
                id:slotId
            }}).then(res => history.push("/dashboard",{user:user}));
        });
    }

    return ( 
        <div className="container-fluid">
            <p>{JSON.stringify(slot)}</p>
            
            <input id="booking-date" placeholder="Booking Date"
            onChange={(e) => setBookingDate(e.target.value)} />
            <br /><br />
            <input id="check-in-time" placeholder="Check in time"
            value={checkInTime}
            onChange={(e) => setCheckInTime(e.target.value)} />
            <br /><br />
            <input id="check-out-time" placeholder="Check out time"
            value={checkOutTime}
            onChange={(e) => setCheckOutTime(e.target.value)} />
            <br /><br />
            
            
            
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