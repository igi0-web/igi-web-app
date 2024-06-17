import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../assets/logo/logo.png';
import "./styles/components.css";
export const Header = () => {
  return (
    <header>
      <Navbar expand='lg' className="shadow sticky">
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
              <Nav className="justify-content-end flex-grow-1 pe-3 navLink">
                <Nav.Link className='navLink' href="/">Home</Nav.Link>
                <Nav.Link className='navLink' href="/products">Products</Nav.Link>
                <Nav.Link className='navLink' href="/projects">Projects</Nav.Link>
                <Nav.Link className='navLink' href="/certificates">Certificates</Nav.Link>
                <Nav.Link className='navLink' href="/news">News</Nav.Link>
                <Nav.Link className='navLink' href="/about-us">About Us</Nav.Link>
                <Nav.Link className='navLink' href="/contact-us">Contact Us</Nav.Link>

              </Nav>

            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>

  )
}







