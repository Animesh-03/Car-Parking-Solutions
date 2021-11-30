import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const SlotItem = (props) => {
    const history = useHistory();

    const slot = props.slot;
    const user = props.user;

    const [locationName,setLocationName] = useState();
    const [foundLocationName,setFoundLocation] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/location/get",{params:{
            id:slot.locationId
        }}).then(res => {
            setLocationName(res.data.location);
            setFoundLocation(true);
        })
    },[]);

    const handleDelete = () => {
        axios.post("http://localhost:8080/slots/delete",null,{params:{
            id:slot.id
        }});
    }

    return ( 
        <div id="slot-item" onClick={(e) => {if(props.admin == false) history.push("/slots/" + slot.id,{user:user});}}>
            <h3>{" Slot Number : " + props.slotNumber}</h3>
            <p>Location: <b>{foundLocationName && locationName}</b>, Preferred Car: <b>{slot.preference}</b></p>
            {props.admin && <button id="delete-slot-item" onClick={handleDelete} >Delete</button>}
        </div>
     );
}
 
export default SlotItem;