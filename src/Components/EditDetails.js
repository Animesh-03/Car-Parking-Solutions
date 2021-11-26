import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router";

const EditDetails = () => {
    const location = useLocation().state;
    const user = location.user;

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState(" ");
    const [carModel,setCarModel] = useState("");
    const [carNumber,setCarNumber] = useState("");

    const editDetails = () => {
        axios.post("http://localhost:8080/users/update",null,{params:{
            id:user.id,
            carModel:user.carModel,
            carNumber: user.carNumber,
            firstName:user.firstName,
            lastName:user.lastName,
            phoneNumber:user.phoneNumber
        }}).then(res => {
            console.log(res.data);
        })
    }


    return ( 
        <div className="edit-details">
            <h2>Fill in the empty fields or Edit </h2>
            <br />
            <div id="first-name">
                <label htmlFor="first-name-input">First Name</label>
                <input id="first-name-input" placeholder="First Name" defaultValue={user.firstName} onChange={(e) => user.firstName=e.target.value} />
            </div>
            <br />
            <div id="last-name">
                <label htmlFor="last-name-input"> Last Name</label>
                <input id="last-name-input" placeholder="Last Name" defaultValue={user.lastName} onChange={(e) => user.lastName=e.target.value} />
            </div>
            <br />
            <div id="mobile-number">
                <label htmlFor="mobile-number-input">Mobile Number</label>
                <input id="mobile-number-input" placeholder="Mobile Number" defaultValue={user.phoneNumber} onChange={(e) => user.phoneNumber=e.target.value} />
            </div>
            <br />
            <div id="car-model">
                <label htmlFor="car-model-input" >Car Model </label>
                <input id="car-model-input" placeholder="Car Model" defaultValue={user.carModel} onChange={e => user.carModel=e.target.value} />
            </div>
            <br />
            <div id="car-number">
                <label htmlFor="car-number-input">Car Number Plate</label>
                <input id="car-number-input" placeholder="Car Number Plate" defaultValue={user.carNumber} onChange={e => user.carNumber=e.target.value} />
            </div>
            <br />
            <button id="edit-button" onClick={editDetails}>Edit</button>
        </div>
     );
}
 
export default EditDetails;