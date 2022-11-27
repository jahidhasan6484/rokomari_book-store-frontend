import profile from '../../images/svg/profile.svg';
import defaultProfile from '../../images/defaultProfile.png';
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Profile = () => {
    const [user] = useAuthState(auth);

    return (
        <div className="container section">
            <h4 className="title">Profile</h4>
            <div className="row info">
                <div className="col-md-6">
                    <img src={profile} alt="Profile"></img>
                </div>
                <div className="col-md-6 profile_data">
                    {
                        user.photoURL ?
                            <img src={user.photoURL} />
                            :
                            <img src={defaultProfile} />
                    }
                    <div className='profile_info'>
                        <p>নাম:</p>
                        <p className='data'>{user.displayName}</p>
                    </div>
                    <div className='profile_info'>
                        <p>ইমেইল:</p>
                        <p className='data'>{user.email}</p>
                    </div>
                    <div className='profile_info'>
                        <p>সর্বশেষ সাইন ইন:</p>
                        <p className='data'>{user.metadata.lastSignInTime}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;