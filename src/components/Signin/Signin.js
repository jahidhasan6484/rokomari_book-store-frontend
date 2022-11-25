import { Link } from "react-router-dom";
import cod from '../../images/cod.png';
import { useState } from "react";
import auth from '../../firebase.init';
import { signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, sendPasswordResetEmail, FacebookAuthProvider } from "firebase/auth"; import useFirebase from "../../hooks/useFirebase";
;


const SignIn = () => {

    const { user, handleSignInWIthGoogle, handleSignOut, handleFacebookSignIn } = useFirebase();

    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("SIGN IN: ", user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("SIGN ERROR: ", errorCode)
            });
    }

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
            <h4 className="title">লগ ইন করুন</h4>

            <div className="row">
                <div className="col-md-6 sign_first">
                    <div className='col-md-6 sign_first'>
                        <img src={cod} className="cod" alt='Cash On Delivery' />
                        <p>বই হাতে পেয়ে টাকা পরিশোধ করুন।</p>
                    </div>
                </div>
                <div className="col-md-6 col-12">

                    <div className="my-5">
                        <p className="social_signIn mb-5">খুব সহজেই লগ ইন করুন</p>
                        {
                            <p>User: {user.displayName}</p>
                        }
                        <div className="buttons">
                            {
                                user.uid ?
                                    <button onClick={handleSignOut} className="btn btndark">Sign Out</button>
                                    :
                                    <>
                                        <button onClick={handleSignInWIthGoogle} className="btn btn-outline-primary">গুগল দিয়ে</button>
                                        <button onClick={handleFacebookSignIn} className="btn btn-primary">ফেসবুক দিয়ে</button>
                                    </>

                            }


                        </div>
                        {/* <p className="social_signIn">অথবা</p> */}
                    </div>

                    {/* <div className="mb-3">
                        <div className="mb-3">
                            <label className="form_label" or="floatingInput">ইমেইল এড্রেস</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control input_box" id="floatingInput" placeholder="সঠিক ইমেইল এড্রেস দিন" required />
                        </div>

                        <div className="mb-3">
                            <label className="form_label" htmlFor="floatingPassword">পাসওয়ার্ড</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control input_box" id="floatingPassword" placeholder="আপনার পাসওয়ার্ড দিন" required />
                        </div>

                        <div className="buttons mb-3">
                            <button onClick={handleSignIn} className="btn btn-primary">সাইন ইন</button>
                            <Link to="/forgetPassword">
                                <button className='btn btn-light'>পাসওয়ার্ড ভুলে গেছেন?</button>
                            </Link>
                        </div>
                    </div> */}

                    <p className="mt-3">রকমারিতে নতুন? <Link to="/signUp">সাইন আপ করুন</Link></p>



                </div>
            </div>



        </div>
    )
}

export default SignIn;