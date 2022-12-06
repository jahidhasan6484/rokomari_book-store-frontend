import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const Update = () => {
    const { id } = useParams();
    const [data, setData] = useState({})

    useEffect(() => {
        fetch(`https://rokomari-book-store-backend.vercel.app/book/${id}`)
            .then(response => response.json())
            .then(result => setData(result))
    }, [id]);

    const handleUpdateBook = (e) => {
        e.preventDefault();

        const name = e.target.bookName.value;
        const price = e.target.price.value;

        const updatedBook = {
            name, price
        }

        fetch(`https://rokomari-book-store-backend.vercel.app/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)
        })
            .then((response) => response.json())
            .then((result) => {
                    alert("UpdatedSuc")
                    e.target.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    return (
        <div className="container section">
            <Helmet>
                <title>Update | রকমারি.কম</title>
            </Helmet>

            <form onSubmit={handleUpdateBook} className="py-5">
                <input type="text" placeholder="Book Name" name="bookName" required />
                <br></br>
                <input type="number" placeholder="Price" name="price" required />
                <br></br>
                <input type="submit" value="Add" />
                <br></br>
            </form>
        </div>
    )
}

export default Update; 