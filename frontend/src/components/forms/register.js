import React, { useState } from "react";
import "./register.css";
import { Link, Navigate} from "react-router-dom";
import {URL} from '../../constant/const';

function RegisterForm(){
    const [email , setEmail] = useState("");
    const [name , setName] = useState("");
    const [password , setPassword] = useState("");
    const [cpassword , setCpassword] = useState("");
    const [contact , setContact] = useState();
    const [dob , setDob]  = useState();
    const [redirect , setRedirect] = useState(false);

    async function register(e){
        e.preventDefault();
        if(password===cpassword){
            // console.log(name);
            try{
                const response = await fetch(`${URL}/users/register` , {
                    method:'POST',
                    body: JSON.stringify({name,dob,contact,email,password}),
                    headers:{'Content-Type':'application/json'},
                });
                if(response.status===200){
                    alert('Registeration Sucessful');
                    setRedirect(true);
                    setName("");
                    setEmail("");
                    setPassword("");
                    setCpassword("");
                    setContact();
                    setDob();
                }
                else
                    alert('Registeration Failed');
            }
            catch(err){
                alert('Registeration Failed');
            }
        }
        else
            alert('WRONG CREDENTIALS');
    }

    if(redirect)
        return <Navigate to="/login"/>

    return(
        <div className="form-section">
                <div className="form-container">
                    <div className="col-md-6 col-12 form-box">
                        <h1>SIGN UP</h1>
                        <form onSubmit={register}>
                            <div className="mb-3 form-content">
                            <label className="form-label">Name</label>
                            <input className="form-control" type='text' value={name} onChange={e=>setName(e.target.value)} required/>
                            </div>
                            <div className="mb-3 form-content">
                            <label className="form-label">Date Of Birth</label>
                            <input className="form-control" type='date' value={dob} onChange={e => setDob(e.target.value)}/>
                            </div><div className="mb-3 form-content">
                            <label className="form-label">Contact Number</label>
                            <input className="form-control" type='number' value={contact} onChange={e => setContact(e.target.value)}/>
                            </div>
                            <div className="mb-3 form-content">
                            <label className="form-label">Email</label>
                            <input className="form-control" type='email' value={email} onChange={e => setEmail(e.target.value)} required/>
                            </div>
                            <div className="mb-3 form-content">
                            <label className="form-label">Enter Password</label>
                            <input className="form-control" type='password' value={password} onChange={e => setPassword(e.target.value)} required/>
                            </div>
                            <div className="mb-3 form-content">
                            <label className="form-label">Confirm Password</label>
                            <input className="form-control" type='password' value={cpassword} onChange={e=> setCpassword(e.target.value)} required/>
                            </div>
                            <button className="btn btn-outline-dark btn-md">SIGN UP</button>
                        </form>
                        <div className="new">Have an Account ? <Link to="/login" className="login"><span >Login</span></Link></div>
                    </div>
            </div>
        </div>
    )
}

export default RegisterForm;