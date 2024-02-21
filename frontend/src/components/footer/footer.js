import { Container } from "react-bootstrap";
import './footer.css'

function Footer(){
    return(
        <div className="footer">
            <Container>
                <div className="footer-big-box">
                    <div className="footer-small-box">
                        <h5><i class="fa-sharp fa-regular fa-heart"></i>Diet</h5>
                    </div>
                    <div className="footer-small-box">
                        <h5><i class="fa-solid fa-dumbbell"></i>Training</h5>
                    </div>
                    <div className="footer-small-box">
                        <h5><i class="fa-solid fa-person-walking"></i>Exercises</h5>
                    </div>
                </div>
                <div className="footer-second-box">
                    <p>Made By Nitin</p>
                    <p>COPYRIGHT @ 2023</p>
                </div>
            </Container>
        </div>
    )
};

export default Footer;