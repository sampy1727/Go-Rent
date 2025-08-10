import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Form from '../components/Form';

const LoginPage = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginFields = [
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async () => {
    setMessage('');
    // Client-side validation
    if (!formData.email || !formData.password) {
      setMessage('Please provide all fields');
      return;
    }

    setLoading(true);

    try {
      await login(formData.email, formData.password);
      setMessage('Login successful!');
      setLoading(false);
      // Redirect to home page after successful login
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setLoading(false);
      setMessage(resMessage);
    }
  };

  return (
    <div className="form-page-container">
      <h2>Login</h2>
      <Form
        fields={loginFields}
        formData={formData}
        buttonText={loading ? 'Logging in...' : 'Login'}
        onChange={handleChange}
        onSubmit={handleLogin}
      />
      {message && (
        <div className="form-message">
          {message}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
