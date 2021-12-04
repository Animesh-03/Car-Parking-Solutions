import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const LocationItem = (props) => {
    const history = useHistory();

    //Passed as props to component in Dashboard
    const loc = JSON.parse(props.location);
    const user = JSON.parse(props.user);

    //Get Employee assigned to location
    const [emp,setEmp] = useState();
    const [foundEmp,setFoundEmp] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/employee/getByAssignedTo",{params:{
            id:loc.id
        }}).then((res) => {
            setEmp(res.data);
            console.log(res);
            setFoundEmp(true);
        })
    },[])

    const handleDelete = () => {
        axios.post("http://localhost:8080/location/delete",null,{params:{
            id:loc.id
        }});
        
    }

    return (
        //OnClick event to div
        <div id="location-item" onClick={ (e) =>{ if(props.admin == false) history.push("/location/" + loc.id,{user:user});}} >
            <h3>{loc.location} {props.admin && "ID: "+loc.id}</h3>
            <label htmlFor="location-item-dryWash">Dry Clean</label>
            <input className="form-check-input" id="location-item-dryWash" disabled={true} type="checkbox" checked={loc.dryWashOffered} />
            <label htmlFor="location-item-carWash">Car Wash</label>
            <input className="form-check-input" id="location-item-carWash" disabled={true} type="checkbox" checked={loc.carWashOffered} />
            <label htmlFor="location-item-repairs">Repairs</label>
            <input className="form-check-input" id="location-item-repairs" disabled={true} type="checkbox" checked={loc.repairsOffered} />
            <br />
            {foundEmp && "Employee Rating: " + emp.rating}
            {props.admin && <button id="delete-location-item-btn" onClick={handleDelete} >Delete</button>}
        </div>
        

      );
}
 
export default LocationItem;
