import { useContext } from "react";
import { CartContext } from "../../App";
import PageTitle from "../PageTitle/PageTitle";

const Shipping = () => {
    const [cart, setCart, bookDB, setBookDB, admins] = useContext(CartContext);
    return (
        <div className="container section">
            <PageTitle title="Shipping" />
            <h4 className="title">Shipping</h4>




        </div>
    )
}

export default Shipping;