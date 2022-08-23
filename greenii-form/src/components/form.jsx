import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "bootstrap";

class Form extends Component {
  state = {
    name: "",
    address: "",
    phoneNo: "",
    emailAddress: "",
    returnCompany: "amazon",
    deliveryTime: "9am-10am",
    contactType: "email",
    productType: "",
    measurementType: "cm",
    weightType: "g",
    productLength: 0,
    productWidth: 0,
    productHeight: 0,
    productWeight: 0,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert(
      "Name: " +
        this.state.name +
        "\nAddress: " +
        this.state.address +
        "\nPhone no: " +
        this.state.phoneNo +
        "\nEmail address: " +
        this.state.emailAddress +
        "\nReturn company: " +
        this.state.returnCompany +
        "\nProduct return type: " +
        this.state.productType +
        "\nContact type: " +
        this.state.contactType +
        "\nPreferred unit for measurement: " +
        this.state.measurementType +
        "\nPreferred unit for weight: " +
        this.state.weightType +
        "\nProduct length: " +
        this.state.productLength +
        "\nProduct width: " +
        this.state.productWidth +
        "\nProduct height: " +
        this.state.productHeight +
        "\nProduct weight: " +
        this.state.productWeight
    );
    event.preventDefault();
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="container">
        <h2 align="center">Return order form</h2>
        <form onSubmit={this.handleSubmit} className="col-md-12">
          <h3>Personal Information</h3>
          <div className="form-group">
            <label className="control-label">Name </label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label className="control-label">Address</label>
            <input
              className="form-control"
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label className="control-label">Phone number </label>
            <input
              className="form-control"
              type="text"
              name="phoneNo"
              value={this.state.phoneNo}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label className="control-label">Email address </label>
            <input
              className="form-control"
              type="text"
              name="emailAddress"
              value={this.state.emailAddress}
              onChange={this.onChange}
            />
          </div> <br/>

          <h3>Package Information</h3>
          <div className="form-group">
            <label className="control-label">Returning company</label>
            <select
              className="form-control"
              id="returnCompany"
              onChange={(e) => this.setState({ returnCompany: e.target.value })}
            >
              <option value="amazon">Amazon</option>
              <option value="walmart">Walmart</option>
              <option value="ebay">eBay</option>
              <option value="wish">Wish</option>
              <option value="newegg">Newegg</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Time of delivery</label>
            <select
              className="form-control"
              id="deliveryTimes"
              onChange={(e) => this.setState({ deliveryTime: e.target.value })}
            >
              <option value="9am-10am">9am - 10am</option>
              <option value="10am-11am">10am - 11am</option>
              <option value="11am-12pm">11am - 12pm</option>
              <option value="12pm-1pm">12pm - 1pm</option>
              <option value="1pm-2pm">1pm - 2pm</option>
              <option value="2pm-3pm">2pm - 3pm</option>
              <option value="3pm-4pm">3pm - 4pm</option>
              <option value="4pm-5pm">4pm - 5pm</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Delivery contact via</label>
            <select
              className="form-control"
              id="contactTypes"
              onChange={(e) => this.setState({ contactType: e.target.value })}
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div> <br/>

          <h3>Product information</h3>
          <div className="form-group">
            <label className="form-label">Product return type</label>
            <input
              className="form-control"
              type="text"
              value={this.state.productType}
              onChange={(e) => this.setState({ productType: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Please select relevant measurement unit
            </label>
            <select
              className="form-control"
              id="measurementTypes"
              onChange={(e) =>
                this.setState({ measurementType: e.target.value })
              }
            >
              <option value="cm">cm</option>
              <option value="m">m</option>
              <option value="inch">inch</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Please select relevant weight unit
            </label>
            <select
              className="form-control"
              id="weightTypes"
              onChange={(e) => this.setState({ weightType: e.target.value })}
            >
              <option value="g">g</option>
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Length of product({this.state.measurementType})
            </label>
            <input
              className="form-control"
              type="number"
              min="0"
              value={this.state.productLength}
              onChange={(e) => this.setState({ productLength: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Width of product({this.state.measurementType})
            </label>
            <input
              className="form-control"
              type="number"
              min="0"
              value={this.state.productWidth}
              onChange={(e) => this.setState({ productWidth: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Height of product({this.state.measurementType})
            </label>
            <input
              className="form-control"
              type="number"
              min="0"
              value={this.state.productHeight}
              onChange={(e) => this.setState({ productHeight: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Weight of product({this.state.weightType})
            </label>
            <input
              className="form-control"
              type="number"
              min="0"
              value={this.state.productWeight}
              onChange={(e) => this.setState({ productWeight: e.target.value })}
            />
          </div> <br/>

          <input className="btn btn-primary" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Form;
