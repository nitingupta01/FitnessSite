import { useContext } from "react";
import Footer from "../components/footer/footer";
import Goalsection from "../components/goalsection/goalsect";
import Header from "../components/navbar/navbar";
import Stats from "../components/stats/statssection";
import { LogContext } from "../context";
import { Navigate } from "react-router-dom";


function DashboardPage(){
    const {isLogin} = useContext(LogContext);
    if(!isLogin)
        return <Navigate to="/"/>
    return(
        <>
            <Header/>
            <Stats/>
            <Goalsection/>
            <Footer/>
        </>
    )
}
 
export default DashboardPage;