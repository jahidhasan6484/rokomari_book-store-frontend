import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const DB = () => {
    const [bookDB, setBookDB] = useState([]);


    useEffect(() => {
        fetch("http://localhost:5000/bookDB")
            .then((response) => response.json())
            .then((result) => setBookDB(result))
    }, []);

    const handleAddBook = (e) => {
        e.preventDefault();

        const name = e.target.bookName.value;
        const price = e.target.price.value;

        const newBook = {
            name, price
        }

        fetch('http://localhost:5000/addBook', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("ADDED ", result)
                if(result.insertedId) {
                    const updatedBookDB = [...bookDB, result];
                    setBookDB(updatedBookDB);
                    alert("New book added to the database")
                    e.target.reset();
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    const handleBookDelete = (d_id) => {
        const confirmation = window.confirm("Are you want to delete?")
        if(confirmation) {
            fetch(`http://localhost:5000/book/${d_id}`, {
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
                <input type="number" placeholder="Price" name="price" required />
                <br></br>
                <input type="submit" value="Add" />
                <br></br>
            </form>

            {
                bookDB.map((book) => {
                    return (
                        <div key={book._id}>
                            <p>{book._id} - {book.name} - {book.price}</p>
                            <button onClick={() => handleBookDelete(book._id)}>X</button>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default DB;