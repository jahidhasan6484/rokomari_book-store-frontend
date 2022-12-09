import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../API";
import PageTitle from "../PageTitle/PageTitle";

const Success = () => {
    const location = useLocation();

    const query = new URLSearchParams(location.search);

    const transactionId = query.get("transaction_id");

    const [newOrder, setNewOrder] = useState({});


    useEffect(() => {
        fetch(`${api}/orders/by-transaction-id/${transactionId}`)
            .then((response) => response.json())
            .then((result) => setNewOrder(result))

    }, [])
    return (
        <div className="container section">
            <PageTitle title="কেনাকাটার ব্যাগ" />

            <h4 className="title">Success</h4>
            <h1>Congratulation!</h1>
            <h1>Order By {newOrder.name}</h1>

            <button onClick={() => window.print()}></button>
        </div>
    )
}

export default Success;