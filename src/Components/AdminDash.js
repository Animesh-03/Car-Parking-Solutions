import axios from "axios";
import { useEffect, useState } from "react";
import OrderItem from "./OrderItem";

const AdminDash = () => {

    const [orders,setOrders] = useState();
    const [foundOrders,setFoundOrders] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/orders/all",).then((res) => {setOrders(res.data); setFoundOrders(true);});
    },[])

    return (
        <div className="admin-dash">
            <ul id="order-admin-list">{foundOrders && (orders.map((o) => <OrderItem order={o} user={null} admin={true} emp={false} />))}</ul>
        </div>
    );
}
 
export default AdminDash;