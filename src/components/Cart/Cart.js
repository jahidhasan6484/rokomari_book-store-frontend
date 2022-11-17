import { useContext, useState } from "react";
import { CartContext } from "../../App";
import './Cart.css';

const Cart = () => {
    const [cart, setCart, booksList] = useContext(CartContext);

    const convertedPrice = (_price) => {
        let tempPrice = String(_price).split("");
        let result = [];

        const numberMap = {
            0: "০",
            1: "১",
            2: "২",
            3: "৩",
            4: "৪",
            5: "৫",
            6: "৬",
            7: "৭",
            8: "৮",
            9: "৯",
        }

        for (let i = 0; i < tempPrice.length; i++) {
            result.push(numberMap[tempPrice[i]])
        }

        return result.join("");
    }

    const convertedQuantity = (_quantity) => {
        let tempQuantity = String(_quantity).split("");
        let result = [];

        const numberMap = {
            0: "০",
            1: "১",
            2: "২",
            3: "৩",
            4: "৪",
            5: "৫",
            6: "৬",
            7: "৭",
            8: "৮",
            9: "৯",
        }

        for (let i = 0; i < tempQuantity.length; i++) {
            result.push(numberMap[tempQuantity[i]])
        }

        return result.join("");
    }

    const itemIncrease = (_id) => {
        cart.map((item, index) => {
            if (item.id == _id) {
                const update = {
                    ...item,
                    quantity: item.quantity + 1
                }
                let tempCart = [...cart]
                tempCart[index] = update;
                localStorage.setItem("cart", JSON.stringify(tempCart))

                setCart(tempCart)
            }
        })
    }

    const itemDecrease = (_id) => {
        cart.map((item, index) => {
            if (item.id == _id) {
                const update = {
                    ...item,
                    quantity: item.quantity - 1
                }
                let tempCart = [...cart]
                tempCart[index] = update;
                if (tempCart[index].quantity < 1) {

                    const updatedCart = tempCart.filter((item) => item.id !== _id)
                    localStorage.setItem("cart", JSON.stringify(updatedCart))
                    setCart(updatedCart)
                } else {
                    localStorage.setItem("cart", JSON.stringify(tempCart))
                    setCart(tempCart)
                }
            }
        })
    }

    const cartTotal = () => {
        return cart.reduce(function (acc, obj) {
            return acc + obj.currPrice * obj.quantity;
        }, 0);
    }

    const handleRemove = (_id) => {
        const updatedCart = cart.filter((item) => item.id !== _id)
        localStorage.setItem("cart", JSON.stringify(updatedCart))
        setCart(updatedCart)
    }

    let address = ["ঢাকা", "রাজশাহী", "সিলেট", "চট্টগ্রাম"];

    const [courierCharge, setCourierCharge] = useState(0)

    const handleAddress = (e) => {
        const numberMap = {
            "ঢাকা": 40,
            "রাজশাহী": 70,
            "সিলেট": 100,
            "চট্টগ্রাম": 90
        }

        setCourierCharge(numberMap[e.target.value])
    }

    return (
        <div className="container section">
            <h4 className="title">কেনাকাটার ব্যাগ</h4>

            {
                cart.length > 0 ?
                    <>
                        <div className="row mt-5">
                            <div className="col-md-8 col-12 cart_row">

                                {
                                    cart.map((item) => {
                                        return (
                                            <div className="row mb-5">
                                                <div className="col-md-2 col-2">
                                                    <img src={item.imageURL} className="cart_image img-fluid" alt={item.name} />
                                                </div>
                                                <div className="col-md-3 col-3">
                                                    <p>{item.name}</p>
                                                </div>
                                                <div className="col-md-3 col-3 item_control">
                                                    <svg onClick={() => itemDecrease(item.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z" />
                                                    </svg>
                                                    {convertedQuantity(item.quantity)}
                                                    <svg onClick={() => itemIncrease(item.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                                    </svg>
                                                </div>
                                                <div className="col-md-2 col-2">
                                                    <div className="col-md-8 col-8">
                                                        {convertedPrice(item.currPrice * item.quantity)}
                                                    </div>
                                                </div>
                                                <div className="col-md-2 col-2">
                                                    <button onClick={() => handleRemove(item.id)} className="btn btn-danger">X</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="col-md-4 col-12 cart_sidebar">
                                <select class="form-select" aria-label="Default select example" onChange={(e) => handleAddress(e)}>
                                    <option>ঠিকানা সিলেক্ট করুন</option>
                                    {
                                        address.map((address) => {
                                            return (
                                                <option key={address} value={address}>{address}</option>
                                            )
                                        })
                                    }
                                </select>
                                <div className="inside_cart_sidebar">
                                    <div className="details">
                                        <p>মোট:</p>
                                        <p>৳ {convertedPrice(cartTotal())}</p>
                                    </div>
                                    <div className="details">
                                        <p>কুরিয়ার ফি:</p>
                                        <p>৳ {convertedPrice(courierCharge)}</p>
                                    </div>
                                </div>

                                <div className="details">
                                    <p>সর্বমোট:</p>
                                    <p>৳ {convertedPrice(cartTotal() + courierCharge)}</p>
                                </div>

                                <button className={courierCharge > 0 ? "btn btn-primary" : "btn btn-primary disabled"}>পে করুন</button>
                            </div>
                        </div>
                    </> : <p className="empty_cart">আপনার কেনাকাটার ব্যাগ খালি!</p>
            }

        </div>
    )
}

export default Cart;