import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../App";
import api from "../API";
import PageTitle from "../PageTitle/PageTitle";

const ManageBook = () => {
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

    const handleBookDelete = (d_id) => {
        const confirmation = window.confirm("Are you want to delete?")
        if (confirmation) {
            fetch(`${api}/delete/${d_id}`, {
                method: 'DELETE'
            })
                .then((response) => response.json())
                .then((result) => {
                    const updatedBookDB = bookDB.filter(book => book._id !== d_id);
                    setBookDB(updatedBookDB)

                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    return (
        <div className="container section">
            <PageTitle title="ডাটাবেজ পরিচালনা করুন" />
            <h4 className="title">ডাটাবেজ পরিচালনা করুন</h4>
            <div className="row mt-5">
                {
                    bookDB.map((book) => {
                        return (
                            <div key={book._id} className="book_info col-md-12 col-12 mb-5">
                                <div className="col-md-2 col-2">
                                    <img src={book.image} alt="Book image" className="cart_image img-fluid"></img>
                                </div>
                                <div className="col-md-4 col-4 px-2">
                                    <p>{book.name}</p>
                                </div>
                                <div className="col-md-2 authorName px-2">
                                    <p>{book.authorName}</p>
                                </div>
                                <div className="col-md-2 col-2 text-center">
                                    <p>৳ {convertedPrice(book.price)}</p>
                                </div>

                                <div className="col-md-1 col-2 manage_button">
                                    <Link className="btn btn-info" to={`/update/${book._id}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                        </svg>
                                    </Link>
                                </div>
                                <div className="col-md-1 col-2 manage_button">
                                    <button className="btn btn-danger" onClick={() => handleBookDelete(book._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ManageBook;