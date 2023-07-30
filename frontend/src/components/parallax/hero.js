import {Parallax} from "react-parallax";
import "./hero.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Hero(){
    const image="https://images4.alphacoders.com/805/805233.jpg";
    return(
        <Parallax bgImage={image} strength={300}>
            <div className="about-hero-div">
                <div className="about-hero-content">
                    <p>NOTHING WILL WORK</p>
                    <p>UNLESS YOU DO</p>
                    <Link to="/products"><Button variant="outline-primary">EXPLORE MORE</Button></Link>
                </div>

            </div>
        </Parallax>
    )
}

export default Hero;