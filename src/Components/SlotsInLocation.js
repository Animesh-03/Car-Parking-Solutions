import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory, useLocation, useParams } from "react-router";
import { UserContext } from "./UserContext";


const SlotsInLocation = () => {

    const params = useParams();
    const history = useHistory();
    const location = useLocation();
    // const {user,setUser} = useContext(UserContext);

    let slots = [];
    const locId = params.id;
    const user = location.state.user;

    useEffect(() => {
        var ul = document.getElementById("slots-list");

        axios.get("http://localhost:8080/slots/getByLocation",{params:{
            id:locId,
        }}).then((res) => {
            slots = res.data;
            console.log(slots);

            slots.forEach(slt => {
                var li = document.createElement("li");
                li.append(document.createTextNode(JSON.stringify(slt)));
                li.onclick = () => history.push("/slots/" + slt.id,{user:user});
                ul.appendChild(li);
            });
        });
        
        
    },[])

    return ( 
        <div className="slots-in-location">
            <ul id="slots-list"> </ul>
        </div>
     );
}
 
export default SlotsInLocation;