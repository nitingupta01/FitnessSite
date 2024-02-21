import { Container } from "react-bootstrap";
import CartItem from "./cartitem";
import { useState ,useEffect, useContext } from "react";
import './cartsect.css';
import {URL} from '../../constant/const';


function CartSection(){
    const [cart,setCart] = useState([]);

    useEffect(()=>{
        fetch(`${URL}/cart`,{credentials:'include'}).then(
            response=>{
                response.json().then(cart=>{setCart(cart)
                }).catch(err=>{console.log(err)});
        }).then(err=>console.log(err));
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