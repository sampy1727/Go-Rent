import React from 'react';
import './Form.css';

const Form = ({ fields, formData, buttonText, onChange, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div className="form-group" key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={onChange}
            required
          />
        </div>
      ))}
      <button type="submit" className="form-button">{buttonText}</button>
    </form>
  );
};

export default Form;
