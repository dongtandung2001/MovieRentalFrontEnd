import React, { Component } from "react";
import Joi from "joi";
import Form from "./common/form";

class ReigsterForm extends Form {
  state = { data: { username: "", password: "", name: "" }, errors: {} };

  schema = Joi.object({
    username: Joi.string()
      .email({ tlds: { allow: false } })
      .min(5)
      .max(50)
      .required()
      .label("Username"),
    password: Joi.string().min(5).max(255).required().label("Password"),
    name: Joi.string().min(5).max(255).required().label("Name"),
  });

  doSubmit = () => {
    // call backend service
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSumbit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}

          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default ReigsterForm;
