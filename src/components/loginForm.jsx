import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi";

class LoginForm extends Component {
  state = { account: { username: "", password: "" }, errors: {} };

  schema = Joi.object({
    username: Joi.string().min(5).max(50).required().label("Username"),
    password: Joi.string().min(5).max(255).required().label("Password"),
  });

  handleSumbit = (e) => {
    e.preventDefault();

    // validation
    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    // call backend service
    console.log("Submitted");
  };

  validate = () => {
    const result = this.schema.validate(this.state.account, {
      abortEarly: false,
    });
    console.log(result);
    const { error } = result;
    if (!error) return null;

    const errors = {};

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = Joi.object({
      [name]: this.schema._ids._byKey.get(name).schema,
    });

    const { error } = schema.validate(obj);

    if (!error) return null;
    return error.details[0].message;
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSumbit}>
          <Input
            name="username"
            label="UserName"
            value={account.username}
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            label="Password"
            value={account.password}
            error={errors.password}
            onChange={this.handleChange}
          />

          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
