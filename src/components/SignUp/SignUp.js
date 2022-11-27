import './SignUp.css';
import signUp from '../../images/svg/signUp.svg';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import auth from '../../firebase.init';
import SocialSignIn from '../SocialSignIn/SocialSignIn';

const SignUp = () => {
    const navigate = useNavigate();

    const emailRegEx = /^\S+@\S+\.\S+$/;
    const passwordRegEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

    if (user) {
        alert(`${user.user.email} ইমেইল দিয়ে নতুন একাউন্ট তৈরি করা হয়েছে।`)
        navigate('/')
    }

    const handleCreateAccount = (e) => {
        e.preventDefault();

        if (!emailRegEx.test(email)) {
            setErrorMsg("সঠিক ইমেইল এড্রেস দিন");
        }
        if (password.length < 6) {
            setErrorMsg("সর্বনিম্ন ৬ অক্ষরের পাসওয়ার্ড দিন");
        }
        if (!passwordRegEx.test(password)) {
            setErrorMsg("অন্তত একটি নাম্বার ও একটি স্পেশাল অক্ষর দিন");
        }
        if (password !== cPassword) {
            setErrorMsg("দুটো পাসওয়ার্ড মিলছেনা");
        }
        if (emailRegEx.test(email) && passwordRegEx.test(password) && password === cPassword) {
            setErrorMsg('')
            createUserWithEmailAndPassword(email, password)
        }
    }

    return (
        <div className="container section">
            <h4 className="title">একাউন্ট তৈরি করুন</h4>
            <div className='row info'>
                <div className='col-md-6 col-12'>
                    <img src={signUp} className="" alt='Sign Up' />
                </div>
                <div className='col-md-6 col-12'>
                    <form onSubmit={handleCreateAccount} className="mb-3">
                        <div className='mb-3'>
                            <label htmlFor='nameInput' className='form-label'><span className='required'>*</span>আপনার নাম</label>
                            <input type="text" className="form-control" id="nameInput" placeholder='পুরো নাম দিন (বাংলা / ইংরেজী)' value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='emailInput' className='form-label'><span className='required'>*</span>ইমেইল এড্রেস</label>
                            <input type="email" className="form-control" id="emailInput" placeholder='সঠিক ইমেইল এড্রেস দিন' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='passwordInput' className='form-label'><span className='required'>*</span>পাসওয়ার্ড (সর্বনিম্ন ৬ অক্ষর)</label>
                            <input type="password" className="form-control" id="passwordInput" placeholder='অন্তত একটি নাম্বার ও একটি স্পেশাল অক্ষর দিন' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='cPasswordInput' className='form-label'><span className='required'>*</span>কনফার্ম পাসওয়ার্ড</label>
                            <input type="password" className="form-control" id="cPasswordInput" placeholder='আগের মতো পাসওয়ার্ড দিন' value={cPassword} onChange={(e) => setCPassword(e.target.value)} required />
                        </div>

                        <p className="error">{errorMsg}</p>
                        <p className="error">{error?.message}</p>

                        <input type="submit" className="btn btn-success mt-2" value="একাউন্ট তৈরি করুন" />
                    </form>
                    <p className="mt-3">একাউন্ট আছে? <Link to="/signIn">সাইন ইন করুন</Link></p>

                    <SocialSignIn />

                </div>
            </div>
        </div>
    )
}

export default SignUp;