import { useContext, useState } from "react";
import Footer from "../components/footer/footer";
import Header from "../components/navbar/navbar";
import QueryTable from "../components/querytable/querytable";
import { LogContext } from "../context";
import { Navigate } from "react-router-dom";


function QueriesPage(){
    const {isLogin} = useContext(LogContext);
    if(!isLogin)
        return <Navigate to="/" />
    
    return(
        <>
            <Header/>
            <QueryTable/>
            <Footer/>
        </>
    )
};

export default QueriesPage;