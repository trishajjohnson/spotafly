import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import Alert from "../common/Alert";
import "./SignupForm.css";


function SignupForm({signup}) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    imgUrl: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    let res = await signup(formData);
    if(res.success) {
        history.push('/');
    } else {
        setFormErrors(res.errors);
    }
  };

  return (
    <div className="SignupForm">
      <h1 className="pt-5">Sign Up</h1>
      <p className="lead">Already a member? <a className="signup-link" href="/login">Login here</a></p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group grp">
          <label className="" htmlFor="username">Username</label>
          <input
            className="form-control signup-input"
            onChange={handleChange}
            type="text"
            name="username"
            value={formData.username}
            id="username"
          />
        </div>
        <div className="form-group grp">
          <label className="mt-2" htmlFor="password">Password</label>
          <input
            className="form-control signup-input"
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            value={formData.password}
          />
        </div>
        <div className="form-group grp">
          <label className="mt-3" htmlFor="firstName">First Name</label>
          <input
            className="form-control signup-input"
            onChange={handleChange}
            type="firstName"
            name="firstName"
            id="firstName"
            value={formData.firstName}
          />
        </div>
        <div className="form-group grp">
          <label className="mt-3" htmlFor="lastName">Last Name</label>
          <input
            className="form-control signup-input"
            onChange={handleChange}
            type="lastName"
            name="lastName"
            id="lastName"
            value={formData.lastName}
          />
        </div>
        <div className="form-group grp">
          <label className="mt-3" htmlFor="imgUrl">Image Url (optional)</label>
          <input
            className="form-control signup-input"
            onChange={handleChange}
            type="imgUrl"
            name="imgUrl"
            id="imgUrl"
            value={formData.imgUrl}
          />
        </div>
        <div className="form-group grp">
          <label className="mt-3" htmlFor="email">Email</label>
          <input
            className="form-control signup-input"
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            value={formData.email}
          />
        </div>

        {formErrors.length
            ? <Alert type="danger" messages={formErrors} />
            : null}
        <div className="form-group grp mt-3">
            <button className="btn signupBtn">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;