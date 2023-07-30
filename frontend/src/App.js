import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import DashboardPage from './pages/dashboard';
import Mainpage from "./pages/mainpage";
import ProductPage from "./pages/productpage";
import SignUpPage from "./pages/registerpage";
import LoginPage from "./pages/loginpage";
import ContactPage from "./pages/contactuspage";
import { useState } from "react";
import { AdminContext, CartContext, LogContext, UserContext } from "./context";
import CartPage from "./pages/cartpage";
import QueriesPage from "./pages/queriespage";

function App() {

  // const [cart , setCart] = useState([]);
  const [user , setUser] = useState(null);
  const [isAdmin , setisAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
    <AdminContext.Provider value={{isAdmin,setisAdmin}}>
    <LogContext.Provider value={{isLogin,setIsLogin}}>
    <UserContext.Provider value={{user , setUser}}>
    {/* <CartContext.Provider value={{cart,setCart}}> */}
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route exact path="/" element={<Mainpage/>} />
          <Route path="/products" element={<ProductPage/>} />
          <Route path="/register" element={<SignUpPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/dashboard" element={<DashboardPage/>}/>
          <Route path="/contact" element={<ContactPage/>}/>
          <Route path="/queries" element={<QueriesPage/>}/>
          <Route path="/cart" element={<CartPage/>}/>
        </Routes>
      </Router>
    {/* </CartContext.Provider> */}
    </UserContext.Provider>
    </LogContext.Provider>
    </AdminContext.Provider>
    </>
  );
}

export default App;
