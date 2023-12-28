import React, { useEffect, useState } from 'react';
import './login.css';
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
// import { API_GUDANG } from '../apis/ApisData';
import { LoadingPage } from '../LoadingPage/LoadingPage';


const ID_REGEX = /^[a-zA-Z0-9]{3,16}$/
const Login = ({handleClick}) => {
    axios.defaults.withCredentials = true;
    const navigate = useNavigate()
    const [idkar,setidkar] = useState('');
    const [pwd, setPwd] = useState('');
    const [validId, setValidId] = useState(false);

    const [idReg, setIdReg] = useState('');
    const [validIdReg, setValidIdReg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [pwdReg, setPwdReg] = useState('');
    const [newPass, setNewPass] = useState('');
    const [matchPwd, setMatchPwd] = useState('');

    useEffect(() => {
        const result = ID_REGEX.test(idkar);
        setValidId(result)
    }, [idkar]);
    
    useEffect(() =>{
    },[idkar,pwd]);

    useEffect(() => {
    const result = ID_REGEX.test(idReg);
    setValidIdReg(result)
    }, [idReg]);

    useEffect(() =>{
    },[idReg,pwdReg,newPass,matchPwd]);


    const handleSign = (e) =>{
        e.preventDefault();
        setidkar('');
        setPwd('');
        setIdReg('');
        setPwdReg('');
        setNewPass('');
        setMatchPwd('');
        document.querySelector('.is-form').classList.remove('active');
        document.querySelector('.box-log').classList.remove('active');
    }

    const handleChange = (e) =>{
        e.preventDefault();
        setidkar('');
        setPwd('');
        setIdReg('');
        setPwdReg('');
        setNewPass('')
        setMatchPwd('');
        document.querySelector('.is-form').classList.add('active');
        document.querySelector('.box-log').classList.add('active');
    }

    
    const handlePass = (e) =>{
        var x = document.getElementById("passAw");
        var y = document.getElementById("passAny");
        if(e.target.checked){
            x.type = "text";
            y.type = "text";
        }
        else{
            x.type = "password";
            y.type = "password";
        }
    }

    const handleCheck = (e) =>{
        var x = document.getElementById("myInput");
        if(e.target.checked){
            x.type = "text";
        }
        else{
            x.type = "password";
        }
    }

    const handleLogin =async (e) =>{
        e.preventDefault()
        const v1 = ID_REGEX.test(idkar);
        const v2 = pwd;
        if(!v1 || !v2){
            Swal.fire({
                icon: 'warning',
                title: 'Invalid Entry',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
            return;
        }
        try {
            setIsLoading(true);
            console.log(process.env.REACT_APP_API_KEY_SR)
            const res = await axios.post(`${process.env.REACT_APP_API_KEY_SR}/login`,{
                "id" : idkar,
                "password" : pwd
            },
            {
              withCredentials: true,
            });
            localStorage.setItem("token", res.data?.refreshToken); 
            setIsLoading(false);
            navigate('/');
        } catch (error) {
            if(error.response){
                console.log(error);
                setIsLoading(false);
                Swal.fire('Oppss','Terjadi Kesalahan','error')
            }
        }
    }

    const handleUpdate = () =>{}

    

  return ( 
    <>
        <div className="box-log">
            <div className="cont-box">
                <div className="aw-box">
                    <div className="bosx signin">
                        <h1>Login Account</h1>
                        <button  className="bSignin" onClick={(e)=>handleSign(e)}>Sign in</button>
                    </div>
                    <div className="bosx signup">
                        <h1>Forgot Password</h1>
                        <button className="bSignUp" onClick={(e)=>handleChange(e)}>Change Password</button>
                    </div>
                </div>
                <div className="is-form">
                        <span onClick={event => handleClick(false)} className="close-button"><i className="bi bi-x-circle-fill"></i></span>
                        <div className="form FormSignin">
                            <form onSubmit={handleLogin}>
                                <h3>Sign In</h3>
                                <input 
                                    type="text" 
                                    placeholder="id karyaawan"
                                    name="idkar"
                                    onChange={(e) => setidkar(e.target.value)}
                                    value={idkar}
                                />
                                <label htmlFor='idkaryawan'>
                                    <span className={validId ? "valid" : "hide"}>
                                        
                                    </span>
                                    <span className={validId || !idkar ? "hide" : "invalid"}>
                                        Harap Cek Ulang Id Karyawan Pastikan Tanpa Spasi *
                                    </span>
                                </label>
                                <br />
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    id="myInput"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                />

                                <br />
                                <div className="coba"  style={{display:"flex", fontSize: "0.6em"}}>
                                    <input type="checkbox" style={{display:"flex",left: 0, width: "15px"}} onChange={(e) =>handleCheck(e)} />
                                    <label htmlFor="vehicle3" style={{color: '#000000', marginLeft: '5px'}}>Show Password</label>
                                </div>
                                <br />
                                <button className='btn btn-success btn-block' disabled={!setValidId || !pwd ? true : false}>
                                Login
                                </button>
                            </form>
                            
                        </div>

                        <div className="form FormSignup">
                            <form onSubmit={handleUpdate}>
                                <h3>Change Password</h3>
                                <input 
                                    type="text"
                                    placeholder="ID Karyawan"
                                    name="username"
                                    onChange={(e) => setIdReg(e.target.value)}
                                    value={idReg}
                                />
                                <label htmlFor='lblkaryawan'>
                                    <span className={validIdReg ? "valid" : "hide"}>
                                        
                                    </span>
                                    <span className={validIdReg || !idReg ? "hide" : "invalid"}>
                                        Harap Cek Ulang Id Karyawan Pastikan Tanpa Spasi *
                                    </span>
                                </label>

                                <br />
                                <input type="password"
                                    placeholder="password"
                                    id="passAw"
                                    name="password"
                                    onChange={(e) => setPwdReg(e.target.value)}
                                    value={pwdReg}
                                />

                                <br />
                                <input type="password"
                                    placeholder="new password"
                                    id="passAwNew"
                                    name="password"
                                    onChange={(e) => setNewPass(e.target.value)}
                                    value={newPass}
                                />

                                <br />
                                <input 
                                    type="password"
                                    placeholder="Confirm Password"
                                    id="passAny"
                                    name="newpassword"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                />
                                <label htmlFor='lblkaryawan'>
                                    <span className={validIdReg ? "valid" : "hide"}>
                                        
                                    </span>
                                    <span className={validIdReg || !idReg ? "hide" : "invalid"}>
                                        Harap Cek Ulang Id Karyawan Pastikan Tanpa Spasi *
                                    </span>
                                </label>
                                

                                <br />
                                <div className="coba" style={{display:"flex", fontSize: "0.6em"}}>
                                    <input type="checkbox" style={{left: "0",display: "flex",width: "15px"}} onChange={(e) => handlePass(e)}/>
                                    <label htmlFor="vehicle3" style={{color: "#000000",marginLeft: "5px"}}>Show Password</label>
                                </div>

                                <br />
                                <button className='btn btn-success btn-block' disabled={!idReg || !pwdReg || !matchPwd ? true : false}>
                                    Simpan
                                </button>
                            </form>
                        </div>

                </div>
            </div>
        </div>
        {isLoading ? <LoadingPage /> : ""}
    </>
  )
}

export default Login