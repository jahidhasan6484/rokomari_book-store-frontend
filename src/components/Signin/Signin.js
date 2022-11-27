import { Link, useLocation, useNavigate } from "react-router-dom";
import signIn from '../../images/svg/signIn.svg';
import { useState } from "react";
import auth from '../../firebase.init';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import SocialSignIn from "../SocialSignIn/SocialSignIn";


const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    if (user) {
        navigate(from, { replace: true });
    }

    const handleEmailAndPasswordSignIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password)
    }

    return (
        <div className="container section">
            <h4 className="title">লগ ইন করুন</h4>

            <div className="row info">
                <div className="col-md-6 col-12">
                    <img src={signIn} className="" alt='Sign In' />
                </div>
                <div className="col-md-6 col-12">

                    <form className="mb-3" onSubmit={handleEmailAndPasswordSignIn}>
                        <div className="mb-3">
                            <label className="form_label" or="floatingInput"><span className='required'>*</span>ইমেইল এড্রেস</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control input_box" id="floatingInput" placeholder="সঠিক ইমেইল এড্রেস দিন" required />
                        </div>

                        <div className="mb-3">
                            <label className="form_label" htmlFor="floatingPassword"><span className='required'>*</span>পাসওয়ার্ড</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control input_box" id="floatingPassword" placeholder="আপনার পাসওয়ার্ড দিন" required />
                        </div>

                        <p className="error">{error?.message}</p>

                        <div className="buttons mb-3">
                            <input type="submit" className="btn btn-success" value="সাইন ইন"></input>

                            <Link to="/forgetPassword">
                                <button className='btn btn-light'>পাসওয়ার্ড ভুলে গেছেন?</button>
                            </Link>
                        </div>
                    </form>

                    <p className="mt-3">রকমারিতে নতুন? <Link to="/signUp">সাইন আপ করুন</Link></p>

                    <SocialSignIn />
                </div>
            </div>
        </div>
    )
}

export default SignIn;