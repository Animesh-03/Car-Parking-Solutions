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

    const [loc,setLoc] = useState();
    const [foundLoc,setFoundLoc] = useState(false);


    useEffect(() => {
        axios.get("http://localhost:8080/employee/getByAssignedTo",{params:{
            id:order.locationId
        }}).then(res => {
            setEmployee(res.data);
            setEmployeeFound(true);
            setEmployeeId(res.data.id);
            console.log(res.data);
        });

        axios.get("http://localhost:8080/location/get",{params:{
            id:order.locationId,
        }}).then(res => {
            setLoc(res.data);
            setFoundLoc(true);
        })
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


                    
                }).catch((e) => {
                    history.goBack();
                })
                
            }
        });
    }

    return ( 
        <div className="order">
            <h2>You booked a slot for: <b>{foundLoc && loc.location}</b></h2>
            <p>Your booking reference ID: <b>{order.referenceId}</b></p>
            <p>Your Booking is assigned to: <b>{employeeFound && employee.firstName}</b> with a current rating of: <b>{employeeFound && employee.rating}</b></p>
            <p>Your check in time: <b>{order.checkInTime}</b>, Your check out time: <b>{order.checkOutTime}</b></p>
            <br />
            <p>You need to pay: {order.amount} </p>
            <button id="checkout" onClick={checkout}>Checkout</button>
            <br /><br /><br />
            <p id="rating-reminder">Make sure to rate {employeeFound && employee.firstName} based on your experience! </p>
        </div>
     );
}
 
export default Order;