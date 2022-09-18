import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

class ReturnForm extends Component {
  state = {
    name: "",
    street: "",
    streetNo: "",
    suburb: "",
    postcode: "",
    phoneNo: "",
    emailAddress: "",
    returnCompany: "amazon",
    otherReturnCompany: "",
    deliveryTime: "9am-10am",
    contactType: "email",
    productType: "",
    measurementType: "cm",
    weightType: "g",
    productLength: 0,
    productWidth: 0,
    productHeight: 0,
    productWeight: 0,
    wantBox: "no",
    wantLabel: "no",
    selectedFile: null,
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
        this.state.streetNo +
        " " +
        this.state.street +
        " " +
        this.state.suburb +
        " " +
        this.state.postcode +
        "\nPhone no: " +
        this.state.phoneNo +
        "\nEmail address: " +
        this.state.emailAddress +
        "\nReturn company: " +
        this.state.returnCompany +
        "\nOther return company: " +
        this.state.otherReturnCompany +
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
        this.state.productWeight +
        "\nDo you want box? " +
        this.state.wantBox +
        "\nDo you want label? " +
        this.state.wantLabel +
        "\nLabel name " +
        this.state.selectedFile.name
    );
    event.preventDefault();
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = () => {
    const formData = new FormData();

    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    console.log(this.state.selectedFile);

    // Request made to the backend API
    // axios.post("api/uploadfile", formData);
  };

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <p>File Name: {this.state.selectedFile.name}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="container">
        <h2 align="center">Return order form</h2>
        <form className="row g-3" onSubmit={this.handleSubmit}>
          <h3 className="col-md-12">Personal Information</h3>
          <div className="col-md-6">
            <label className="control-label">Name </label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="control-label">Phone number </label>
            <input
              className="form-control"
              type="text"
              name="phoneNo"
              value={this.state.phoneNo}
              onChange={this.onChange}
              placeholder="0123 456 789"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="control-label">Street</label>
            <input
              className="form-control"
              type="text"
              name="street"
              value={this.state.street}
              onChange={this.onChange}
              placeholder="Hello Street"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="control-label">Street number</label>
            <input
              className="form-control"
              type="number"
              name="streetNo"
              value={this.state.streetNo}
              onChange={this.onChange}
              placeholder=" 12"
              min="0"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="control-label">Suburb</label>
            <input
              className="form-control"
              type="text"
              name="suburb"
              value={this.state.suburb}
              onChange={this.onChange}
              placeholder="Melbourne"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="control-label">Postcode</label>
            <input
              className="form-control"
              type="text"
              name="postcode"
              value={this.state.postcode}
              onChange={this.onChange}
              placeholder=" 0000"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="control-label">Email address </label>
            <input
              className="form-control"
              type="text"
              name="emailAddress"
              value={this.state.emailAddress}
              onChange={this.onChange}
              required
            />
          </div>
          <h3 className="col-md-12">Package Information</h3>
          <div className="col-md-6">
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
          <div className="col-md-6">
            {this.state.returnCompany === "other" ? (
              <div>
                <label className="control-label">Please specify</label>
                <input
                  className="form-control"
                  type="text"
                  name="otherReturnCompany"
                  value={this.state.otherReturnCompany}
                  onChange={this.onChange}
                  placeholder="Amazon"
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="col-md-6">
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
          <div className="col-md-6">
            <label className="form-label">Delivery contact via</label>
            <select
              className="form-control"
              id="contactTypes"
              onChange={(e) => this.setState({ contactType: e.target.value })}
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>
          <h3 className="col-md-12">Product information</h3>
          <div className="col-md-4">
            <label className="form-label">Product return type</label>
            <input
              className="form-control"
              type="text"
              value={this.state.productType}
              onChange={(e) => this.setState({ productType: e.target.value })}
              placeholder="Headphones"
              required
            />
          </div>
          <div className="col-md-4">
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
          <div className="col-md-4">
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
          <div className="col-md-3">
            <label className="form-label">
              Length of product({this.state.measurementType})
            </label>
            <input
              className="form-control"
              type="number"
              min="0"
              value={this.state.productLength}
              onChange={(e) => this.setState({ productLength: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">
              Width of product({this.state.measurementType})
            </label>
            <input
              className="form-control"
              type="number"
              min="0"
              value={this.state.productWidth}
              onChange={(e) => this.setState({ productWidth: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">
              Height of product({this.state.measurementType})
            </label>
            <input
              className="form-control"
              type="number"
              min="0"
              value={this.state.productHeight}
              onChange={(e) => this.setState({ productHeight: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">
              Weight of product({this.state.weightType})
            </label>
            <input
              className="form-control"
              type="number"
              min="0"
              value={this.state.productWeight}
              onChange={(e) => this.setState({ productWeight: e.target.value })}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Do you want a box?</label>
            <select
              className="form-control"
              id="wantBox"
              onChange={(e) => this.setState({ contactType: e.target.value })}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Do you want a label for return?
            </label>
            <select
              className="form-control"
              id="wantLabel"
              onChange={(e) => this.setState({ contactType: e.target.value })}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">
              Upload packaging label file here
            </label>
            <input type="file" onChange={this.onFileChange} />
          </div>
          <div className="col-md-12">
            <input className="btn btn-primary" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default ReturnForm;
