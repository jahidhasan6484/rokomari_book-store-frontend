import './SignUp.css';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword, RecaptchaVerifier, sendEmailVerification, sendPasswordResetEmail, signInWithPhoneNumber, updateProfile } from "firebase/auth";
import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import bangladeshFlag from '../../images/bangladesh.svg';
import auth from '../../firebase.init';

const SignUp = () => {
    const countryCode = "+880";

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(countryCode);
    const [expandForm, setExpandForm] = useState(false);
    const [OTP, setOTP] = useState('');

    const [readyToCreate, setReadyToCreate] = useState(false)

    const handleCreateAccount = () => {
        const emailRegEx = /^\S+@\S+\.\S+$/;
        const passwordRegEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

        console.log(name == '')

        if (!emailRegEx.test(email)) {
            alert("সঠিক ইমেইল এড্রেস দিন")
        }
        if (password.length < 6) {
            alert("সর্বনিম্ন ৬ অক্ষরের পাসওয়ার্ড দিন")
        }
        if (!passwordRegEx.test(password)) {
            alert("অন্তত একটি নাম্বার ও একটি স্পেশাল অক্ষর দিন")
        }
        if (emailRegEx.test(email) && passwordRegEx.test(password)) {
            console.log(email, password)
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;

                    updateUserProfile();

                    setName('');
                    setEmail('');
                    setPassword('');
                    setPhoneNumber('+880');
                    setOTP('');
                    verifyEmail();

                    console.log("USER: ", user)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage)
                    // ..
                });
        }
    }

    const updateUserProfile = () => {
        updateProfile(auth.currentUser, {
            displayName: name,
            phoneNumber: phoneNumber
        }).then(() => {
            // Profile updated!
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });
    }

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                // Email verification sent!
                // ...
                alert("EKTA EMAIL SEND KORECHI")
            });
    }



    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recapta-container', {
            // 'size': 'invisible',
            'callback': (response) => {
                if (response) {
                    setExpandForm(true);
                }
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        }, auth);
    }

    const requestOTP = () => {
        if (phoneNumber.length === 14) {
            generateRecaptcha();
            let appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                .then(response => {
                    window.confirmationResult = response;
                }).catch((error) => {
                    console.log(error)
                })
        } else {
            alert("সর্বমোট ১৪ অক্ষরের মোবাইল নম্বর দিন")
        }
    }

    const handleConfirmation = () => {
        if (OTP.length === 6) {
            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(OTP).then((result) => {
                // User signed in successfully.
                const user = result.user;
                if (user.phoneNumber === phoneNumber) {
                    setReadyToCreate(true)
                }
            }).catch((error) => {
                alert("ভুল ওটিপি দিয়েছেন")
            });
        } else {
            alert("৬ নম্বরের ওটিপি দিন")
        }
    }

    return (
        <div className="container section">
            <h4 className="title">একাউন্ট তৈরি করুন</h4>
            <div className='row mt-5'>
                <div className='col-md-6 sign_first'>
                    <p>AAAA</p>
                </div>
                <div className='col-md-6 col-12'>

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

                    <div className="mb-3">
                        <label for='mobileNumber' className='form-label'><span className='required'>*</span>মোবাইল নম্বর দিন</label>
                        <div className="input-group mb-3">

                            <div className="input-group-text" id="basic-addon1">
                                <img className='flag' src={bangladeshFlag} alt="Bangladesh Falg"></img>
                            </div>
                            <input type="tel" className="form-control" id="mobileNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} aria-label="Username" aria-describedby="basic-addon1" required />
                        </div>
                    </div>
                    {
                        expandForm === true ?
                            <>
                                <div className='mb-3'>
                                    <label for='otpInput' className='form-label'><span className='required'>*</span>ওটিপি (OTP) দিন</label>
                                    <input type="number" className="form-control" id="otpInput" placeholder='৬ নম্বরের ওটিপি দিন' value={OTP} onChange={(e) => setOTP(e.target.value)} required />
                                </div>
                            </>
                            :
                            null
                    }

                    {
                        readyToCreate === false &&
                        <>
                            {
                                expandForm === false ?
                                    <button onClick={requestOTP} type='submit' className='btn btn-primary mt-2'>
                                        ওটিপি রিকুয়েস্ট করুন
                                    </button>
                                    : <button onClick={handleConfirmation} className='btn btn-primary mt-2'>
                                        ভেরিফাই করুন
                                    </button>
                            }
                        </>
                    }

                    {
                        expandForm === false ?
                            <div id='recapta-container' className='mt-2'></div>
                            :
                            null
                    }

                    {
                        readyToCreate && <button onClick={handleCreateAccount} className='btn btn-success mt-2'>Create Account</button>
                    }

                </div>

                <p className="mt-3">ALready have an account? <Link to="/signIn">Sign In</Link></p>
            </div>
        </div>
    )
}

export default SignUp;