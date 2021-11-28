import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

const Order = () => {
    const location = useLocation().state;
    const history = useHistory();

    const order  = location.order;
    const user = location.user;
    const [employee,setEmployee] = useState();

    const [employeeFound,setEmployeeFound] = useState(false);
    const [employeeId,setEmployeeId] = useState();


    console.log(location);

    useEffect(() => {
        axios.get("http://localhost:8080/employee/getByAssignedTo",{params:{
            id:order.locationId
        }}).then(res => {
            setEmployee(res.data);
            setEmployeeFound(true);
            setEmployeeId(res.data.id);
            console.log(res.data);
        });
    },[])


    const checkout = () => {
        axios.post("http://localhost:8080/users/checkout",null,{params:{
            id:user.id,
            amount:order.amount
        }}).then(res => {
            if(res.data == "Insufficient funds")
            {
                alert("Insufficient funds! Add money into your wallet through dashboard.");
            }
            else
            {
                console.log("Checked Out");
                axios.post("http://localhost:8080/orders/finalise",null,{params:{
                    id:order.orderId
                }}).then(res => {
                    let rating = prompt("Enter your rating (1-5) for the employee");
                    console.log(rating);
                    axios.post("http://localhost:8080/employee/addRating",null,{params:{
                        id:employeeId,
                        rating:rating
                    }}).then(res => {
                        axios.post("http://localhost:8080/slots/setNotBooked",null,{params:{
                            id:order.slotId
                        }}).then(res => history.goBack());
                    });


                    
                });
                
            }
        })
    }

    return ( 
        <div className="order">
            <div id="employee-assigned">
                <h2>Your Booking is assigned to: {employeeFound && employee.firstName}</h2>
            </div>
            {JSON.stringify(order)}
            <br />
            <button id="checkout" onClick={checkout}>Checkout</button>
            <br /><br /><br />
            <p id="rating-reminder">Make sure to rate {employeeFound && employee.firstName} based on your experience! </p>
        </div>
     );
}
 
export default Order;