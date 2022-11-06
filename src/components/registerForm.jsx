import React from "react";
import Joi from "joi";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";
import { withRouter } from "../utils/withRouter";

class ReigsterForm extends Form {
  state = { data: { username: "", password: "" }, errors: {} };

  schema = Joi.object({
    username: Joi.string()
      .email({ tlds: { allow: false } })
      .min(5)
      .max(50)
      .required()
      .label("Username"),
    password: Joi.string().min(5).max(255).required().label("Password"),
  });

  doSubmit = async () => {
    // call backend service
    try {
      const response = await userService.register(this.state.data);
      auth.jwtLogin(response.headers["x-auth-token"]);
      window.location = "/profile";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSumbit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}

          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default withRouter(ReigsterForm);
