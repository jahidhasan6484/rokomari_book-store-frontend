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
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetch(`${api}/orders/by-transaction-id/${transactionId}`)
            .then((response) => response.json())
            .then((result) => {
                setNewOrder(result);
                setLoading(false)
            })

    }, [transactionId]);

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
    return (
        <div className="container section">
            <PageTitle title="পেমেন্ট সম্পন্ন হয়েছে" />

            {
                loading ? <h1>LOADING........</h1> :

                <div className="pt-5">
                    <h5 className="success_message">ধনবাদ, আপনার পেমেন্ট সম্পন্ন হয়েছে।</h5>

                    <p className="mt-5"><span className="bold">লেনদেনের আইডি:</span> {newOrder.transaction_id}</p>

                    <div className="row">
                        <div className="col-md-3 col-12">
                            <p><span className="bold">নাম:</span> {newOrder.name}</p>
                        </div>
                        <div className="col-md-3 col-12">
                            <p><span className="bold">ইমেইল:</span> {newOrder.email}</p>
                        </div>
                        <div className="col-md-3 col-12">
                            <p><span className="bold">কুরিয়ার চার্জ:</span> ৳ {convertedPrice(newOrder.courierCharge)}</p>
                        </div>
                        <div className="col-md-3 col-12">
                            <p><span className="bold">সর্বমোট:</span> ৳ {convertedPrice(newOrder.totalCharge)}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <p><span className="bold">ঠিকানা:</span> {newOrder.houseNumber} / {newOrder.postOffice} - {newOrder.postalCode} ,{newOrder.district}</p>
                        </div>
                    </div>
                    <div className="row mt-5 mb-2 success_product success_product_top">
                        <div className="col-md-1 col-2">
                            ক্রমিক নম্বর
                        </div>
                        <div className="col-md-2 col-2">
                            বইয়ের ছবি
                        </div>
                        <div className="col-md-5 col-4">
                            বইয়ের নাম
                        </div>
                        <div className="col-md-2 col-2">
                            কপি
                        </div>
                        <div className="col-md-2 col-2">
                            মূল্য
                        </div>
                    </div>

                    {
                        newOrder?.products.map((product, index) => {
                            return (
                                <div className="row mb-5 success_product">
                                    <div className="col-md-1 col-2 serial">
                                        {convertedQuantity(index + 1)}
                                    </div>
                                    <div className="col-md-2 col-2">
                                        <img src={product.image} className="success_image img-fluid" alt={index} />
                                    </div>
                                    <div className="col-md-5 col-4">
                                        {product.name}
                                    </div>
                                    <div className="col-md-2 col-2">
                                        {convertedQuantity(product.quantity)}
                                    </div>
                                    <div className="col-md-2 col-2">
                                        ৳ {convertedPrice(product.quantity * product.price)}
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className="print">
                        <button className="btn btn-light" onClick={() => window.print()}>প্রিন্ট করুন</button>
                    </div>
                </div>
            }


        </div>
    )
}

export default Success;