import Footer from "../components/footer/footer";
import Header from "../components/navbar/navbar";
import ProductSection from "../components/prodsec/productsection";

function ProductPage(){
    return(
        <>
            <Header/>
            <body>
            <ProductSection/>
            </body>
            <Footer/>
        </>
    )
}

export default ProductPage;