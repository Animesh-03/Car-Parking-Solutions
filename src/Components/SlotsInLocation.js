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

    const[preferredSlots,setPreferredSlots] = useState();
    const [foundPreferred,setFoundPreferred] = useState(false);

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

        axios.get("http://localhost:8080/slots/getByLocationAndPreference",{params:{
            id:locId,
            preference:user.carModel
        }}).then(res => {setPreferredSlots(res.data); setFoundPreferred(true)});
        
    },[]);

    let slotNumber = 1;
    return ( 
        <div className="slots-in-location">
            <h2>Suggested Slots </h2>
            <ul>{foundPreferred &&(preferredSlots.map(slt => <SlotItem slot={slt} user={user} admin={false} slotNumber={slotNumber++}  />))}</ul>
            <h2>All Slots</h2>
            <ul id="slots-list">{foundSlots && (slots.map((slt) => <SlotItem slot={slt} user={user} admin={false} slotNumber={slotNumber++}  />))}</ul>
        </div>
     );
}
 
export default SlotsInLocation;