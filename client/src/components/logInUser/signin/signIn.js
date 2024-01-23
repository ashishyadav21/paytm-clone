 const SignIn = ({setLoginPageVisible}) => {
    return (
        <div class='p-12'>
        <div class='container mt-10'>
            <h1 class='text-2xl text-black'>Login with your Paytm account</h1>
            <span class='text-primarySkyColor text-xs'>Paytm App user? No need to create a new account</span>

            <div class='mt-6 divide-y divide-slate-700'>
             <div class='p-4 h-14'>
                <input class='outline-none w-full font-bold text-placeholderColor' placeholder="Enter your Mobile Number or Email."/>
             </div>

             <div class='p-4 h-14 flex justify-between items-center'>
                <input class='outline-none w-full text-placeholderColor font-bold' placeholder="Paytm Password."/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

             </div>
            <div class='mt-0 divide-y divide-slate-700'></div>

            </div>
            <div class='my-4 text-xs'>
             <b class='text-slate-600'>PLEASE NOTE:</b> <span>Paytm and Paytm for Business Dashboard password are same.</span>
            </div>  
             <div class='flex justify-between items-center h-16'>
                <button class='h-12 w-44 p-2 text-center text-sm font-bold text-white rounded-full bg-primaryButton'>
                    Sign in securely
                </button>
                 <button class='text-center text-sm text-primarySkyColor'>
                    Forgot Password
                </button>
             </div>
             <span class='text-xs'>By signing in, you agree to our term and condition.</span>
             <div class='flex bg-grayBackground h-20 items-center p-4 my-4'>
                <div class=' flex basis-1/6 mx-2 justify-end'>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
                 </svg>
                 </div>
 
                <div class='flex flex-col basis-2/3'>
                <b>Or Login through QR Code</b>
                <span class='text-primarySkyColor'>Click here</span>
                </div>
             </div>

        </div>
            <div class='flex w-90 h-16 rounded-2xl items-center bg-skyBlue'>
                    <b class='p-2 flex justify-end basis-1/3 mx-2'>New to Paytm?</b>
                    <button class='p-2 basis-2/3 text-primarySkyColor text-start'
                    onClick={() => setLoginPageVisible(false)}>Log In with your Paytm Account</button>
                </div>
        </div>
    )
}

export default SignIn;