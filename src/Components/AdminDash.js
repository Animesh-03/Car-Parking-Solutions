import axios from "axios";
import { useEffect, useState } from "react";

const AdminDash = () => {

    const [orders,setOrders] = useState();

    useEffect(() => {
        axios.get("http://localhost:8080/orders/all",).then((res) => setOrders(res.data));
    },[])

    return (
        <div className="admin-dash">
            <p>{JSON.stringify(orders)}</p>
        </div>
    );
}
 
export default AdminDash;