import { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      navigate('/'); // Přesměrování na Dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card style={{ width: '400px' }} className="shadow">
        <Card.Body>
          <h2 className="text-center mb-4">{isLogin ? 'Přihlášení' : 'Registrace'}</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            {!isLogin && (
              <Form.Group className="mb-3">
                <Form.Label>Jméno</Form.Label>
                <Form.Control 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </Form.Group>
            )}
            
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Heslo</Form.Label>
              <Form.Control 
                type="password" 
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                required 
              />
            </Form.Group>

            <Button className="w-100 mt-2" type="submit" variant="primary">
              {isLogin ? 'Přihlásit se' : 'Zaregistrovat se'}
            </Button>
          </Form>

          <div className="text-center mt-3">
            <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Nemáte účet? Zaregistrujte se' : 'Máte účet? Přihlaste se'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;