import { useContext } from "react";
import { CartContext } from "../../App";
import BookCard from "../BookCard/BookCard";

const Programming = () => {
    const [cart, setCart, booksList] = useContext(CartContext);
    return (
        <div className="container section">
            <h4 className="title">কম্পিউটার, ফ্রিল্যান্সিং ও প্রোগ্রামিং</h4>
            <div className="row">
                {
                    booksList.map((book) => {
                        if (book.category === "কম্পিউটার, ফ্রিল্যান্সিং ও প্রোগ্রামিং") {
                            return (
                                <BookCard key={book.id} book={book}/>
                            )
                        }
                    })
                }
            </div>

        </div>
    )
}

export default Programming;