import { Navigate, useLocation } from "react-router-dom";
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import auth from "../../firebase.init";
import PageTitle from "../PageTitle/PageTitle";

const RequireAuth = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
    let location = useLocation();
    const [sendEmailVerification] = useSendEmailVerification(auth);

    if (!user) {
        return <Navigate to="/signIn" state={{ from: location }} replace />;
    }

    if (!user.emailVerified) {
        return (
            <div className="container section">
            <h4 className="title">সাইন ইন করুন</h4>
                <button className="btn btn-dark"
                    onClick={async () => {
                        const success = await sendEmailVerification();
                        if (success) {
                            alert('Sent email');
                        }
                    }}
                >
                    Verify email
                </button>
            </div>
        )
    }
    return children;


}

export default RequireAuth;