import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navbar.css'
import { Link} from 'react-router-dom';
import { useContext, useEffect} from 'react';
import { AdminContext, LogContext, UserContext } from '../../context';
import {URL} from '../../constant/const';


function Header() {
  const {setUser, user} = useContext(UserContext);
  const {isAdmin , setisAdmin} = useContext(AdminContext);
  const {setIsLogin} = useContext(LogContext);

  useEffect(()=>{
    fetch(`${URL}/users/profile`,{credentials:'include'}).then(response=>{
      console.log(response);
      response.json().then(info=>{
        setUser(info.name); 
        setisAdmin(info.isAdmin);
        setIsLogin(true);
        
      }).catch(err=>{console.log(err)})
    }).catch(err=>{
      console.log(err);
    })
  },[]);

  function logout(){
    fetch(`${URL}/users/logout`,{
      method:'POST',
      credentials:'include',
    }).then(()=>{
      setUser(null);
      setisAdmin(false);
      setIsLogin(false);
    }
    ).catch(err=>{});
  }

  return (
    <Navbar expand="lg" className="body-tertiary">
      <Container>
        <Navbar.Brand className='nav-log'>FITNESSFREAK</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='toggler'/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="nav-lin"><Link to='/' style={{textDecoration:"none",color:"inherit"}}>Home</Link></Nav.Link>
            <Nav.Link className="nav-lin"><Link to='/products' style={{textDecoration:"none",color:"inherit"}}>Workout Plans</Link></Nav.Link>
            {!user && <Nav.Link className="nav-lin"><Link to='/login' style={{textDecoration:"none",color:"inherit"}}>Login</Link></Nav.Link>}

            <NavDropdown className="nav-lin" title={user?`Hi ${user}`:<>Hi User</>} id="basic-nav-dropdown" >
              {user && <NavDropdown.Item><Link style={{textDecoration:"none",color:"inherit"}} to={'/dashboard'}>DashBoard</Link></NavDropdown.Item>}
              {!isAdmin && <NavDropdown.Item><Link style={{textDecoration:"none",color:"inherit"}} to={'/contact'}>Contact Us</Link></NavDropdown.Item>}
              {isAdmin && <NavDropdown.Item><Link style={{textDecoration:"none",color:"inherit"}} to={'/queries'}>Queries</Link></NavDropdown.Item>}
              {/* {isAdmin && <NavDropdown.Item><Link style={{textDecoration:"none",color:"inherit"}} to={'/users'}>Users</Link></NavDropdown.Item>} */}
              {user && <NavDropdown.Item><Link style={{textDecoration:"none",color:"inherit"}} onClick={logout}>Log Out</Link></NavDropdown.Item>}
            </NavDropdown>
            {user && !isAdmin && <Nav.Link className="nav-lin"><Link to='/cart' style={{textDecoration:"none",color:"inherit"}}><i class="fa-solid fa-cart-shopping"></i></Link></Nav.Link>}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;