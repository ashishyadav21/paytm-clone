import React, { useState } from "react"
import SignUpPage from './signup/signup'
import SignIn from './signin/signIn'

const MainLoginPage = () => {
    const [isLoginPageVisible, setLoginPageVisible] = useState(false)

    return (
        <div class='bg-primary w-screen h-screen flex'>
            <div class="bg-primaryButton basis-1/2 flex flex-col items-center justify-center">
                <div class='h-50 w-50 m-5'>
                    <img src='https://dashboard.paytm.com/login/assets/p4b-logo-white.svg' alt='paytm-white' />
                </div>
                <div class='h-100 w-100 m-5'>
                    <img src='https://business.paytm.com/s3assets/images/ump-login-assets/allinone-pos.png' alt='paytm' />
                </div>
                <span class='text-white text-2xl m-2'>Paytm Payment Links</span>
                <span class='text-white text-xs m-0.5'>Accept Online Payments at Zero Setup and Maintenance fee</span>
                <div class='flex justify-around items-center justify-center'>
                    <span class='text-xl m-0.5 text-primarySkyColor'>Learn More  </span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00b9f5" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                    </svg>

                </div>
            </div>
            <div class='basis-1/2'>
                {!isLoginPageVisible ?
                    <SignUpPage setLoginPageVisible={setLoginPageVisible} />
                    :
                    <SignIn setLoginPageVisible={setLoginPageVisible} />
                }
            </div>

        </div>
    )
}

export default MainLoginPage