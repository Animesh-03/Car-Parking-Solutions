import axios from "axios";
import { useHistory, useLocation, useParams } from "react-router";

const LocationItem = (props) => {
    const history = useHistory();

    //Passed as props to component in Dashboard
    const loc = JSON.parse(props.location);
    const user = JSON.parse(props.user);

    const handleDelete = () => {
        axios.post("http://localhost:8080/location/delete",null,{params:{
            id:loc.id
        }});
    }

    return (
        //OnClick event to div
        <div id="location-item" onClick={ (e) =>{ if(props.admin == false) history.push("/location/" + loc.id,{user:user});}} >
            <h3>{loc.location} {props.admin && "ID: "+loc.id}</h3>
            <label htmlFor="location-item-dryWash">Dry Wash</label>
            <input class="form-check-input" id="location-item-dryWash" disabled={true} type="checkbox" checked={loc.dryWashOffered} />
            <label htmlFor="location-item-carWash">Car Wash</label>
            <input class="form-check-input" id="location-item-carWash" disabled={true} type="checkbox" checked={loc.carWashOffered} />
            <label htmlFor="location-item-repairs">Repairs</label>
            <input class="form-check-input" id="location-item-repairs" disabled={true} type="checkbox" checked={loc.repairsOffered} />
            <br />
            {props.admin && <button id="delete-location-item-btn" onClick={handleDelete} >Delete</button>}
        </div>
        

      );
}
 
export default LocationItem;