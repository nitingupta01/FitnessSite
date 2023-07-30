import { Container } from "react-bootstrap";
import './process.css'

function Process(){
    return(
        <>
        <Container>
        <div className="process-container">
            <div className="box">
                <div><i className="fa-solid fa-bullseye fa-beat"></i></div>
                <h5>ANALYSE YOUR GOAL</h5>
            </div>
            <div className="box">
                <div><i class="fa-solid fa-person-walking fa-fade"></i></div>
                <h5>WORK HARD ON IT</h5>
            </div>
            <div className="box">
                <div><i className="fa-solid fa-gauge fa-spin"></i></div>
                <h5>IMPROVE PERFORMANCE</h5>
            </div>
            <div className="box">
                <div><i className="fa-solid fa-map-pin fa-flip"></i></div>
                <h5>ACHIEVE YOUR DESTINY</h5>
            </div>
        </div>
        </Container>
        </>
    )
};

export default Process;