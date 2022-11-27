import './ForgetPassword.css';
import forgotPassword from '../../images/svg/forgotPassword.svg';
import { useState } from "react";
import auth from "../../firebase.init";
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { Helmet } from 'react-helmet-async';


const ForgetPassword = () => {
    const emailRegEx = /^\S+@\S+\.\S+$/;
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

    if (sending) {
        alert(`${email} ইমেইল একটি পাসওয়ার্ড রিসেট ইমেইল পাঠানো হয়েছে। ইনবক্স অথবা স্প্যাম চেক করুন।`)
    }

    const handleForgetPassword = (e) => {
        e.preventDefault();
        if (!emailRegEx.test(email)) {
            setErrorMsg("সঠিক ইমেইল এড্রেস দিন");
        } else {
            sendPasswordResetEmail(email);
        }
    }

    return (
        <div className="container section">
            <Helmet>
                <title>রিসেট পাসওয়ার্ড | রকমারি.কম</title>
            </Helmet>

            <h4 className="title">পাসওয়ার্ড ভুলে গেছেন?</h4>
            <div className="mb-3">
                <div className="row info">
                    <div className="col-md-6">
                        <img src={forgotPassword} className="img-fluid" alt="Forget Password"></img>
                    </div>

                    <div className="col-md-6">
                        <form onSubmit={handleForgetPassword}>
                            <div className="mb-3">
                                <label className="form_label" or="floatingInput">ইমেইল এড্রেস</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control input_box" id="floatingInput" placeholder="সঠিক ইমেইল এড্রেস দিন" required />
                            </div>

                            <p className="error">{errorMsg}</p>
                            <p className="error">{error?.message}</p>
                            <input type="submit" className='btn btn-secondary' value="রিসেট" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword;