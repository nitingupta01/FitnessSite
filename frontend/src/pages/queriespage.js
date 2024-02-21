import { useContext} from "react";
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
            <body style={{minHeight:"70vh"}}>
            <QueryTable/>
            </body>
            <Footer/>
        </>
    )
};

export default QueriesPage;