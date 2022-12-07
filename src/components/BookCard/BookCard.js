import { useContext } from 'react';
import { CartContext } from '../../App';
import './BookCard.css';
const BookCard = ({ book }) => {
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

    const handleAddToCart = (_book) => {
        const productExist = cart.find((item) => item._id === _book._id);

        if (productExist) {
            alert("বইটি কেনাকাটার ব্যাগে যুক্ত আছে")
        } else {
            let tempCart = [...cart]
            tempCart.push(_book)
            localStorage.setItem("cart", JSON.stringify(tempCart))

            setCart(tempCart)
        }
    }

    return (
        <div className="col-md-2 col-6 book_col">
            <div className='book_card'>
                <img src={book.image}></img>
                <p className='mt-3'><b>{book.name}</b></p>
                <p>লেখক: <b>{book.authorName}</b></p>
                <p>মূল্য: {convertedPrice(book.price)} টাকা</p>
                <button className="btn btn-dark" onClick={() => handleAddToCart(book)}>ব্যাগে নিন</button>
            </div>
        </div>
    )
}

export default BookCard;