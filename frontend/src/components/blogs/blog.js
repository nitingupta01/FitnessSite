import { Container } from "react-bootstrap";
import BlogCard from "./blogcard";
import './blog.css';

function BlogSection(){

    const data="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.";

    return(
        <>
        <Container className="blog-contain">
            <BlogCard name="Angela" image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80" text={data}/>
            <BlogCard name="Hemant" image="https://st2.depositphotos.com/2931363/10135/i/600/depositphotos_101351750-stock-photo-man-in-glasses-with-digital.jpg" text={data}/>
            <BlogCard name="Adarsh" image="https://t4.ftcdn.net/jpg/02/85/20/17/360_F_285201782_87pY8c3Xqzvdc8GswX2H4mup2Go6cvwa.jpg" text={data}/>
        </Container>
        </>
    )
}

export default BlogSection;