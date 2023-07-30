import React from "react";
import LoginForm from "../components/forms/login";
import Header from "../components/navbar/navbar";

function LoginPage(){
    return(
        <>
            <Header/>
            <LoginForm/>
        </>
    )
}

export default LoginPage;