import Banner from "../components/banner/banner";
import BlogSection from "../components/blogs/blog";
import Footer from "../components/footer/footer";
import Header from "../components/navbar/navbar";
import Hero from "../components/parallax/hero";
import Process from "../components/process/process";

function Mainpage(){
    return(
        <>
            <Header/>
            <Banner/>
            <Process/>
            <Hero/>
            <BlogSection/>
            <Footer/>
        </>
    )
}

export default Mainpage;