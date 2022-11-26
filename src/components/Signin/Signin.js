import { Link, useLocation, useNavigate } from "react-router-dom";
import cod from '../../images/cod.png';
import { useState } from "react";
import auth from '../../firebase.init';
import { signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, sendPasswordResetEmail, FacebookAuthProvider } from "firebase/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";


const SignIn = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    if (user) {
        navigate(from, { replace: true })
    }

    const handleEmailAndPasswordSignIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password)
    }


    const handleSignInWIthGoogle = () => {
    }

    const handleSignInWithFacebook = () => {
    }

    return (
        <div className="container section">
            <h4 className="title">লগ ইন করুন</h4>

            <div className="row mt-5">
                <div className="col-md-6 sign_first">
                    <div className='col-md-6 sign_first'>
                        <img src={cod} className="cod" alt='Cash On Delivery' />
                        <p>বই হাতে পেয়ে টাকা পরিশোধ করুন।</p>
                    </div>
                </div>
                <div className="col-md-6 col-12">

                    <form className="mb-3" onSubmit={handleEmailAndPasswordSignIn}>
                        <div className="mb-3">
                            <label className="form_label" or="floatingInput">ইমেইল এড্রেস</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control input_box" id="floatingInput" placeholder="সঠিক ইমেইল এড্রেস দিন" required />
                        </div>

                        <div className="mb-3">
                            <label className="form_label" htmlFor="floatingPassword">পাসওয়ার্ড</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control input_box" id="floatingPassword" placeholder="আপনার পাসওয়ার্ড দিন" required />
                        </div>

                        <p className="error">{error?.message}</p>

                        <div className="buttons mb-3">
                            <input type="submit" className="btn btn-primary" value="সাইন ইন"></input>

                            <Link to="/forgetPassword">
                                <button className='btn btn-light'>পাসওয়ার্ড ভুলে গেছেন?</button>
                            </Link>
                        </div>
                    </form>

                    <p className="mt-3">রকমারিতে নতুন? <Link to="/signUp">সাইন আপ করুন</Link></p>

                    <div className="social_buttons">
                        <button onClick={handleSignInWIthGoogle} className="btn btn-outline-primary">গুগল দিয়ে লগ ইন করুন</button>
                        <button onClick={handleSignInWithFacebook} className="btn btn-primary">ফেসবুক দিয়ে লগ ইন করুন</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;