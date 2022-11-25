import './ForgetPassword.css';
import fp from '../../images/fp.webp';
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import auth from "../../firebase.init";

const ForgetPassword = () => {
    const [email, setEmail] = useState('');

    const handleForgetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
                console.log("Password reset email sent!")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    return (
        <div className="container section">
            <h4 className="title">পাসওয়ার্ড ভুলে গেছেন?</h4>
            <div className="mb-3">
                <div className="row fp">
                    <div className="col-md-6">
                        <img src={fp} className="img-fluid" alt="Forget Password"></img>
                    </div>

                    <div className="col-md-6">
                <div className="mb-3">
                    <label className="form_label" or="floatingInput">ইমেইল এড্রেস</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control input_box" id="floatingInput" placeholder="সঠিক ইমেইল এড্রেস দিন" required />
                </div>

                <div className="buttons mb-3">
                    <button onClick={handleForgetPassword} className='btn btn-secondary'>রিসেট</button>

                </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword;