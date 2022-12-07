import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../API";
import PageTitle from "../PageTitle/PageTitle";
import update from '../../images/svg/update.svg';

const Update = () => {
    const { id } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`${api}/book/${id}`)
            .then(response => response.json())
            .then(result => setData(result))
    }, [id]);

    const handleUpdateBook = (e) => {
        e.preventDefault();

        const price = e.target.price.value;

        const updatedBook = {
            ...data,
            price: price
        }

        fetch(`${api}/update/${id}`, {
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
            <PageTitle title="আপডেট" />
            <h4 className="title">আপডেট ({data.name})</h4>

            <div className="row mt-5 info">
                <div className="col-md-6 col-12">
                    <img src={update} className="img-fluid" alt='Update' />
                </div>
                <div className="col-md-6 col-12">
                    <form className="mb-3" onSubmit={handleUpdateBook}>
                        <div className="mb-3">
                            <label className="form_label"><span className='required'>*</span>মূল্য</label>
                            <input type="number" name="price" className="form-control input_box" placeholder="বর্তমান মূল্য দিন" required />
                        </div>
                        <div className="buttons mb-3">
                            <input type="submit" className="btn btn-success" value="মূল্য আপডেট করুন"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Update; 