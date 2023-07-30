// import { useContext } from "react";
// import { CartContext } from "../../context";
import { Container } from "react-bootstrap";
import CartItem from "./cartitem";
import { useState ,useEffect, useContext } from "react";
import './cartsect.css';
import {URL} from '../../constant/const';
import { LogContext } from "../../context";


function CartSection(){
    const [cart,setCart] = useState([]);

    useEffect(()=>{
        fetch(`${URL}/getcart`,{credentials:'include'}).then(
            response=>{
                response.json().then(cart=>{setCart(cart)
                });
        });
    },[]);


    function CreateCart(item){
        return(
            <CartItem
                product_id={item.product_id}
                name={item.name}
                type={item.type}
                count={item.count}
                price={item.price}
                setCart={setCart}
            />
        )
    }

    
    return(
        <>
            <Container>
                <table>
                    <tr>
                        <th>PLAN NAME</th>
                        <th>PLAN TYPE</th>
                        <th>COUNT</th>
                        <th>PLAN PRICE</th>
                        <th></th>
                    </tr>
                    {cart?.map(CreateCart)}
                </table>
            </Container>
        </>
    )
};

export default CartSection;