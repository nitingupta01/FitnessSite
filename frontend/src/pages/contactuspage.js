import ContactForm from "../components/contact/contact";
import Footer from "../components/footer/footer";
import Header from "../components/navbar/navbar";
import QueryTable from "../components/querytable/querytable";

function ContactPage(){
    return(
        <>
            <Header/>
            <ContactForm/>
            <Footer/>
        </>
    );
}

export default ContactPage;