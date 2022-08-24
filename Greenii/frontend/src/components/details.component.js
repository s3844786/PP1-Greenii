import React,{Component} from "react"
import { Divider,Button, Row, Col, Descriptions, Steps, Badge} from 'antd'
import AuthService from "../services/auth.service"

const { Step } = Steps;

export default class Details extends Component {

    state={
        process: 0,
        time : new Date(),
        orderID: 0,
        orderDetail: [],
        showElem: true
    }

    componentDidMount() {
        // this.token = PubSub.subscribe('orderID',(msg,data)=>{
        //     console.log(data.orderID)
        //     console.log()
        //     this.setState({orderID:data.orderID})
        // })
        // console.log(this.state.orderID)
        var orderID
        var localS = localStorage.getItem(orderID);
        this.setState({
            orderID:localS
        })
        console.log(localS);

        AuthService.getOrderDetails(localS).then(
            response => {
                this.setState({orderDetail:response.data})
                console.log(this.state.orderDetail)
                // this.setState({
                //     initLoading: false,
                //     data: response.data,
                //     list: response.data,
                // });
                // this.setState({
                //     message: response.data.message,
                //     successful: true
                // });
            },
            error => {
                console.log("error")
            }
        );

        const role = AuthService.getCurrentRole();
        if(role === 'user'){
            this.setState( {showElem : true});
        }else if (role === 'driver'){
            this.setState( {showElem : false });
        }
    }

    // componentWillUnmount() {
    //     PubSub.unsubscribe(this.token)
    // }

    returnTrack = () =>{
        this.props.history.push("/track");
    }

    acceptOrder = () =>{
        var orderID
        var localS = localStorage.getItem(orderID);
        AuthService.acceptOrder(
            this.state.orderID
        ).then(
            response => {
                this.setState({
                    message: response.data.message,
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
                    message: resMessage
                });
            }
        );

        this.props.history.push("/requestDetail");
    }

    render() {
        const {orderDetail} = this.state
        return (
            <div>
                <Descriptions title="Order Info" bordered>
                    <Descriptions.Item label="Sender Name">{orderDetail.sender_name}</Descriptions.Item>
                    <Descriptions.Item label="Sender Phone" span={2} >{orderDetail.sender_phone}</Descriptions.Item>
                    <Descriptions.Item label="Address" span={3}> {orderDetail.sender_address}</Descriptions.Item>

                    <Descriptions.Item label="Receiver Name">{orderDetail.receiver_name}</Descriptions.Item>
                    <Descriptions.Item label="Receiver Phone" span={2}>{orderDetail.receiver_phone}</Descriptions.Item>
                    <Descriptions.Item label="Address" span={3}>{orderDetail.receiver_address}</Descriptions.Item>

                    <Descriptions.Item label="Order time">{orderDetail.pickup_date}</Descriptions.Item>
                    <Descriptions.Item label="Appointment No:" span={2}>
                        {orderDetail.id}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                        {/*If complete, status = success, or = processing*/}
                        <Badge status="processing" text="Running" />

                    </Descriptions.Item>
                    <Descriptions.Item label="Product Type">{orderDetail.product_type}</Descriptions.Item>
                    <Descriptions.Item label="Product Weight(kg)">{orderDetail.product_weight}</Descriptions.Item>
                    <Descriptions.Item label="Price">$60.00</Descriptions.Item>
                    <Descriptions.Item label="Driver Name">Driver1</Descriptions.Item>
                    <Descriptions.Item label="Drive Phone">13718241781</Descriptions.Item>

                </Descriptions>

                <Divider orientation="left">Status</Divider>

                <Steps progressDot current={(this.state.process ==1 || this.state.process==2)? 1 : this.state.process}>
                    <Step title="Waiting" />
                    <Step title="In Progress"/>
                    <Step title="Finished" />
                </Steps>
                <Divider dashed={true} />
                <Steps progressDot current={this.state.process} direction="vertical">
                    <Step title="Waiting" subTitle={this.state.time.toLocaleString()} description="Waiting for the driver to accept the order" />
                    <Step title="In Progress" subTitle={this.state.time.toLocaleString()} description="The driver has already accepted the order" />
                    <Step title="In Progress" subTitle={this.state.time.toLocaleString()}  description="The driver has already packed the product" />
                    <Step title="Finished" subTitle={this.state.time.toLocaleString()} description="The package has been delivered to the delivery point " />
                </Steps>

                <Row align="middle">
                    <Col span={18}>

                    </Col>
                    <Col offset={3}>
                        {
                            this.state.showElem?(
                            <Button type="primary" onClick={this.returnTrack} >Back</Button>
                            ):(
                            <Button type="primary" onClick={this.acceptOrder} >Accept</Button>
                            )
                        }
                    </Col>
                </Row>

            </div>
        );
    }
}