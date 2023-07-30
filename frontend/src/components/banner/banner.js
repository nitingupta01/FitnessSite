import { Container } from "react-bootstrap";
import ProductCard from "../productcard/productcard";
import './banner.css';
import { useState ,useEffect } from "react";
import {TailSpin} from "react-loader-spinner";
import {URL} from '../../constant/const';

function Banner(){
    const [bannerproducts , setBannerproducts] = useState();
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState(null);

    useEffect(()=>{
        setIsLoading(true);
        fetch(`${URL}/banner`).then(response=>{
            response.json().then(bannerproducts=>{
                setBannerproducts(bannerproducts);
                setIsLoading(false);
                setError(null);
            })
            .catch(err=>{
                setError(err);
                setIsLoading(false);
            })
        }).catch(err=>{
            setError(err)
            setIsLoading(false);
        });
    },[])
    function CreateCard(product){
        return(
            <ProductCard
                name={product.prodname}
                image={product.prodimage}
            />
        )
    }
    return(
    <div className="big-contain">
        <Container className="containee">
            {isLoading && <TailSpin
                height="80"
                width="80"
                color="#800000"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />}
            {error && <div style={{color:"white"}}>Server Error</div>}
            {bannerproducts?.map(CreateCard)}
        </Container>
    </div>
    )
}

export default Banner;