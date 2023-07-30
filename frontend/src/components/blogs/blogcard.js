import Card from 'react-bootstrap/Card';
import './blogcard.css';

function BlogCard(props) {
  return (
    <Card className='blog-card'>
      <Card.Img variant="top" className='card-image' src={props.image} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text style={{textAlign:"justify"}}>{props.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default BlogCard;