import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './productcard.css';
import { Link } from 'react-router-dom';

function ProductCard(props) {
  return (
    <Card className="product-box">
    <Card.Img variant="top" className="product-image" src={props.image} />
    <Card.Body>
      <Card.Title>{props.name}</Card.Title>
      <Card.Text>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
      </Card.Text>
      <Link to="/products">
      <Button variant="primary" size='sm' className='product-button'>EXPLORE MORE</Button></Link>
    </Card.Body>
  </Card>
  );
}

export default ProductCard;