import { Link, useNavigate } from "react-router-dom";
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { authentication } from "../../firebase.init";
import { sendSignInLinkToEmail } from "firebase/auth";
import { useState } from "react";

const SignIn = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(authentication);

    // for term agree and not agree:
    const [agree, setAgree] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();

    const [
        signInWithEmailAndPassword,
        loading, error
    ] = useSignInWithEmailAndPassword(authentication);

    const handleSignIn = () => {
        if (user.emailVerified === false) {
            navigate("/verified");
        } else {
            const emaiRegEx = /^\S+@\S+\.\S+$/;

            if (!emaiRegEx.test(email)) {
                alert("Invalid email pattern")
            }

            if (emaiRegEx.test(email) && password) {
                signInWithEmailAndPassword(email, password);
            }
        }
    }

    if (user) {
        console.log("User: ", user)
        console.log("Verification Status: ", user?.emailVerified)
    }

    if (loading) {
        navigate("/");
    }

    if (error) {
        console.log("Error", error)
    }

    return (
        <div className="container section">
            <h4 className="title">signIn</h4>

            <div>
                <div className="mb-3">
                    <label className="form_label" for="floatingInput">ইমেইল এড্রেস</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control input_box" id="floatingInput" placeholder="name@example.com" required />
                </div>

                <div className="mb-3">
                    <label className="form_label" for="floatingPassword">পাসওয়ার্ড</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control input_box" id="floatingPassword" placeholder="Password" required />
                </div>

                <button onClick={handleSignIn} className="btn btn-success">Sign In</button>
            </div>


            <Link to="/signUp">Sign Up</Link>

        </div>
    )
}

export default SignIn;