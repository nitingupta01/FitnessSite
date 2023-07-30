import { useContext } from "react";
import Cartsect from "../components/cartsection/cartsect";
import Header from "../components/navbar/navbar";
import { LogContext } from "../context";
import { Navigate } from "react-router-dom";

function CartPage(){
    const {isLogin} = useContext(LogContext);

    if(!isLogin)
        return <Navigate to="/"/>

    return(
        <>
        <Header/>
        <Cartsect/>
        </>
    )
};

export default CartPage;