import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});

  const handleInputChange = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      setLoggedInUser(data);
    } catch {
      setErrorMsg(true);
    }
    setLoading(false);
  };

  return (
    <div className="body-class">
      <h1>Simple Login Form</h1>

      <div className="form-class">
        <form>
          <div className="form-input">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              data-testid="username"
              name="username"
              placeholder="Username"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-input">
            <label htmlFor="password">Password</label>
            <input
              data-testid="password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!formValues.username || !formValues.password}
            >
              {" "}
              {loading ? "Please hold on while fetching" : "Login"}
            </button>
          </div>
        </form>
        {errorMsg && <p>An Error Occurred</p>}
        <div className="success" data-testid="user">
          {JSON.stringify(loggedInUser)}
        </div>
      </div>
    </div>
  );
}
