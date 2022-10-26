import React from "react";
import Joi from "joi";
import Form from "./common/form";
import { login } from "../services/authService";
import { withRouter } from "../utils/withRouter";

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
      const { data: jwt } = await login(data.username, data.password);
      console.log(jwt);
      localStorage.setItem("token", jwt);
      window.location = "/";
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 400) {
        console.log("here");
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
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
