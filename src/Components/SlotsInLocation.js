import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { UserContext } from "./UserContext";


const SlotsInLocation = () => {

    const params = useParams();
    const {user,setUser} = useContext(UserContext);

    let slots = [];
    const locId = params.id;

    useEffect(() => {
        var ul = document.getElementById("slots-list");

        axios.get("http://localhost:8080/slots/getByLocation",{params:{
            id:locId,
        }}).then((res) => {
            slots = res.data;
            console.log(slots);

            slots.forEach(slt => {
                var li = document.createElement("li");
                var a = document.createElement("a");
                a.append(document.createTextNode(JSON.stringify(slt)));
                console.log("Id: " + slt.id);
                a.href = "/slots/" + slt.id; 
                li.appendChild(a);
                console.log(li);
                ul.appendChild(li);
                console.log(ul);
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