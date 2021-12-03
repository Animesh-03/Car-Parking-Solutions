import axios from "axios";
import { useEffect, useState } from "react";
import LocationItem from "./LocationItem";
import SlotItem from "./SlotItem";
import PreferenceList from "../Others/PreferenceList";

const ManageParkingSlots = () => {

    const [location,setLocation] = useState();
    const [dryWash,setDryWash] = useState(false);
    const [carWash,setCarWash] = useState(false);
    const [repairs,setRepairs] = useState(false);

    const [preference,setPreference] = useState(PreferenceList.list[1]);

    const [locationId,setLocationId] = useState();

    const [slots,setSlots] = useState();
    const [foundSlots,setFoundSlots] = useState(false);
    const [spaces,setSpaces] = useState();
    const [foundSpaces,setFoundSpaces] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/slots/all").then((res) => {console.log(res.data); setSlots(res.data);  setFoundSlots(true);});
        axios.get("http://localhost:8080/location/all").then((res) =>{ setSpaces(res.data); setFoundSpaces(true)});
    },[])

    const postLocation = () => {
        axios.post("http://localhost:8080/location/add",null,{params:{
            location:location,
            offeredDryWash:dryWash,
            offeredCarWash:carWash,
            offeredRepairs:repairs,
        }}).then((res) => console.log(res));
    }

    const postSlot = () => {
        
        let parkingLoc;
        axios.get("http://localhost:8080/location/get",{params:{
            id:locationId
        }}).then((res) => {
            parkingLoc = res.data.location;
            setTimeout(() => axios.post("http://localhost:8080/slots/add",null,{params:{
                locationId:locationId,
                locationName:parkingLoc,
                preference:preference
            }}),10);

        });

        
    }

    let slotNumber = 1;
    return ( 
        <div className="ManageParkingSlots">
            <h2>Manage Parking Slots</h2>
            <h2> Manage Location </h2>
            <input id="parking-location" placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
            <input type="checkbox" id="dryWash-chkbox" onChange={(e) => setDryWash(e.target.value)} />
            <label htmlFor="dryWash-chkbox">Request Dry Wash</label>
            <input type="checkbox" id="carWash-chkbox" onChange={(e) => setCarWash(e.target.value)} />
            <label htmlFor="carWash-chkbox">Request Car Wash</label>
            <input type="checkbox" id="repairs-chkbox" onChange={(e) => setRepairs(e.target.value)} />
            <label htmlFor="repairs-chkbox">Request Repairs</label>
            <button onClick={postLocation}>Post</button>
            <h3>All Locations</h3>
            <ul id="all-admin-locations">{foundSpaces && (spaces.map((loc) => <LocationItem location={JSON.stringify(loc)} user={null} admin={true} />))}</ul>

            <h2>Manage Slots</h2>
            <input id="slot-locationId" placeholder="Location ID" onChange={(e) => setLocationId(e.target.value)} />
                <select defaultValue={PreferenceList.list[1]} onChange={(e) => {setPreference(e.target.value); console.log(e.target.value)}}>
                    {PreferenceList.list.map((pref) => <option value={pref}>{pref}</option>)}
                </select>
            <button onClick={postSlot} >Post Slot </button>
            <h3>All Slots</h3>
            <ul>{foundSlots && (slots.map((o) => <SlotItem slot={o} user={null} admin={true} slotNumber={slotNumber++}  />))}</ul>
        </div>
     );
}
 
export default ManageParkingSlots;