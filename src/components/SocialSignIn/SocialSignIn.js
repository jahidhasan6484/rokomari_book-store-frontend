import { useSignInWithGoogle, useSignInWithFacebook } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const SocialSignIn = () => {
    const navigate = useNavigate();
    
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithFacebook, facebokUser, facebookLoading, facebookError] = useSignInWithFacebook(auth);

    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    if (googleUser || facebokUser) {
        navigate(from, { replace: true })
    }
    return (
        <div className="social_buttons">
            <button onClick={() => signInWithGoogle()} className="btn btn-outline-primary">গুগল দিয়ে লগ ইন করুন</button>
            <button onClick={() => signInWithFacebook()} className="btn btn-primary">ফেসবুক দিয়ে লগ ইন করুন</button>
        </div>
    )
}

export default SocialSignIn;