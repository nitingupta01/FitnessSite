import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {URL} from '../../constant/const';
import './addprod.css';


function AddProduct(props){
    const setProducts = props.setProducts; 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[prodname,setProdname]=useState("");
    const[prodimage,setProdimage]=useState("");
    const[prodtype,setProdtype]=useState("");
    const[prodduration,setProdduration]=useState("");
    const[prodprice,setProdPrice]=useState();


    async function handleAdd(e){
        e.preventDefault();
        const response = await fetch(`${URL}/addproduct`,{
            method:'POST',
            body: JSON.stringify({prodname,prodimage,prodtype,prodduration,prodprice}),
            headers:{'Content-Type':'application/json'},
        });
        if(response.status===200){
            alert('Added');
            response.json().then(products=>{
                setProducts(products);
            })
        }
        else
            alert('Error');
        setShow(false);
    }

    return(
        <>
            <Button variant="outline-success" id="btn" onClick={handleShow}>
            ADD WORKOUTS
            </Button>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>ADD PRODUCT</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="add-prod-form">
                    <input type="text" value={prodname} onChange={e=>{setProdname(e.target.value)}} placeholder="Name of Plan" />
                    <input type="text" value={prodimage} onChange={e=>{setProdimage(e.target.value)}} placeholder="Image Link of Plan"/>
                    <input type="text" value={prodtype} onChange={e=>{setProdtype(e.target.value)}} placeholder="Type Of Plan"/>
                    <input type="text" value={prodduration} onChange={e=>{setProdduration(e.target.value)}} placeholder="Duration of Plan"/>
                    <input type="Number" value={prodprice} onChange={e=>{setProdPrice(e.target.value)}} placeholder="Price of Plan"/>
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

export default AddProduct;