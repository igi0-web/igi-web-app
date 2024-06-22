import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../assets/logo/logo.png';
import "./styles/components.css";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { signOutFailure, signOutStart, signOutSuccess } from '../state/admin/admin.slice';
export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentAdmin } = useSelector((state) => {
 
    return state.admin
  })
  const location = useLocation();
  

  const isAdminRoute = location.pathname.startsWith('/admin') && currentAdmin != null;


  const handleLogOut = async () => {
    console.log("Log out entered");
    try {
      dispatch(signOutStart());
      const call = await fetch("/api/auth/sign-out");
      const response = await call.json();
      if (response.success === false) {
        dispatch(signOutFailure(response.message));
        return;
      }
      dispatch(signOutSuccess());
      navigate("/");
    } catch (error) {
      console.log(error.message);
      dispatch(signOutFailure(error.message));
    }
  };

  return (
    <header>
      <Navbar expand='lg' className="shadow">
        <Container fluid>
          <Navbar.Brand href="/"><img src={logo} className='img-fluid' width="180px" alt="" /></Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xl`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-xl`}
            aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xl`}>
                <img src={logo} className='img-fluid' width="180px" alt="" />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {!isAdminRoute ? <Nav className="justify-content-end flex-grow-1 pe-3 navLink">
                <Nav.Link className='navLink' href="/">Home</Nav.Link>
                <Nav.Link className='navLink' href="/products">Products</Nav.Link>
                <Nav.Link className='navLink' href="/projects">Projects</Nav.Link>
                <Nav.Link className='navLink' href="/certificates">Certificates</Nav.Link>
                <Nav.Link className='navLink' href="/news">News & Events</Nav.Link>
                <Nav.Link className='navLink' href="/about-us">About Us</Nav.Link>
                <Nav.Link className='navLink' href="/contact-us">Contact Us</Nav.Link>

              </Nav> :

                <Nav className="justify-content-end flex-grow-1 pe-3 navLink">
                  <Nav.Link className='navLink' href="/">WEBSITE</Nav.Link>
                  <Nav.Link className='navLink' href="/admin/dashboard">Dashboard</Nav.Link>
                  <button onClick={handleLogOut} className='desiredBtn ms-2'>Logout</button>
                  

                </Nav>

              }


            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>

  )
}







