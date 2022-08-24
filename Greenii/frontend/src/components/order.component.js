import React, {Component, useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import DatePicker from "react-datepicker";
import Geocode from "react-geocode";


import AuthService from "../services/auth.service";
import {addDays, addMonths} from "date-fns";
import st from "react-datepicker";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class Order extends Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        id: "",
        orderID: "",
        senderName: "",
        senderPhonenumber: "",
        senderAddress: "",
        receiverName: "",
        receiverPhonenumber: "",
        receiverAddress: "",
        productType: "Document",
        productWeight: "",
        startDate: new Date(),
        startTime:"9-10",
        longitude: 0,
        latitude:0,
        status:"waiting",
        process:0,
        returnLabel: new File([], "", undefined),
        successful: false,
        message: ""
    };

    handleChange(date) {
        this.setState({
            startDate: date
        })
    }

    onChangesenderName = (e) =>{
        this.setState({
            senderName: e.target.value
        });
    }
    onChangesenderPhonenumber = (e) =>{
        this.setState({
            senderPhonenumber: e.target.value
        });
    }
    onChangesenderAddress = (e) =>{
        this.setState({
            senderAddress: e.target.value
        });
    }
    onChangereceiverName = (e) =>{
        this.setState({
            receiverName: e.target.value
        });
    }
    onChangereceiverPhonenumber = (e) =>{
        this.setState({
            receiverPhonenumber: e.target.value
        });
    }
    onChangereceiverAddress = (e) =>{
        this.setState({
            receiverAddress: e.target.value
        });
    }
    onChangeproductType = (e) =>{
        this.setState({
            productType: e.target.value
        });
    }
    onChangeproductWeight = (e) =>{
        this.setState({
            productWeight: e.target.value
        });
    }

    onChangestartTime = (e) =>{
        this.setState({
            startTime: e.target.value
        });
    }


    updateLatAndLng(longitude,latitude,formData){
        this.setState({
            longitude: longitude,
            latitude: latitude
        });
        formData.append('longitude',longitude)
        formData.append('latitude',latitude)
        console.log(longitude,latitude)
        console.log("update successfully!!!!!!")
    }

    handleOrder = (e) =>{
        e.preventDefault();
        // let file1 = document.querySelector('#file').files[0]
        // let formdata = new FormData()
        // // formdata.append("file", file1)
        // formdata.append("111","sssss")

        //this.state.returnLabel.append('file', document.getElementById("file").nodeValue)

        // this.state.returnLabel.append('s',111)

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            let formData = new FormData()
            this.state.returnLabel = document.querySelector(".file").files[0]
            Geocode.setApiKey("AIzaSyB67UGk6WyvsTogwlQ2TRblvexVXz6Qouc");
            Geocode.fromAddress(this.state.senderAddress).then(
                (response) => {
                    const { lat, lng } = response.results[0].geometry.location;
                    // this.setState({
                    //     longitude:response.results[0].geometry.location.lng,
                    //     latitude:response.results[0].geometry.location.lat
                    // })
                    // this.updateLatAndLng(lng,lat,formData)
                    // longitude = lng
                    // latitude = lat
                    // console.log(lat, lng);
                    // formData.append('longitude',lng)
                    // formData.append('latitude',lat)
                },
                (error) => {
                    console.error(error);
                }
            );
            formData.append('longitude',0)
            formData.append('latitude',1)
            formData.append('senderName',this.state.senderName)
            formData.append('senderPhonenumber',this.state.senderPhonenumber)
            formData.append('senderAddress',this.state.senderAddress)
            formData.append('receiverName',this.state.receiverName)
            formData.append('receiverPhonenumber',this.state.receiverPhonenumber)
            formData.append('receiverAddress',this.state.receiverAddress)
            formData.append('productType',this.state.productType)
            formData.append('productWeight',this.state.productWeight)
            formData.append('startDate',this.state.startDate.toLocaleString())
            formData.append('startTime',this.state.startTime)
            formData.append('returnLabel',this.state.returnLabel)
            formData.append('status',this.state.status)
            formData.append('process',this.state.process)


            AuthService.order(
                formData
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );


        }
    }

    render() {
        return (
            <div className="col-md-12">
                <div>
                    <h3 align="center">Order</h3>
                    <Form
                        onSubmit={this.handleOrder}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                                <div className="col-md-12">
                                    <div className="card card-container">

                                <h3>Sender&emsp;&emsp;&emsp;&emsp;&emsp;
                                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Receiver</h3>
                                        <label>Name</label>
                                <div className="row">
                                    {/*<label htmlFor="senderName">Name</label>*/}
                                    &emsp;<Input
                                        type="text"

                                        className="col-md-auto"
                                        name="senderName"
                                        value={this.state.senderName}
                                        onChange={this.onChangesenderName}
                                        validations={[required]}
                                    />
                                    {/*<label htmlFor="receiverName">Name</label>*/}
                                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                    &emsp;&emsp;&emsp;
                                    <Input
                                        type="text"
                                        className="col-md-auto"
                                        name="receiverName"
                                        value={this.state.receiverName}
                                        onChange={this.onChangereceiverName}
                                        validations={[required]}
                                    />


                                </div>
                                        {/*<div className="form-group">*/}
                                        {/*    <label htmlFor="receiverName">Name</label>*/}
                                        {/*    <Input*/}
                                        {/*        type="text"*/}
                                        {/*        className="col-auto"*/}
                                        {/*        name="receiverName"*/}
                                        {/*        value={this.state.receiverName}*/}
                                        {/*        onChange={this.onChangereceiverName}*/}
                                        {/*        validations={[required]}*/}
                                        {/*    />*/}
                                        {/*</div>*/}
                                        <label>Phonenumber</label>
                                <div className="row">
                                    {/*<label htmlFor="senderPhonenumber">Phonenumber</label>*/}
                                    &emsp;<Input
                                        type="text"
                                        className="col-md-auto"
                                        name="senderPhonenumber"
                                        value={this.state.senderPhonenumber}
                                        onChange={this.onChangesenderPhonenumber}
                                        validations={[required]}
                                    />
                                    {/*<label htmlFor="receiverPhonenumber">Phonenumber</label>*/}
                                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                    &emsp;&emsp;&emsp;
                                    <Input
                                        type="text"
                                        className="col-md-auto"
                                        name="receiverPhonenumber"
                                        value={this.state.receiverPhonenumber}
                                        onChange={this.onChangereceiverPhonenumber}
                                        validations={[required]}
                                    />
                                </div>
                                        <label>Address</label>
                                <div className="row">
                                    {/*<label htmlFor="senderAddress">Address</label>*/}
                                    &emsp;<Input
                                        type="text"
                                        className="col-md-auto"
                                        name="senderAddress"
                                        value={this.state.senderAddress}
                                        onChange={this.onChangesenderAddress}
                                        validations={[required]}
                                    />

                                    {/*<label htmlFor="receiverAddress">Address</label>*/}
                                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                    &emsp;&emsp;&emsp;
                                    <Input
                                        type="text"
                                        className="col-md-auto"
                                        name="receiverAddress"
                                        value={this.state.receiverAddress}
                                        onChange={this.onChangereceiverAddress}
                                        validations={[required]}
                                    />
                                </div>

                                        </div>
                                <hr className="my-4"></hr>
                                {/*<h3>Receiver</h3>*/}
                                {/*<div className="form-group">*/}
                                {/*    <label htmlFor="receiverName">Name</label>*/}
                                {/*    <Input*/}
                                {/*        type="text"*/}
                                {/*        className="col-auto"*/}
                                {/*        name="receiverName"*/}
                                {/*        value={this.state.receiverName}*/}
                                {/*        onChange={this.onChangereceiverName}*/}
                                {/*        validations={[required]}*/}
                                {/*    />*/}
                                {/*</div>*/}

                                {/*<div className="form-group">*/}
                                {/*    <label htmlFor="receiverPhonenumber">Phonenumber</label>*/}
                                {/*    <Input*/}
                                {/*        type="text"*/}
                                {/*        className="col-auto"*/}
                                {/*        name="receiverPhonenumber"*/}
                                {/*        value={this.state.receiverPhonenumber}*/}
                                {/*        onChange={this.onChangereceiverPhonenumber}*/}
                                {/*        validations={[required]}*/}
                                {/*    />*/}
                                {/*</div>*/}

                                {/*<div className="form-group">*/}
                                {/*    <label htmlFor="receiverAddress">Address</label>*/}
                                {/*    <Input*/}
                                {/*        type="text"*/}
                                {/*        className="col-auto"*/}
                                {/*        name="receiverAddress"*/}
                                {/*        value={this.state.receiverAddress}*/}
                                {/*        onChange={this.onChangereceiverAddress}*/}
                                {/*        validations={[required]}*/}
                                {/*    />*/}
                                {/*</div>*/}
                                    <div className="col-md-12">
                                        <div className="card card-container">
                                <h3>Details</h3>
                                <div className="form-group">
                                    <label htmlFor="productType">Product Type</label>
                                    <select
                                        name="productType"
                                        className="form-select"
                                        value={this.state.productType}
                                        onChange={this.onChangeproductType}
                                        required>
                                        <option value="document">Document</option>
                                        <option value="eproducts">Electronic products</option>
                                        <option value="clothing">Clothing</option>
                                        <option value="others">Others</option>
                                    </select>

                                </div>

                                <div className="form-group">
                                    <label htmlFor="productWeight">Product Weight (kg)</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="productWeight"
                                        value={this.state.productWeight}
                                        onChange={this.onChangeproductWeight}
                                        validations={[required]}
                                    />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="startDate">Pickup date</label>
                                    <DatePicker
                                        selected={ this.state.startDate }
                                        onChange={ this.handleChange }
                                        minDate={new Date()}
                                        maxDate={addDays(new Date(), 5)}
                                        placeholderText="Select a date between today and 5 days in the future"
                                        value={this.state.startDate}
                                        name="startDate"
                                        dateFormat="MM/dd/yyyy"
                                    />
                                    <label htmlFor="startTime">Pickup time</label>
                                    <select
                                        name="startTime"
                                        className="form-select"
                                        value={this.state.startTime}
                                        onChange={this.onChangestartTime}
                                        required>
                                        <option value="9-10">9:00am-10:00am</option>
                                        <option value="10-11">10:00am-11:00am</option>
                                        <option value="11-12">11:00am-12:00pm</option>
                                        <option value="12-13">12:00pm-13:00pm</option>
                                        <option value="13-14">13:00pm-14:00pm</option>
                                        <option value="14-15">14:00pm-15:00pm</option>
                                        <option value="15-16">15:00pm-16:00pm</option>
                                        <option value="16-17">16:00pm-17:00pm</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                <label htmlFor="returnLabel">Return Label</label>
                                    <input type="file" id="file" name="file" className="file"/>

                                </div>
                                        </div>
                                    </div>
                                <hr className="my-4"></hr>
                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Submit</button>
                                </div>
                            </div>
                        )}

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.message}
                                    <br/>
                                    <a href={'details'}>click here to track this order</a>
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        );
    }

}