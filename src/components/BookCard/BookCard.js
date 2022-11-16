import './BookCard.css';
const BookCard = ({ book }) => {
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

    return (
        <div className="col-md-2 book_col">
            <div className='book_card'>
                <img src={book.imageURL}></img>
                <p className='mt-3'><b>{book.name}</b></p>
                <p>লেখক: <b>{book.authorName}</b></p>
                <p>মূল্য: <del>{convertedPrice(book.prePrice)}</del> {convertedPrice(book.currPrice)} টাকা</p>
            </div>
        </div>
    )
}

export default BookCard;