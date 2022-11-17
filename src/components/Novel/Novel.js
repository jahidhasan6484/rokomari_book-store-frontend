import { useContext } from "react";
import { CartContext } from "../../App";
import BookCard from "../BookCard/BookCard";

const Novel = () => {
    const [cart, setCart, booksList] = useContext(CartContext);
    return (
        <div className="container section">
            <h4 className="title">উপন্যাস</h4>
            <div className="row">
                {
                    booksList.map((book) => {
                        if (book.category === "উপন্যাস") {
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

export default Novel;