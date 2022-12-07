import axios from "axios";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { CartContext } from "../../App";
import addBook from '../../images/svg/addBook.svg';
import api from '../API';

const AddBook = () => {
    const [cart, setCart, bookDB, setBookDB, admins] = useContext(CartContext);
    const [imageURL, setImageURL] = useState(null);

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

        fetch(`${api}/addBook`, {
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

    const handleImageUpload = (e) => {
        const imageData = new FormData();
        imageData.set('key', '3095b87c8ab0955b7f17e8f20b8763d0');
        imageData.append('image', e.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then((response) => {
                const avatar = response.data.data.display_url;
                setImageURL(avatar);
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className="container section">
            <Helmet>
                <title>নতুন বই যুক্ত করুন | রকমারি.কম</title>
            </Helmet>

            <h4 className="title">রকমারিতে নতুন বই যুক্ত করুন</h4>

            <div className="row mt-5 info">
                <div className="col-md-6 col-12">
                    <img src={addBook} className="img-fluid" alt='Add Book' />
                </div>
                <div className="col-md-6 col-12">

                    <form className="mb-3" onSubmit={handleAddBook}>
                        <div className="mb-3">
                            <label className="form_label"><span className='required'>*</span>বইয়ের নাম</label>
                            <input type="text" name="bookName" className="form-control input_box" placeholder="বইয়ের নাম দিন" required />
                        </div>

                        <div className="mb-3">
                            <label className="form_label"><span className='required'>*</span>লেখক</label>
                            <input type="text" name="authorName" className="form-control input_box" id="floatingPassword" placeholder="লেখকের পুরো নাম দিন" required />
                        </div>

                        <div className="mb-3">
                            <label className="form_label"><span className='required'>*</span>বইয়ের ধরন</label>
                            <input type="text" name="category" className="form-control input_box" placeholder="বইয়ের ধরন উল্লেখ্য করুন" required />
                        </div>

                        <div className="mb-3">
                            <label className="form_label"><span className='required'>*</span>মূল্য</label>
                            <input type="number" name="price" className="form-control input_box" placeholder="বর্তমান মূল্য দিন" required />
                        </div>

                        <div className="mb-3">
                            <label className="form_label"><span className='required'>*</span>প্রকাশনী</label>
                            <input type="text" name="publisher" className="form-control input_box" placeholder="প্রকাশনীর নাম দিন" required />
                        </div>

                        <div className="mb-3">
                            <label className="form_label"><span className='required'>*</span>সংস্করণ</label>
                            <input type="number" name="edition" className="form-control input_box" placeholder="ইংরেজি সাল লিখুন" required />
                        </div>

                        <div className="mb-3">
                            <label className="form_label"><span className='required'>*</span>বইয়ের ছবি</label>
                            <input type="file" name="image" onChange={handleImageUpload} className="form-control input_box" placeholder="edition" required />
                        </div>

                        <div className="buttons mb-3">
                            <input type="submit" className="btn btn-success" value="ডাটাবেজে যুক্ত করুন"></input>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default AddBook;