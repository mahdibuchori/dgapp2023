import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SideBar } from './SideBar';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import useAuthStore, { selectOnAuth, selectAuthReady } from '../store/DataUser';
import useDataMaterial, { selectFetchMaterial, selectMaterialReady } from '../store/DataMaterial';
import useDataProvider, { selectFetchProvider,selectProviderReady } from '../store/DataProvider';
import useDataDepartemen, { selectFetchDepartemen,selectDepartemenReady } from '../store/DataDepartemen';

const Dashboard = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const [menu, setMenu] = useState('dashboard');
    const onAuth = useAuthStore(selectOnAuth);
    const authReady = useAuthStore(selectAuthReady);

    const onProduct = useDataMaterial(selectFetchMaterial);
    const productReady = useDataMaterial(selectMaterialReady);
    const onProvider = useDataProvider(selectFetchProvider);
    const providerReady = useDataProvider(selectProviderReady);
    const onDepartemen = useDataDepartemen(selectFetchDepartemen);
    const departemenReady = useDataDepartemen(selectDepartemenReady);

    useEffect(() => {
        refreshToken();
        getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // setIsLoading(true);
        if (!authReady) return;
        onGridReady()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authReady]);

    useEffect(() => { 
        // setIsLoading(true);
        onProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => { 
        // setIsLoading(true);
        onProvider()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => { 
        // setIsLoading(true);
        onDepartemen()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // setIsLoading(true);
        if (!productReady) return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productReady]);

    useEffect(() => {
        if (!providerReady) return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [providerReady]);

    useEffect(() => {
        if (!departemenReady) return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [departemenReady]);

    const refreshToken = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_KEY_YT}/token`);
            setToken(response.data.accessToken);
            const decode = jwtDecode(response.data.accessToken);
            setExpire(decode.exp);
        } catch (error) {
            console.log(error)
            if(error.response){
                navigate('/login');
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async(config) =>{
        const currentDate = new Date();
        if(expire * 1000 < currentDate.getTime()){
            const response = await axios.get(`${process.env.REACT_APP_API_KEY_YT}/token`);
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decode = jwtDecode(response.data.accessToken);
            setExpire(decode.expire);
        }
        return config;
    }, (error)=>{
        return Promise.reject(error);
    });

    const getUsers = async () =>{
        try {
            const response = await axiosJWT.get(`${process.env.REACT_APP_API_KEY_YT}/users`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
            });
            setUsers(response.data)
            await onAuth(response.data?.uuid);
        } catch (error) {
            navigate('/login')
        }
    }

    const onGridReady =async () =>{
        await onAuth(users?.uuid);
    }

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                
                <TopBar user={users}/>
                <SideBar menubar={setMenu} data={menu}/>
                <div className="col p-0 m-0">
                    <p>{menu}</p>
                    <Outlet />
                </div>
                <BottomBar menubar={setMenu} data={menu}/>
            </div>
        </div>
    )
}

export default Dashboard