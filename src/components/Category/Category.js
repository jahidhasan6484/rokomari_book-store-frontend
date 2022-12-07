import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { CartContext } from "../../App";
import BookCard from "../BookCard/BookCard";

const Category = () => {
    const [cart, setCart, bookDB, setBookDB, admins] = useContext(CartContext);
    const { category } = useParams();

    return (
        <div className="container section">
            <Helmet>
                <title>{category} | রকমারি.কম</title>
            </Helmet>
            <h4 className="title">{category}</h4>
            <div className="row">
                {
                    bookDB.map((book) => {
                        if (book.category === category) {
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

export default Category;