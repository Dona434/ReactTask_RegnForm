import { useState } from 'react';
import '../../src/RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobNo: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Full Name must be at least 3 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^(?!.*\.\.)(?!\.)[a-zA-Z0-9._-]+(?<!\.)@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.mobNo) {
      newErrors.mobNo = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobNo)) {
      newErrors.mobNo = 'Mobile number must be 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(formData.password)
    ) {
      newErrors.password =
        'Password must be 8 characters long, with at least one uppercase, lowercase, number, or special character';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords does not match';
    }
    
    if (!formData.terms) {
      newErrors.terms = 'Please accept the Terms and Conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleBlur = () => {
    validate();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Data:', formData);
      setSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        mobNo: '',
        password: '',
        confirmPassword: '',
        terms: false,
      });
      setShowPassword(false);
      setErrors({});
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit} noValidate>
      <h2>User Registration</h2>

      <div className="form">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          className={formData.fullName && !errors.fullName ? 'valid' : errors.fullName ? 'invalid' : ''}
        />
        {errors.fullName && <p className="error">{errors.fullName}</p>}
      </div>

      <div className="form">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={formData.email && !errors.email ? 'valid' : errors.email ? 'invalid': ''}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="form">
        <label>Mobile Number</label>
        <input
          type="text"
          name="mobNo"
          value={formData.mobNo}
          onChange={handleChange}
          onBlur={handleBlur}
          className={formData.mobNo && !errors.mobNo ? 'valid' : errors.mobNo ? 'invalid' : ''}
        />
        {errors.mobNo && <p className="error">{errors.mobNo}</p>}
      </div>

      <div className="form">
        <label>Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={formData.password && !errors.password ? 'valid' : errors.password ? 'invalid' : ''}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>

      <div className="form">
        <label>Confirm Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className={formData.confirmPassword && !errors.confirmPassword ? 'valid' : errors.confirmPassword ? 'invalid' : ''}
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
      </div>

      <div className="form">
        <input
          type="checkbox"
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label>I accept Terms & Conditions</label>
        {errors.terms && <p className="error">{errors.terms}</p>}
      </div>

      <div className="form">
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        <label>Show Password</label>
      </div>

      <button type="submit" disabled={Object.keys(errors).length > 0}>Register</button>

      {submitted && <p className="success">Registration successful!</p>}
    </form>
  );
};

export default RegistrationForm;
