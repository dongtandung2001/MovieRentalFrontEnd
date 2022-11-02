import React, { Component } from "react";
import auth from "../services/authService";
class User extends Component {
  state = {
    user: {},
  };
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <div>
        <h1>{user.name}</h1>
        <p>Email: {user.email}</p>
        <button className="btn btn-primary btn-sm">Rental Management</button>
      </div>
    );
  }
}

export default User;
