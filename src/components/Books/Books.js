import { useContext } from "react";
import { CartContext } from "../../App";
import BookCard from "../BookCard/BookCard";

const Books = () => {
    const [cart, setCart, bookDB, setBookDB, admins] = useContext(CartContext);
    return (
        <div className="container mt-5">
            <div className="row">
            {
                bookDB.map((book) => <BookCard key={book._id} book={book} />)
            }
            </div>
            
        </div>
    )
}

export default Books;