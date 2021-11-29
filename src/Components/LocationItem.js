import { useHistory, useLocation, useParams } from "react-router";

const LocationItem = (props) => {
    const history = useHistory();

    //Passed as props to component in Dashboard
    const loc = JSON.parse(props.location);
    const user = JSON.parse(props.user);

    console.log(loc);

    return (
        //OnClick event to div
        <div id="location-item" onClick={ (e) => history.push("/location/" + loc.id,{user:user})} >
            <h3>{loc.location}</h3>
            <label htmlFor="location-item-dryWash">Dry Wash</label>
            <input id="location-item-dryWash" disabled={true} type="checkbox" checked={loc.dryWashOffered} />
            <label htmlFor="location-item-carWash">Car Wash</label>
            <input id="location-item-carWash" disabled={true} type="checkbox" checked={loc.carWashOffered} />
            <label htmlFor="location-item-repairs">Repairs</label>
            <input id="location-item-repairs" disabled={true} type="checkbox" checked={loc.repairsOffered} />
        </div>
        

      );
}
 
export default LocationItem;