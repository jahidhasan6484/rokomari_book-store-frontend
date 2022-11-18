import { authentication } from '../../firebase.init';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState } from 'react';
import { Navigate } from "react-router-dom";

const Signin = () => {
    const countryCode = "+880";

    const [phoneNumber, setPhoneNumber] = useState(countryCode);
    const [expandForm, setExpandForm] = useState(false);
    const [OTP, setOTP] = useState('')

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recapta-container', {
            // 'size': 'invisible',
            'callback': (response) => {
                if (response) {
                    setExpandForm(true);
                }
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        }, authentication);
    }

    const requestOTP = (e) => {
        e.preventDefault();

        if (phoneNumber.length == 14) {
            generateRecaptcha();
            let appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
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
                    localStorage.setItem('user', JSON.stringify(user.phoneNumber));
                    <Navigate to="/" replace={true} />
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
            <h4 className="title">সাইন ইন করুন</h4>
            <form onSubmit={requestOTP}>
                <div class="mb-3">
                    <label htmlFor='mobileNumber' className='form-label'>মোবাইল নম্বর দিন</label>
                    <input type="tel" class="form-control" id="mobileNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>

                {
                    expandForm === true ?
                        <>
                            <div className='mb-3'>
                                <label htmlFor='otpInput' className='form-label'>ওটিপি (OTP) দিন</label>
                                <input type="number" className="form-control" id="otpInput" placeholder='PLEAE ENTER OTP' value={OTP} onChange={(e) => setOTP(e.target.value)} />
                            </div>
                        </>
                        :
                        null
                }

                {
                    expandForm === false ?
                        <button type='submit' className='btn btn-primary mt-2'>
                            ওটিপি রিকুয়েস্ট করুন
                        </button>
                        : <button onClick={handleConfirmation} className='btn btn-primary mt-2'>
                            ভেরিফাই করুন
                        </button>
                }

                {
                    expandForm === false ?
                        <div id='recapta-container' className='mt-2'></div>
                        :
                        null
                }

            </form>
        </div>
    )
}

export default Signin;