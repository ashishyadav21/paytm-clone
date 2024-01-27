import React, { useState } from "react";
import axios from 'axios';
import OtpVerify from "../../otpScreen/otp"
import UpdateProfileScreen from "../updateProfileScreen"


const SignUpPage = ({ setLoginPageVisible }) => {

    const [signupForm, setSignupForm] = useState({ username: '', phoneNumber: 23223, password: '', email: '' })
    const [isOTPScreenVisible, setOTPScreenVisibility] = useState(false)
    const [otpResponse, setOtpResponse] = useState(null)
    const [showuserUpdateScreen, setShowUserUpdateScreen] = useState(false)
    const [userDetail, setUserDetail] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    })

    const getUserOtp = () => {
        axios.post('http://localhost:4000/otp/send-otp', {
            phoneNumber: signupForm.phoneNumber,
            email: signupForm.email,
            password: signupForm.password
        })
            .then(function (response) {
                setOtpResponse(response.data)
                setOTPScreenVisibility(true)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const onChangeHandler = (name, e) => {
        const value = e.target.value
        setSignupForm({ ...signupForm, [name]: value })
    }

    return (
        <>
            {!isOTPScreenVisible ?
                (<div class="bg-primary flex p-16">
                    <div class=" container mt-10 bg-white  flex flex-col">

                        <h1 class='text-2xl text-grayTextColor'> Create an Account</h1>
                        <div class='flex flex-col mt-4 divide-y divide-slate-700'>
                            <div class='p-4 h-14 flex justify-between items-center'>
                                <input class='outline-none text-placeholderColor font-bold' placeholder="Enter Mobile" onChange={(e) => onChangeHandler("phoneNumber", e)} />
                            </div>
                            <div class='p-4 h-14 flex justify-between items-center'>
                                <input class='outline-none text-placeholderColor font-bold' placeholder="Enter Email (Optional)" onChange={(e) => onChangeHandler("email", e)} />
                            </div>
                            <div class='p-4 h-14 flex justify-between items-center'>
                                <input class='outline-none text-placeholderColor font-bold' placeholder="Enter Password" onChange={(e) => onChangeHandler("password", e)} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>

                            </div>
                            <div class='p-4 h-14 flex justify-between items-center'>
                                <input class='outline-none text-placeholderColor font-bold' placeholder="Confirm Password" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>

                            </div>

                            <div class='pt-4'>
                                <input class='mr-4' type="checkbox" id='checkbox' value='agreement' />
                                <label class='text-xs'>I hearby confirm that I am above 18 years old.</label>
                            </div>
                        </div>
                        <div class='flex flex-col'>

                            <button className={`mt-4 h-12 w-44 p-2 text-center text-sm text-white rounded-full  ${!(signupForm.phoneNumber.length >= 10) || !(signupForm.password.trim() !== '') ? 'bg-gray-900' : 'bg-primaryButton'}`}
                                disabled={!(signupForm.phoneNumber.length >= 10) || !(signupForm.password.trim() !== '')}
                                onClick={() => getUserOtp()}>
                                send verification OTP
                            </button>
                            <span class='mt-4 text-xs'>By creating this account, you agree to our term and condition</span>
                        </div>


                        <div class='flex w-90 h-16 rounded-2xl bg-skyBlue items-center justify-center mt-4'>
                            <span class='basis-1/3  p-2 font-bold flex justify-end'>Already a User? </span>
                            <div class='basis-2/3  p-2 justify-start ml-5 text-primarySkyColor' onClick={() => setLoginPageVisible(true)}> Login with your Paytm Account</div>
                        </div>

                    </div>
                </div>) :

                showuserUpdateScreen ? (<UpdateProfileScreen userDetail={userDetail} setUserDetail={setUserDetail} />) :
                    (<OtpVerify otpResponse={otpResponse}
                        setShowUserUpdateScreen={setShowUserUpdateScreen}
                        setUserDetail={setUserDetail}
                        userDetail={userDetail} />)}

        </>


    )
}

export default SignUpPage;