import React, { Component } from "react";
import * as customerService from "../services/customerService";
import * as userService from "../services/userService";
import { withRouter } from "../utils/withRouter";

class User extends Component {
  state = {
    user: {},
    customer: {},
  };
  async componentDidMount() {
    const { data: user } = await userService.getUser(
      localStorage.getItem("token")
    );
    const { data: customer } = await customerService.getCustomer(
      user.customer._id
    );

    this.setState({ user, customer });
  }

  render() {
    const { user, customer } = this.state;
    console.log(customer.rents);
    return (
      <div>
        <h1>{customer.name}</h1>
        <p>Email: {user.email}</p>
        <p>Name: {customer.name}</p>
        <p>Phone Number: {customer.phone}</p>
        <p>SSN: {customer.SSN}</p>

        <button
          onClick={() => {
            this.props.navigate("/profile");
          }}
          className="btn btn-primary "
        >
          Edit
        </button>
        <h1>Rented Movies</h1>
        <ul>
          {customer.rents &&
            customer.rents.map((rent) => (
              <li key={rent.movie._id}>{rent.movie.title}</li>
            ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(User);
