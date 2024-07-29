import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Button from '../Button/button';
import Input from '../Input/input';
import './loginForm.css';
import Swal from 'sweetalert2';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://jossfloreriaapi.integrador.xyz/api/customer/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const token = data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('role', data.role);

      Swal.fire('Bienvenido!');

      if (token) {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role_id || decodedToken.role;

        console.log('Role:', userRole);

        if (userRole === 1) {
          console.log('Redirecting to /admin-inventory');
          navigate('/admin-inventory', { replace: true });
        } else if (userRole === 2) {
          console.log('Redirecting to /');
          navigate('/', { replace: true });
        } else if (userRole === 3) {
          console.log('Redirecting to /delivery-backorders');
          navigate('/delivery-backorders', { replace: true });
        } else {
          console.log('Redirecting to /');
          navigate('/', { replace: true });
        }
      } else {
        console.error('Token is undefined');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login', { replace: true });
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Login'}
        </Button>

        <p className="sign-up-prompt">
          ¿No tienes cuenta todavía? <Link to="/sign-in" className="sign-up-link">Crea una ahora</Link>
        </p>
        <Button onClick={handleLogout}>Logout</Button>
      </form>
    </div>
  );
};

export default LoginForm;
