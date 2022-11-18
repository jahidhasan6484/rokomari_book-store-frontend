import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../App";
import BookCard from "../BookCard/BookCard";

const Category = () => {
    const [cart, setCart, booksList] = useContext(CartContext);
    const { category } = useParams();
    console.log(category)

    return (
        <div className="container section">
            <h4 className="title">{category}</h4>
            <div className="row">
                {
                    booksList.map((book) => {
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