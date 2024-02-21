import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './prod.css';
import { useContext } from 'react';
import { AdminContext} from '../../context';
import {URL} from '../../constant/const';


function Prod(props) {
  const  {isAdmin} = useContext(AdminContext);
  const setProducts = props.setProducts;

  async function handleAdd(){

    await fetch(`${URL}/cart/add` , {
      method:'POST',
      body: JSON.stringify({product_id:props.id,name:props.name,count:1,type:props.type,price:props.price}),
      headers:{'Content-Type':'application/json'},
      credentials:'include',
    }).then({}).catch(err=>{console.log(err)});
  }

  async function deleteProduct(){
      try{
        const response = await fetch(`${URL}/products/delete`,{
          method:'POST',
          body: JSON.stringify({deleteid:props.id}),
          headers:{'Content-Type':'application/json'},
        });
        if(response.status===200){
          response.json().then(products=>{
            setProducts(products);
          })
        }
        else
          alert('Error');
      }
      catch(err){
        alert('Error');
      }
      
  }
  return (
  <>
    <Card className="product-box">
    <Card.Img variant="top" className="product-image" src={props.image} />
    {isAdmin && <button className='del-button' onClick={deleteProduct}>X</button>}
    <Card.Body>
      <Card.Title>{props.name}</Card.Title>
      <Card.Text><i class="fa-solid fa-check"></i> {props.type}</Card.Text>
      <Card.Text><i class="fa-regular fa-clock"></i> {props.duration}</Card.Text>
      <Card.Text><i class="fa-solid fa-indian-rupee-sign"></i> {props.price}</Card.Text>
      <Button onClick={handleAdd} variant="primary" size='sm' className='product-button'>BUY NOW</Button>
    </Card.Body>
  </Card>
  </>
  );
}

export default Prod;