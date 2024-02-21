import React, { useContext, useState } from "react";
import "./login.css";
import {Link, Navigate} from "react-router-dom";
import {URL} from '../../constant/const';

function LoginForm(){
    // const {setUser} = useContext(UserContext);
    // const {setisAdmin} = useContext(AdminContext);
    // const {setIsLogin} = useContext(LogContext);
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [redirect , setRedirect] = useState(false);

    async function login(e){
        e.preventDefault();
        try{
            const response = await fetch(`${URL}/users/login` , {
            method:'POST',
            body: JSON.stringify({email,password}),
            headers:{'Content-Type':'application/json'},
            credentials:'include',
            })
            if(response.ok){
                // response.json().then(obj=>{
                //     setUser(obj.name);
                //     setisAdmin(obj.isAdmin);
                //     setIsLogin(true);
                    setRedirect(true);
                // }
                // );
                setEmail("");
                setPassword("");
            }
            else
                alert('Wrong Credentails');
        }
        catch(err){
            alert('Please Try Again');
        }  
    }
    
    if(redirect){
        return <Navigate to="/"/>
    }
    return(
        <div className="form-section">
                <div className="form-container">
                    <div className="col-md-6 col-12 form-box">
                        <h1>SIGN IN</h1>
                        <form onSubmit={login}>
                            <div className="mb-3 form-content">
                            <label className="form-label">Email</label>
                            <input className="form-control" type="email"  value={email} onChange={e=> setEmail(e.target.value)} placeholder="Enter Email"></input>
                            </div>
                            <div className="mb-3 form-content">
                            <label className="form-label">Password</label>
                            <input className="form-control" type="password" value={password} onChange={e=> setPassword(e.target.value)} placeholder="Enter Password"></input>
                            </div>
                            <button className="btn btn-outline-dark btn-md ">LOGIN</button>
                        </form>
                        <div className="new">New User ? <Link to="/register" className="register"><span >Register</span></Link></div>
                    </div>
            </div>
        </div>
    )
}

export default LoginForm;