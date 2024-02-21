import './cartsect.css';
import {URL} from '../../constant/const';


function CartItem(props){

    const setCart=props.setCart;

    async function handleDelete(){
        try{
            const response = await fetch(`${URL}/cart/remove` , {
                method:'POST',
                body:JSON.stringify({deleteid:props.product_id}),
                headers:{'Content-Type':'application/json'},
                credentials:'include',
            })
            console.log(response);
            if(response.status===200){
                response.json().then(cart=>{
                    console.log(cart);
                    setCart(cart)});
            }
        }
        catch(err){
            console.log(err);
        }
    }

return(
    <>
        <tr>
            <td>{props.name}</td>
            <td>{props.type}</td>
            <td>{props.count}</td>
            <td>{props.price}</td>
            <td><button className="btn btn-outline-dark" onClick={handleDelete}>REMOVE FROM CART</button></td>
        </tr>
    </>
    )
}

export default CartItem;