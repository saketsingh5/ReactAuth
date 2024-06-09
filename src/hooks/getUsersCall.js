import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../redux/usersSlice'

const getUsersCall = (page)=> {

    const dispatch = useDispatch();

    useEffect(()=>{
       getUsersData(page);
    }, [])

    // For front END  Pagination    

    // const getUsersData = async()=>{
    //     const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/getusers`);
    //     dispatch(getAllUsers(data));
    // }

    const getUsersData = async(page)=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/getusers?offset=${page}&limit=13`);
        dispatch(getAllUsers(data));
    }
}

export default getUsersCall;