import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import Alert from "../common/Alert";
import "./LoginForm.css";

function LoginForm({login}) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
    let res = await login(formData);

    if(res.success) {
        history.push('/');
    } else {
        setFormErrors(res.errors);
    }
  };

  return (
    <div className="LoginForm">
      <h1 className="pt-5">Member Login</h1>
      <p className="lead">Not yet a member? <a className="signup-link" href="/signup">Signup here</a></p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group grp">
          <label className="mt-2" htmlFor="username">Username</label>  
          <input
            className="form-control login-input"
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
            className="form-control login-input"
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            value={formData.password}
          />
        </div>

        {formErrors.length
            ? <Alert type="danger" messages={formErrors} />
            : null}
        <div className="form-group grp mt-3">
            <button className="btn loginBtn">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
