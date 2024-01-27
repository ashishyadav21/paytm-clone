import axios from "axios"
import React, { useEffect, useState } from "react"
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const user = useSelector((state) => state?.user?.user?.data)
    const [allUsers, setAllUsers] = useState([])
    const [filteredUser, setFilteredUser] = useState([])
    const [userBalance, setUserBalance] = useState(0)
    const [selectedUser, setSelectedUser] = useState(null)
    const [isSendMoneyModalVisible, setIsSendMoneyModalVisible] = useState(false)
    const [amount, setAmount] = useState(0)
    const [visibleToast, setVisibleToast] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:4000/users').then((response) => {
            setAllUsers(response?.data?.users)
            setFilteredUser(response?.data?.users)
        })

        axios.get(`http://localhost:4000/account/balance/${user?._id}`).then((response) => {
            setUserBalance(response?.data?.balance)
        })
    }, [])

    useEffect(() => {
        if (visibleToast) {
            const timer = setTimeout(() => {
                setVisibleToast(false)
                setIsSendMoneyModalVisible(false);
                setFilteredUser(allUsers)
            }, 3000)

            return () => clearTimeout(timer);
        }
    }, [visibleToast])


    const onSendMoneyHandler = (userId) => {
        setIsSendMoneyModalVisible(true)
        setSelectedUser(allUsers.filter((user) => {
            return user?._id == userId
        })[0])
    }

    const onChangeHandler = (value) => {
        const filteredUser = allUsers.filter((user) => {

            return user?.firstName?.toLowerCase().includes(value.toLowerCase())
        })
        setFilteredUser(filteredUser)
    }

    const onInitateTransferHandler = () => {
        axios.post('http://localhost:4000/account/transfer', {
            "amount": +amount,
            "to": selectedUser?._id
        }).then((response) => {
            setVisibleToast(true)
        })
    }

    return (
        <div class='container p-20 flex h-screen flex-col'>
            {!isSendMoneyModalVisible ?
                <>
                    <h1 class='text-2xl'> Hi,  {user?.firstName}, Welcome to Paytm Dashboard.</h1>

                    <h2 class='mt-10'>Your Balance : {userBalance?.toFixed(2)}</h2>

                    <div class='flex flex-col p-5'>
                        <span class='text-2xl'>Users</span>

                        <input class='w-100 border p-1  outline-none shadow-xl' type="search" placeholder="search Users...." onChange={(e) => onChangeHandler(e.target.value)} />

                        <div class='pt-5'>
                            {filteredUser.map((user, key) => (
                                <div key={key} class='flex items-center justify-between m-2'>
                                    <div>
                                        <span class='text-xl m-2 items-center bg-primarySkyColor'>U{key + 1} </span>
                                        <span class='text-xl'>{user.firstName}</span>
                                    </div>
                                    <button class='bg-primaryButton h-10 w-40 rounded-md p-2 items-center text-white text-xs' onClick={() => onSendMoneyHandler(user?._id)}>Send Money</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
                :
                (<div class='w-80 mx-auto my-auto  bg-white rounded-xl shadow-2xl flex flex-col  items-center'>
                    <h1 class='mt-4'>Send Money</h1>

                    <div class='p-4 flex flex-col'>
                        <div class='flex m-2'>
                            <img class='mr-2 bg-green rounded-full h-8 w-8' src='' alt='profile' />
                            <span class='ml-2'>{selectedUser?.firstName}</span>
                        </div>
                        <span class='text-black text-xs m-1'> Amount (in Rs)</span>
                        <input class='text-xs outline-none border rounded-sm p-2 m-1' type="number" placeholder="Enter Amount" onChange={(e) => setAmount(e.target.value)} />
                        <button class='bg-green h-10 w-40 m-1 rounded-md items-center text-white text-xs'
                            onClick={() => onInitateTransferHandler()}>
                            Initiate Transfer
                        </button>

                    </div>
                </div>)}
            <div className={`fixed bottom-4 right-4 bg-green text-white p-4 rounded ${visibleToast ? 'visible' : 'invisible'}`}>
                <p>Your transaction is Successfully Completed.</p>
            </div>
        </div>
    )
}

export default Dashboard