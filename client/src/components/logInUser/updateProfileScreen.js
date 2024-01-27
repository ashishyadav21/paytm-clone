import React, { useEffect, useState } from "react"
import axios from 'axios';
import { } from "react-redux";
import { addUser } from "../../redux/userSlice"
import { useDispatch } from 'react-redux'


const UpdateProfileScreen = ({ userDetail, setUserDetail }) => {

    const [disableUpdateButtom, setDisbaleUpdateButton] = useState(true);
    const dispatch = useDispatch()

    useEffect(() => {
        const hasAllValues = Object.values(userDetail).every(value => value !== null && value !== undefined && value !== '');
        setDisbaleUpdateButton(!hasAllValues)
    }, [userDetail])

    const showUserPassword = () => {
        const element = document.getElementById('password')
        const type = element.getAttribute(
            'type') === 'password' ? 'text' : 'password';
        element.setAttribute('type', type);
    }

    const onChangeHandler = (name, e) => {
        setUserDetail({ ...userDetail, [name]: e.target.value })
    }

    const updateUserDetail = () => {
        const { otp, ...restUserDetails } = userDetail
        axios.post('http://localhost:4000/users/signup', restUserDetails)
            .then(function (response) {
                if (response) {
                    dispatch(addUser(response.data))
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        <div class='container p-20 flex flex-col'>
            <h1 class='text-grayTextColor text-2xl text-center p-8'>User has been successfully created, Please update your details.</h1>

            <div class='flex flex-col mt-4 divide-y divide-slate-700'>
                <div class='p-4 h-14 flex justify-between items-center'>
                    <input class='outline-none text-placeholderColor font-bold'
                        placeholder="First Name"
                        onChange={(e) => onChangeHandler('firstName', e)} />
                </div>
                <div class='p-4 h-14 flex justify-between items-center'>
                    <input class='outline-none text-placeholderColor font-bold'
                        placeholder="Last Name"
                        onChange={(e) => onChangeHandler('lastName', e)} />
                </div>
                <div class='p-4 h-14 flex justify-between items-center'>
                    <input class='outline-none text-placeholderColor font-bold'
                        placeholder="Username"
                        onChange={(e) => onChangeHandler('username', e)} />
                </div>
                <div class='p-4 h-14 flex justify-between items-center'>
                    <input class='outline-none text-placeholderColor font-bold' disabled value={userDetail?.email} />
                </div>
                <div class='p-4 h-14 flex justify-between items-center'>
                    <input class='outline-none text-placeholderColor font-bold'
                        id="password"
                        type="password"
                        value={userDetail?.password} />
                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                        onClick={() => showUserPassword()}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>

                </div>

                <div class='flex flex-col mt-4 divide-y divide-slate-700'></div>

                <button class={`mt-9 h-12 w-44 p-2 text-white text-center text-sm  rounded-xl ${disableUpdateButtom ? 'bg-gray-900' : 'bg-primaryButton'}`}
                    onClick={() => updateUserDetail()}
                    disabled={disableUpdateButtom}>
                    Update User.
                </button>
            </div>
        </div>
    )
}

export default UpdateProfileScreen