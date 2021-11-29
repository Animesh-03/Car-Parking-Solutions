import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory, useLocation, useParams } from "react-router";
import { UserContext } from "./UserContext";
import SlotItem from "./SlotItem";


const SlotsInLocation = () => {

    const params = useParams();
    const history = useHistory();
    const location = useLocation();

    const [slots,setSlots] = useState();
    const [foundSlots,setFoundSlots] = useState(false);

    const locId = params.id;
    const user = location.state.user;

    useEffect(() => {

        axios.get("http://localhost:8080/slots/getByLocation",{params:{
            id:locId,
        }}).then((res) => {
            console.log(res.data);
            setSlots(res.data);
            setFoundSlots(true);
        });
        
    },[]);

    let slotNumber = 1;
    return ( 
        <div className="slots-in-location">
            <h2>Slots</h2>
            <ul id="slots-list">{foundSlots && (slots.map((o) => <SlotItem slot={o} user={user} admin={false} slotNumber={slotNumber++}  />))}</ul>
        </div>
     );
}
 
export default SlotsInLocation;