import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { FaShoppingCart, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const Navigation = () => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaShoppingCart className="me-2" />
          Nákupní Seznamy
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="align-items-center">
             {user && (
                <>
                    <Navbar.Text className="d-flex align-items-center me-3 text-white">
                       <FaUserCircle size={20} className="me-2"/>
                       
                       <strong>{user.name || user.email}</strong>
                    </Navbar.Text>
                    
                    <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                        <FaSignOutAlt className="me-2"/> Odhlásit
                    </Button>
                </>
             )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;