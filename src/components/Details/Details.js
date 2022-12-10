import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../App";
import api from "../API";
import PageTitle from "../PageTitle/PageTitle";

const Details = () => {
    const [cart, setCart, bookDB, setBookDB, admins] = useContext(CartContext);
    const { id } = useParams();
    const [info, setInfo] = useState({});
    const [suggestion, setSuggestion] = useState([])

    useEffect(() => {
        fetch(`${api}/book/${id}`)
            .then(response => response.json())
            .then(result => setInfo(result))
    }, [id]);

    useEffect(() => {
        const filterResult = bookDB.filter((book) => book.category === info?.category)
        setSuggestion(filterResult)

    }, [info?.category]);

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

    const handleAddToCart = (_book) => {
        const productExist = cart.find((item) => item._id === _book._id);

        if (productExist) {
            alert("বইটি কেনাকাটার ব্যাগে যুক্ত আছে")
        } else {
            let tempCart = [...cart]
            tempCart.push(_book)
            localStorage.setItem("cart", JSON.stringify(tempCart))

            setCart(tempCart)
        }
    }


    return (
        <div className="container section">
            <PageTitle title="DETAILS" />
            <div className="row mt-5">
                <div className="col-md-8 col-12">
                    {
                        info &&
                        <div className="row details_card">
                            <div className="col-md-6 col-12">
                                <img src={info.image} className="img-fluid" alt=""></img>
                            </div>
                            <div className="col-md-6 col-12">
                                <h5 className="book_name">{info.name}</h5>
                                <p>লেখক: {info.authorName}</p>
                                <p>বইয়ের ধরন: {info.category}</p>
                                <p>প্রকাশনী: {info.publisher}</p>
                                <p>সংস্করণ: {convertedQuantity(info.edition)}</p>
                                <p>মূল্য: {convertedPrice(info.price)} টাকা</p>

                                <button className="btn btn-dark" onClick={() => handleAddToCart(info)}>ব্যাগে নিন</button>
                            </div>
                        </div>
                    }
                </div>
                <div className="col-md-4 col-12 mt-5">
                    <h5 className="mb-2 bold">সম্পর্কিত বইসমূহ</h5>
                    {
                        suggestion.length > 0 &&
                        <>
                            {
                                suggestion.map((book) => {
                                    return (
                                        <Link to={`/book/${book._id}`}>
                                            <div className="row suggestion_card">

                                                <div className="col-md-6 col-6">
                                                    <img src={book.image} className="suggestion_image img-fluid" alt={book.name}></img>
                                                </div>
                                                <div className="col-md-6 col-6 sugg_info">
                                                    {book.name}
                                                    <br></br>
                                                    মূল্য: {convertedPrice(book.price)} টাকা
                                                </div>

                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </>

                    }

                </div>
            </div>
        </div>
    )
}

export default Details;