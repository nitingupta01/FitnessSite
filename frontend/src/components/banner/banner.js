import './banner.css';
import {Button} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Banner(){
    return(
        <>
        <Container className='banner-container'>
            <div className='banner-container-content'>
                <div>
                <h1>LEARN FROM THE EXPERTS</h1>
                <p>FIND VALUABLE CONTENT AT LOW COST</p>
                <Link to="/products"><Button variant="success">EXPLORE NOW</Button></Link>
                </div>
            </div>
            <div className='banner-container-image'><img className="moveArrow" width={"100%"} src="https://st3.depositphotos.com/13264288/36832/v/450/depositphotos_368326416-stock-illustration-cartoon-boy-weightlifter-character-sport.jpg"></img></div>
        </Container>
        </>
    )
}

export default Banner;