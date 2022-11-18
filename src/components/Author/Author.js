import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../App";
import BookCard from "../BookCard/BookCard";

const Author = () => {
    const [cart, setCart, booksList] = useContext(CartContext);

    const { name } = useParams();
    return(
        <div className="container section">
            <h4 className="title">{name}</h4>
            <div className="row">
                {
                    booksList.map((book) => {
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