import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const OrderItem = (props) => {
    const history = useHistory();

    //Getting props
    const order = props.order;
    const user = props.user;

    const [locationName,setLocationName] = useState();
    const [foundLocationName,setFoundLocation] = useState(false);
    
    //Getting location name through ID
    useEffect(() => {
        axios.get("http://localhost:8080/location/get",{params:{
            id:order.locationId
        }}).then(res => {
            setLocationName(res.data.location);
            setFoundLocation(true);
        })
    },[])
    
    return ( 
        <div id="order-item" onClick={(e) => {if(props.admin == false && props.emp == false) history.push("/orders/" + order.orderId, {order:order,user:user});}}>
            <h3>{foundLocationName && locationName}</h3>
            <p>Reference ID: {order.referenceId}</p>
            <p>Booking For: {order.bookingDate} </p>
            <p>Check In Time: {order.checkInTime}, Check Out Time: {order.checkOutTime}</p>
            <p>Payment Amount: {order.amount}</p>
        </div>
     );
}
 
export default OrderItem;
