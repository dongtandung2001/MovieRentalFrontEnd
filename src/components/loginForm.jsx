import React from "react";
import Joi from "joi";
import Form from "./common/form";

class LoginForm extends Form {
  state = { data: { username: "", password: "" }, errors: {} };

  schema = Joi.object({
    username: Joi.string().min(5).max(50).required().label("Username"),
    password: Joi.string().min(5).max(255).required().label("Password"),
  });

  doSubmit = () => {
    // call backend service
    console.log("Submitted");
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

export default LoginForm;
