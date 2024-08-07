import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../assets/logo/logo.png';
import "./styles/components.css";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { signOutFailure, signOutStart, signOutSuccess } from '../state/admin/admin.slice';
import { Button, Dropdown } from 'react-bootstrap';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
      const call = await fetch("https://igi-web-app.onrender.com/api/auth/sign-out", {
        credentials: 'include',
      });
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
      <Navbar expand='lg' className="shadow-sm">
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

                  <Nav.Link className='navLink' href="/admin/dashboard">Dashboard</Nav.Link>
                  <Nav.Link className='navLink' href="/admin/products">Products</Nav.Link>
                  <Nav.Link className='navLink' href="/admin/categories">Categories</Nav.Link>
                  <Nav.Link className='navLink' href="/admin/projects">Projects</Nav.Link>
                  <Nav.Link className='navLink' href="/admin/certificates">Certificates</Nav.Link>
                  <Nav.Link className='navLink' href="/admin/events">News & Events</Nav.Link>
                  <Dropdown>
                    <Dropdown.Toggle className='desiredBtn' variant="dark" id="dropdown-basic">
                      Profile
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                    <Dropdown.Item href="/admin/edit-my-profile">
                                <FontAwesomeIcon icon={faEdit} className='me-2 section-p' /> <span className='section-p'>My Profile</span>
                            </Dropdown.Item>
                      <Dropdown.Item href=""><a onClick={handleLogOut} className='btn navLink text-decoration-none'>Logout</a></Dropdown.Item>
                      
                      
                    </Dropdown.Menu>
                  </Dropdown>
                  <Nav.Link className='navLink' href="/admin/admins">Admins</Nav.Link>
                  
                  


                </Nav>

              }


            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>

  )
}







