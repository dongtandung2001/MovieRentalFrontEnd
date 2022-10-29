import React from "react";
import Joi from "joi";
import Form from "./common/form";
import auth from "../services/authService";
import { withRouter } from "../utils/withRouter";
import { Navigate } from "react-router-dom";

class LoginForm extends Form {
  state = { data: { username: "", password: "" }, errors: {} };

  schema = Joi.object({
    username: Joi.string().min(5).max(50).required().label("Username"),
    password: Joi.string().min(5).max(255).required().label("Password"),
  });

  doSubmit = async () => {
    // call backend service
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      // get previous path before loggin, using location
      const location = this.props.location;
      window.location = location.state ? location.state.from : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }

      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    // navigate to HomePage if the user is already login
    if (auth.getCurrentUser()) return <Navigate to={"/"} />;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSumbit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}

          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
