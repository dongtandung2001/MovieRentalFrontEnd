import React from "react";
import Form from "./common/form";
import Joi from "joi";

import { withRouter } from "../utils/withRouter";
import auth from "../services/authService";
import _ from "lodash";
import * as customerService from "../services/customerService";

class ProfileForm extends Form {
  state = {
    data: {
      name: "",
      phone: "",
      SSN: "",
    },
    errors: {},
  };

  schema = Joi.object({
    name: Joi.string().min(5).max(50).required().label("Name"),
    phone: Joi.string().min(10).required().label("Phone Number"),
    SSN: Joi.string().min(5).max(255).required().label("SSN"),
    _id: Joi.string(),
  });

  async componentDidMount() {
    const user = auth.getCurrentUser();
    if (!user.customer) {
      return;
    }
    const { data } = await customerService.getCustomer(user.customer);

    this.setState({ data: _.pick(data, ["_id", "name", "phone", "SSN"]) });
  }

  doSubmit = async () => {
    const response = await customerService.save(this.state.data);
    if (response === "created") {
      auth.logout();
      this.props.navigate("/login", { replace: true });
    } else {
      window.location = "/user";
    }
  };
  render() {
    return (
      <div>
        <h1>Profile</h1>
        <form onSubmit={this.handleSumbit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("phone", "Phone Number")}
          {this.renderInput("SSN", "Social Security Number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default withRouter(ProfileForm);
