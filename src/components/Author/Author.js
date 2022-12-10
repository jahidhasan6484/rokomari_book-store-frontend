import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { CartContext } from "../../App";
import BookCard from "../BookCard/BookCard";
import PageTitle from "../PageTitle/PageTitle";

const Author = () => {
    const [cart, setCart, bookDB, setBookDB, admins] = useContext(CartContext);

    const { name } = useParams();
    return (
        <div className="container section">
            <PageTitle title={name} />

            <h4 className="title">{name}</h4>
            <div className="row">
                {
                    bookDB.map((book) => {
                        if (book.authorName === name) {
                            return (
                                <BookCard key={book.id} book={book} />
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default Author;