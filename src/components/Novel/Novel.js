import { useContext } from "react";
import { CartContext } from "../../App";
import BookCard from "../BookCard/BookCard";

const Novel = () => {
    const [cart, setCart, booksList] = useContext(CartContext);
    return (
        <div className="container">
            <h1>Novel</h1>
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