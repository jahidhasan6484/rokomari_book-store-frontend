import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const DB = () => {
    const [bookDB, setBookDB] = useState([]);
    const [imageURL, setImageURL] = useState(null);


    useEffect(() => {
        fetch("https://rokomari-book-store-backend.vercel.app/bookDB")
            .then((response) => response.json())
            .then((result) => setBookDB(result))
    }, []);

    const handleAddBook = (e) => {
        e.preventDefault();

        if (imageURL === null) {
            alert("Please try another time");
            return;
        }

        const name = e.target.bookName.value;
        const price = e.target.price.value;
        const authorName = e.target.authorName.value;
        const category = e.target.category.value;
        const publisher = e.target.publisher.value;
        const edition = e.target.edition.value;

        const newBook = {
            name: name,
            price: price,
            authorName: authorName,
            category: category,
            publisher: publisher,
            edition: edition,
            quantity: 1,
            image: imageURL
        }

        fetch('https://rokomari-book-store-backend.vercel.app/addBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.insertedId) {
                    const newBook = {
                        _id: result.insertedId,
                        name: name,
                        price: price
                    }

                    const updatedBookDB = [...bookDB, newBook];
                    setBookDB(updatedBookDB);
                    alert("New book added to the database")
                    e.target.reset();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleImageUpload = event => {
        const imageData = new FormData();
        imageData.set('key', '3095b87c8ab0955b7f17e8f20b8763d0');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then((response) => {
                const avatar = response.data.data.display_url;
                setImageURL(avatar);
            })
            .catch((error) => console.log(error));
    }

    const handleBookDelete = (d_id) => {
        const confirmation = window.confirm("Are you want to delete?")
        if (confirmation) {
            fetch(`https://rokomari-book-store-backend.vercel.app/delete/${d_id}`, {
                method: 'DELETE'
            })
                .then((response) => response.json())
                .then((result) => {
                    const updatedBookDB = bookDB.filter(book => book._id !== d_id);
                    setBookDB(updatedBookDB)

                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    return (
        <div className="container section">
            <Helmet>
                <title>DB | রকমারি.কম</title>
            </Helmet>

            <h4 className="title">DB {bookDB.length}</h4>

            <form onSubmit={handleAddBook} className="py-5">
                <input type="text" placeholder="Book Name" name="bookName" required />
                <br></br>
                <input type="text" placeholder="Author" name="authorName" required />
                <br></br>
                <input type="text" placeholder="Category" name="category" required />
                <br></br>
                <input type="number" placeholder="Price" name="price" required />
                <br></br>
                <input type="text" placeholder="Publisher" name="publisher" required />
                <br></br>
                <input type="text" placeholder="Edition" name="edition" required />
                <br></br>
                <input name="exampleRequired" type="file" onChange={handleImageUpload} className="form-control" required />
                <br></br>
                <input type="submit" value="Add" />
                <br></br>
            </form>

            {
                bookDB.map((book) => {
                    return (
                        <div key={book._id}>
                            <p>{book._id} - {book.name} - {book.price}</p>
                            <Link to={`/update/${book._id}`}>Update</Link>
                            <button onClick={() => handleBookDelete(book._id)}>X</button>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default DB;