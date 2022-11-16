import { useContext } from "react";
import { CartContext } from "../../App";
import BookCard from "../BookCard/BookCard";

const Books = () => {
    const [cart, setCart, booksList] = useContext(CartContext);
    return (
        <div className="container mt-5">
            <div className="row">
            {
                booksList.map((book) => <BookCard key={book.id} book={book} />)
            }
            </div>
            
        </div>
    )
}

export default Books;