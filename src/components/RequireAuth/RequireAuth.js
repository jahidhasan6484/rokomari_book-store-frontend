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
                <PageTitle title="ইমেইল ভেরিফাই" />

                <h4 className="title">আপনার ইমেইল ভেরিফাই করুন</h4>

                <div className="text-center mt-5">
                    <p className="">দয়া করে আপনার ইমেইল চেক করুন। সেখান থেকে ভেরিফিকেশন লিংকের উপরে ক্লিক করে আপনার ইমেইল ভেরিফাই করুন।</p>
                    <p className="">ইতিমধ্যে আপনার ইমেইল ভেরিফাই করে থাকলে পেজটি রিলোড দিন।</p>

                    <button className="btn btn-dark"
                        onClick={async () => {
                            const success = await sendEmailVerification();
                            if (success) {
                                alert(`${user.email} ইমেইলে একটি নতুন ভেরিফিকেশন লিংক পাঠানো হয়েছে`);
                            }
                        }}
                    >
                        আবার ভেরিফিকেশন লিংক পাঠান
                    </button>

                </div>
            </div>
        )
    }
    return children;


}

export default RequireAuth;