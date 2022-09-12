import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  state = {
    redirect: null,
    Ready: false,
    currentIdentity: null
    // currentUser: { username:  "" , roles : ""}
  };

  componentDidMount() {
    const role = AuthService.getCurrentRole();
    if(role === 'user'){
      this.setState( {currentIdentity : AuthService.getCurrentUser() });
    }else if (role === 'driver'){
      this.setState( {currentIdentity : AuthService.getCurrentDriver() });
    }

    this.setState({ Ready: true })
  }

  render() {
    // if (this.state.redirect) {
    //   return <Redirect to={this.state.redirect} />
    // }

    const { currentIdentity } = this.state;

    return (
      <div className="container">
        {(this.state.Ready) ?
        <div>
        <header className="jumbotron">
          <h3>
{/* ÷           <strong>{currentIdentity.username} , The role is {currentIdentity.roles} </strong> */}
          </h3>
        </header>
        <p>
          <strong>Id:</strong>{" "}
          {/* {currentIdentity.id} */}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {/* {currentIdentity.email} */}
        </p>

      </div>: null}
      </div>
    );
  }
}
