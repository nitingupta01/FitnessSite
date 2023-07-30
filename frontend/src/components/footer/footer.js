import { Container } from "react-bootstrap";
import './footer.css'

function Footer(){
    return(
        <div className="footer">
            <Container>
                <div className="footer-big-box">
                    <div className="footer-small-box">
                        <h4><i class="fa-sharp fa-regular fa-heart"></i>Diet</h4>
                        <p>CopyRight</p>
                        <p>Content write</p>
                        <p>Webiste</p>
                    </div>
                    <div className="footer-small-box">
                        <h4><i class="fa-solid fa-dumbbell"></i>Weight Training</h4>
                        <p>Terms and Conditions</p>
                        <p>Privacy Policy</p>
                    </div>
                    <div className="footer-small-box">
                        <h4><i class="fa-solid fa-person-walking"></i>Exercises</h4>
                        <p>Blog</p>
                        <p>About</p>
                        <p>contact</p>
                    </div>
                </div>
                <div className="footer-second-box">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <p>COPYRIGHT @ 2023</p>
                </div>
            </Container>
        </div>
    )
};

export default Footer;