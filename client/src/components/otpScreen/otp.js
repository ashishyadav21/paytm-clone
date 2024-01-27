import React, { useState } from 'react'
import axios from 'axios';

const OtpVerify = ({ otpResponse, setShowUserUpdateScreen, setUserDetail, userDetail }) => {

    const [userOTP, setUserOTP] = useState({ phoneNumber: otpResponse?.phoneNumber, otp: '' })

    const validateUserOTP = () => {
        axios.post('http://localhost:4000/otp/otp-verify', {
            "phoneNumber": userOTP.phoneNumber,
            "otp": userOTP.otp
        })
            .then(function (response) {
                if (response?.data?.validate) {
                    setShowUserUpdateScreen(true)
                    setUserDetail({ ...userDetail, ...response?.data?.user })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="container h-screen p-20 flex flex-col items-center justify-center bg-white">
            <h1 class='text-2xl text-grayTextColor'>Enter your OTP to verify.</h1>
            <div class='divide-y-4 divide-slate-400/25'>
                <div className='w-80 p-4 h-18 mt-4 flex justify-between items-center flex-col'>
                    <input className=' w-full text-center p-2 w-50 border-b-2 border-gray-300  outline-none text-placeholderColor font-bold focus:border-primarySkyColor'
                        placeholder="Please Enter the OTP."
                        onChange={(e) => setUserOTP({ ...userOTP, otp: e.target.value })} />

                    <button class='bg-primaryButton w-60 h-14 m-4 rounded-lg text-white text-xs items-center'
                        onClick={() => validateUserOTP()}>
                        Validate OTP
                    </button>
                </div>


            </div>
        </div>
    )
}

export default OtpVerify