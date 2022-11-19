import { useEffect } from "react";
import { useAuthState, useSendEmailVerification } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { authentication } from "../../firebase.init";

const Verified = () => {
    let location = useLocation();

    const [sendEmailVerification] = useSendEmailVerification(authentication);

    // current user:
    const [user, loading] = useAuthState(authentication);


    if(user?.emailVerified === true) {
        return <Navigate to="/signIn" state={{ from: location }} replace />;
    }

    // if (!user) {
    //     return <Navigate to="/signIn" state={{ from: location }} replace />;
    //   };

    return (
        <div className="container section">
        <h4 className="title">উপস</h4>
            <div className="text-center">
                <p className="">দয়া করে আপনার ইমেইল চেক করুন। সেখান থেকে ভেরিফিকেশন লিংকের উপরে ক্লিক করে আপনার ইমেইল ভেরিফাই করুন।</p>
                <p className="">ইতিমধ্যে আপনার ইমেইল ভেরিফাই করে থাকলে পেজটি রিলোড দিন।</p>

                <button
                    className="btn btn-dark mt-5"
                    onClick={async () => {
                        await sendEmailVerification();
                        alert("আপনার ইমেইলে একটি নতুন ভেরিফিকেশন লিংক পাঠানো হয়েছে।")
                    }}
                >
                    আবার ভেরিফিকেশন লিংক পাঠান
                </button>
                
            </div>
        </div>
    )
}

export default Verified;