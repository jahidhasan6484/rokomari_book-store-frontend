import axios from "axios";
import { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../App";
import auth from "../../firebase.init";
import api from "../API";
import PageTitle from "../PageTitle/PageTitle";
import './Cart.css';

const Cart = () => {
    const navigate = useNavigate();

    const [user] = useAuthState(auth);
    const [cart, setCart, bookDB, setBookDB, admins] = useContext(CartContext);

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

    const itemIncrease = (i_id) => {
        cart.map((item, index) => {
            if (item._id == i_id) {
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

    const itemDecrease = (d_id) => {
        cart.map((item, index) => {
            if (item._id == d_id) {
                const update = {
                    ...item,
                    quantity: item.quantity - 1
                }
                let tempCart = [...cart]
                tempCart[index] = update;
                if (tempCart[index].quantity < 1) {

                    const updatedCart = tempCart.filter((item) => item._id !== d_id)
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
            return acc + obj.price * obj.quantity;
        }, 0);
    }

    const handleRemove = (r_id) => {
        const updatedCart = cart.filter((item) => item._id !== r_id)
        localStorage.setItem("cart", JSON.stringify(updatedCart))
        setCart(updatedCart)
    }

    let address = ["সিরাজগঞ্জ", "পাবনা", "বগুড়া", "রাজশাহী", "নাটোর", "জয়পুরহাট", "চাঁপাইনবাবগঞ্জ", "নওগাঁ", "নরসিংদী", "গাজীপুর", "শরীয়তপুর", "নারায়ণগঞ্জ", "টাঙ্গাইল", "কিশোরগঞ্জ", "মানিকগঞ্জ", "ঢাকা", "মুন্সিগঞ্জ"];

    const [courierCharge, setCourierCharge] = useState(0);
    const [courierLocation, setCourierLocation] = useState('')

    const handleAddress = (e) => {
        const numberMap = {
            "সিরাজগঞ্জ": 70,
            "পাবনা": 70,
            "বগুড়া": 80,
            "রাজশাহী": 100,
            "নাটোর": 130,
            "জয়পুরহাট": 150,
            "চাঁপাইনবাবগঞ্জ": 130,
            "নওগাঁ": 120,
            "নরসিংদী": 90,
            "গাজীপুর": 30,
            "শরীয়তপুর": 60,
            "নারায়ণগঞ্জ": 50,
            "টাঙ্গাইল": 50,
            "কিশোরগঞ্জ": 60,
            "মানিকগঞ্জ": 70,
            "ঢাকা": 20,
            "মুন্সিগঞ্জ": 70
        }
        setCourierLocation(e.target.value)
        setCourierCharge(numberMap[e.target.value])
    }


    const handlePay = (e) => {
        e.preventDefault();

        if (!user) {
            alert("আপনাকে প্রথমে সাইন ইন করতে হবে");
            navigate('/signIn');
            return;
        }

        const contactRegEx = /(^(\01|8801|01|008801))[1|3-9]{1}(\d){8}$/;

        if (e.target.postalCode.value.length !== 4) {
            alert("সঠিক পোস্ট কোড দিন");
            return;
        }
        if (!courierLocation) {
            alert("জেলা সিলেক্ট করুন");
            return;
        }
        if (!contactRegEx.test(e.target.contactNumber.value)) {
            alert("সর্বমোট ১১ ডিজিট এর মোবাইল নম্বর দিন");
            return;
        }

        const paymentInfo = {
            name: e.target.name.value,
            email: user?.email,
            houseNumber: e.target.houseNumber.value,
            postOffice: e.target.postOffice.value,
            postalCode: e.target.postalCode.value,
            district: courierLocation,
            contactNumber: e.target.contactNumber.value,
            bookPrice: cartTotal(),
            courierCharge: courierCharge,
            totalCharge: cartTotal() + courierCharge,
            products: cart
        }

        fetch(`${api}/orders`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(paymentInfo),
        })
            .then((res) => res.json())
            .then((data) => {
                window.location.replace(data.url);
            })
            .catch((err) => console.err(err));
    }

    return (
        <div className="container section">
            <PageTitle title="কেনাকাটার ব্যাগ" />

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
                                                    <img src={item.image} className="img-fluid" alt={item.name} />
                                                </div>
                                                <div className="col-md-3 col-3">
                                                    <p>{item.name}</p>
                                                </div>
                                                <div className="col-md-3 col-3 item_control">
                                                    <svg onClick={() => itemDecrease(item._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z" />
                                                    </svg>
                                                    {convertedQuantity(item.quantity)}
                                                    <svg onClick={() => itemIncrease(item._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                                    </svg>
                                                </div>
                                                <div className="col-md-2 col-2">
                                                    <div className="col-md-8 col-8">
                                                        ৳ {convertedPrice(item.price * item.quantity)}
                                                    </div>
                                                </div>
                                                <div className="col-md-2 col-2">
                                                    <button onClick={() => handleRemove(item._id)} className="btn btn-danger">X</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div className="col-md-4 col-12 cart_sidebar">
                                <form className="mb-3" onSubmit={handlePay}>

                                    <div className="mb-3">
                                        <label className="form_label"><span className='required'>*</span>আপনার নাম</label>
                                        <input type="text" name="name" className="form-control input_box" placeholder="পুরো নাম দিন" required />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form_label"><span className='required'>*</span>বাসা নম্বর</label>
                                        <input type="text" name="houseNumber" className="form-control input_box" placeholder="বাসা নম্বর দিন" required />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form_label"><span className='required'>*</span>পোস্ট অফিস</label>
                                        <input type="text" name="postOffice" className="form-control input_box" placeholder="পোস্ট অফিসের নাম দিন" required />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form_label"><span className='required'>*</span>পোস্ট কোড</label>
                                        <input type="number" name="postalCode" className="form-control input_box" placeholder="পোস্ট কোড দিন" required />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form_label"><span className='required'>*</span>জেলা</label>
                                        <select class="form-select" aria-label="Default select example" onChange={(e) => handleAddress(e)}>
                                            <option>জেলা সিলেক্ট করুন</option>
                                            {
                                                address.map((address) => {
                                                    return (
                                                        <option key={address} value={address}>{address}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form_label"><span className='required'>*</span>মোবাইল নম্বর</label>
                                        <input type="number" name="contactNumber" className="form-control input_box" placeholder="আপনার মোবাইল নম্বর দিন (সর্বমোট ১১ ডিজিট)" required />
                                    </div>

                                    <div className="inside_cart_sidebar">
                                        <div className="details">
                                            <p>মোট:</p>
                                            <p>৳ {convertedPrice(cartTotal())}</p>
                                        </div>
                                        <div className="details">
                                            <p>কুরিয়ার ফি:</p>
                                            <p>৳ {courierCharge ? convertedPrice(courierCharge) : convertedPrice(0)}</p>
                                        </div>
                                    </div>
                                    <div className="details">
                                        <p>সর্বমোট:</p>
                                        <p>৳ {convertedPrice(cartTotal() + courierCharge)}</p>
                                    </div>

                                    <div>
                                        <input className="btn btn-dark" type="submit" value="পে করুন"></input>
                                    </div>

                                </form>

                            </div>

                        </div>
                    </>
                    :
                    <p className="empty_cart">আপনার কেনাকাটার ব্যাগ খালি!</p>
            }

        </div>
    )
}

export default Cart;