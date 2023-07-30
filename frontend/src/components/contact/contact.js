import { Container } from 'react-bootstrap';
import './contact.css'
import { useState } from 'react';
import {URL} from '../../constant/const';

function ContactForm(){

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [query,setQuery] = useState("");

    async function handleContact(e){
        e.preventDefault();
        fetch(`${URL}/query` , {
            method:'POST',
            body:JSON.stringify({name,email,query}),
            headers:{'Content-Type':'application/json'},
        }).then(response=>{
            if(response.status===200){
                alert('Your Query Submitted Successful');
                setName("");
                setEmail("");
                setQuery("");
            }
            else
                alert('Please Try Again');
        }
        ).catch(err=>{
            alert('Please Try Again');
        })
    }

    return(
        <>
        <Container>
        <div class="about-box">
            <div class="main-box">
                <div class="first-box">
                    <h1>CONTACT US</h1>
                    <form onSubmit={handleContact}>
                        <label>NAME</label>
                        <input type="text" value={name} onChange={e=>{setName(e.target.value)}} placeholder='Name Here' required/>
                        <label>EMAIL</label>
                        <input type="email" value={email} onChange={e=>{setEmail(e.target.value)}} placeholder='Email Here' required/>
                        <label>QUERY</label>
                        <textarea rows="5" value={query} onChange={e=>{setQuery(e.target.value)}} placeholder='Query Here' required/>
                        <button className='btn btn-outline-dark'>SUBMIT</button>
                    </form>
                </div>
                <div class="second-box">
                    <img src="https://static.toiimg.com/photo/75126749.cms" alt="About Us"/>
                </div>
            </div>
        </div>
        </Container>
        </>
    )
};

export default ContactForm;