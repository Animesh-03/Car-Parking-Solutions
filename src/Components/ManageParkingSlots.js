import axios from "axios";
import { useEffect, useState } from "react";

const ManageParkingSlots = () => {

    const [location,setLocation] = useState();
    // const [slots,setSlots] = useState();
    var slots = [];
    var [temp,setTemp] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/slots/all").then((res) => {console.log(res.data); slots = res.data;setTemp(JSON.stringify(slots)) });
    })

    const post = () => {
        axios.post("http://localhost:8080/slots/add",null,{params:{
            location:location
        }}).then((res) => console.log(res));
    }

    return ( 
        <div className="ManageParkingSlots">
            <h2>Manage Parking Slots</h2>
            <input id="slot-location" placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
            <button onClick={post}>Post</button>
            <h2>All Slots</h2>
            <p>{temp}</p>
        </div>
     );
}
 
export default ManageParkingSlots;