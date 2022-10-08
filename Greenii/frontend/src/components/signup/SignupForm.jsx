import React from "react";
import classnames from "classnames";

import { withRouter } from "react-router-dom";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfir: "",
      errors: {},
      isloading: false,
      isvalid: false,
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  // sumbit
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ errors: {}, isloading: true });
    this.props.signupActions.userSignupRequest(this.state).then(
      // ture
      () => {
        // console.log(this.props);
        this.props.flashAction.addFlashMassage({
          type: "success",
          text: "Sign up Successfully！",
        });
        this.props.history.push("/");
      },
      // false
      ({ response }) => {
        this.setState({ errors: response.data, isloading: false });
      }
    );
  };

  clackUserExists = (e) => {
    const fidld = e.target.name;
    const val = e.target.value;
    let isvalid;
    if (val !== "") {
      this.props.signupActions.isUserExists(val).then((res) => {
        let errors = this.state.errors;
        if (res.data[0]) {
          errors[fidld] = 'The user"' + val + '"is existing';
          isvalid = true;
        } else {
          errors[fidld] = "";
          isvalid = false;
        }
        this.setState({ errors, isvalid });
      });
    }
  };

  render() {
    const { errors, isloading, isvalid } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h2>Sign up</h2>

        <div className="form-group">
          <label className="control-label">Username </label>
          <input
            className={classnames("form-control", {
              "is-invalid": errors.username,
            })}
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            onBlur={this.clackUserExists}
          />
          {errors.username && (
            <span className="from-text text-muted">{errors.username}</span>
          )}
        </div>

        <div className="form-group">
          <label className="control-label">Email </label>
          <input
            className={classnames("form-control", {
              "is-invalid": errors.email,
            })}
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          {errors.email && (
            <span className="from-text text-muted">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label className="control-label">Password </label>
          <input
            className={classnames("form-control", {
              "is-invalid": errors.password,
            })}
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          {errors.password && (
            <span className="from-text text-muted">{errors.password}</span>
          )}
        </div>

        <div className="form-group">
          <label className="control-label">Password Confirmation </label>
          <input
            className={classnames("form-control", {
              "is-invalid": errors.passwordConfir,
            })}
            type="password"
            name="passwordConfir"
            value={this.state.passwordConfir}
            onChange={this.onChange}
          />
          {errors.passwordConfir && (
            <span className="from-text text-muted">
              {errors.passwordConfir}
            </span>
          )}
        </div>

        <div className="form-group">
          <button
            type="submit"
            disabled={isloading || isvalid}
            className="btn btn-primary btn-md"
          >
            Signup
          </button>
        </div>
      </form>
    );
  }
}

export default withRouter(SignupForm);
