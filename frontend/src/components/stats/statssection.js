import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from "react";
import {URL} from '../../constant/const';

import './statsection.css';

function Stats(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [distance , setDistance] = useState(0);
    const [duration , setDuration] = useState(0);
    const [workout , setWorkout] =  useState(0);
    const [calories , setCalories] = useState(0);

    useEffect(()=>{
        fetch(`${URL}/stats`,{credentials:'include'}).then(
            response=>{
                response.json().then(obj=>{
                    setCalories(obj.calories);
                    setDistance(obj.distance);
                    setDuration(obj.distance);
                    setWorkout(obj.workout);
                }
            )}
        );
    },[]);

    const [key1 , setKey1] = useState(0);
    const [key2 , setKey2] = useState(0);
    const [key3 , setKey3] =  useState(0);

    function handleAdd(e){
        e.preventDefault();

        setDistance(Math.floor(key3)+Math.floor(distance));
        setCalories(Math.floor(key2)+Math.floor(calories));
        setDuration(Math.floor(key1)+Math.floor(duration));
        setWorkout(1+Math.floor(workout));
        
        setKey1(0);
        setKey2(0);
        setKey3(0);
        setShow(false);
    }

    useEffect(()=>{
        fetch(`${URL}/stats`,{
            method:'PUT',
            body: JSON.stringify({distance,calories,duration,workout}),
            headers:{'Content-Type':'application/json'},
            credentials:'include',
        })
    },[distance])

    
    return(
        <>
        <Container className="stat-container">
            <span className="heading">STATS</span>
            <Button variant="primary" id="btn" onClick={handleShow}>
            ADD STATS
            </Button>
            <div class="stat-info">
                <div class="stat-small-box">
                    <h1 id="key1">{distance}</h1>
                    <p>Distance (miles)</p>
                </div>
                <div class="stat-small-box">
                    <h1 id="key2">{duration}</h1>
                    <p>Duration (hours)</p>
                </div><div class="stat-small-box">
                    <h1 id="key3">{calories}</h1>
                    <p>Calories (Kcal)</p>
                </div><div class="stat-small-box">
                    <h1 id="key4">{workout}</h1>
                    <p>Workouts (number)</p>
                </div>
            </div>
        </Container>
        
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>ADD STATS</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="stat-form">
                    <input type="number" placeholder="Enter DURATION" onChange={e =>{setKey1(e.target.value)}}></input>
                    <input type="number" placeholder="Enter CALORIES" onChange={e =>{setKey2(e.target.value)}}></input>
                    <input type="number" placeholder="Enter DISTANCE" onChange={e =>{setKey3(e.target.value)}}></input>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAdd}>
                    ADD
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default Stats;