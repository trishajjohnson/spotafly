import React, { useState, useContext } from "react";
import SpotaflyApi from "../api/api";
import UserContext from "../auth/UserContext";
import { Link, useHistory, Redirect } from "react-router-dom";
import Alert from "../common/Alert";
import "./EditProfileForm.css";

/** Profile editing form.
 *
 * Displays profile form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site.
 *
 * Routed as /profile/:username/edit
 * 
 * Routes -> UserProfile -> EditProfileForm
 */

function EditProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: "",
    img_url: currentUser.img_url
  });
  const history = useHistory();
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

    let profileData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        img_url: formData.img_url
    };

    let username = formData.username;
    let updateUser;

    try {
        updateUser = await SpotaflyApi.updateProfile(username, profileData);
        setFormData(formData => ({...formData, password: ""}));
        setCurrentUser(updateUser);
        history.push(`/profile/${currentUser.username}`);
    } catch(e) {
        console.log(e);
        setFormErrors(e);
    }
  };

  if(!currentUser) return <Redirect to="/login" />

  return (
    
    <div>
        <img className="UserProfile-img mt-3 mb-3" src={currentUser.imgUrl} alt={currentUser.username} />
        <h1>{currentUser.firstName} {currentUser.lastName}</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group grp">
          <label className="mt3" htmlFor="firstName">First Name</label>
          <input
            className="form-control update-input"
            onChange={handleChange}
            type="text"
            name="firstName"
            value={formData.firstName}
            id="firstName"
          />
        </div>
        <div className="form-group grp">
          <label className="mt-2" htmlFor="lastName">Last Name</label>
          <input
            className="form-control update-input"
            onChange={handleChange}
            type="text"
            name="lastName"
            value={formData.lastName}
            id="lastName"
          />
        </div>
        <div className="form-group grp">
          <label className="mt-2" htmlFor="email">Email</label>
          <input
            className="form-control update-input"
            onChange={handleChange}
            type="text"
            name="email"
            value={formData.email}
            id="email"
          />
        </div>
        <div className="form-group grp">
          <label className="mt-2" htmlFor="img_url">Image URL</label>
          <input
            className="form-control update-input"
            onChange={handleChange}
            type="text"
            name="img_url"
            value={formData.img_url}
            id="img_url"
          />
        </div>
        <div className="form-group grp">
          <label className="mt-2" htmlFor="password">Confirm password to make changes:</label>
          <input
            className="form-control update-input"
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
        <div className="form-group grp mt-2 mb-5">
            <Link className="btn updateBtn mr2" to={`/profile/${currentUser.username}`}>Cancel</Link>
            <button className="btn updateBtn">Save Changes</button>
        </div>
      </form>
    </div>
  );
}

export default EditProfileForm;
