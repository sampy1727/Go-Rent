import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Form from '../components/Form';

const RegisterPage = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const registerFields = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your full name' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Create a password' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async () => {
    setMessage('');
    // Client-side validation
    if (!formData.name || !formData.email || !formData.password) {
      setMessage('Please provide all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await register(formData.name, formData.email, formData.password);
      setMessage(response.data.message + ' Please login to continue.');
      setLoading(false);
      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate('/login');
      }, 2000);
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
      <h2>Register</h2>
      <Form
        fields={registerFields}
        formData={formData}
        buttonText={loading ? 'Registering...' : 'Register'}
        onChange={handleChange}
        onSubmit={handleRegister}
      />
      {message && (
        <div className="form-message">
          {message}
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
