import axios from "axios";
import { useHistory, useLocation } from "react-router";

const Order = () => {
    const location = useLocation().state;
    const history = useHistory();

    const order  = location.order;
    const user = location.user;

    console.log(location);

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
                    history.goBack();
                });
            }
        })
    }

    return ( 
        <div className="order">
            {JSON.stringify(order)}
            <button id="checkout" onClick={checkout}>Checkout</button>
        </div>
     );
}
 
export default Order;