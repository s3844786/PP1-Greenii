import { List, Button, Skeleton } from 'antd';
import React, {Component} from "react";
import AuthService from "../services/auth.service";

const count = 5;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

export default class Track extends Component {
    state = {
        initLoading: true,
        loading: false,
        data: [],
        list: [],
        orderList: []
    };

    componentDidMount() {
        // fetch(fakeDataUrl)
        //     .then(res => res.json())
        //     .then(res => {
        //         console.log(res)
        //         // this.setState({
        //         //     initLoading: false,
        //         //     data: res.results,
        //         //     list: res.results,
        //         // });
        //     });

        // fetch("http://localhost:8080/api/auth/orders/getAll", {
        //     method: 'get',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ //在服务器端通过req.body.eid方式获取
        //         eid: id
        //     })
        // }).then(res =>{
        //     return res.json(); //不是用户需要的数据,通过return返回
        // }).then(data =>{ //用户需要的数据
        //     console.log(data.msg)
        // }).catch(e =>{
        //     console.log(e)
        // })

        AuthService.getOrderList().then(
            response => {
                this.setState({orderList:response.data})
                console.log(this.state.orderList)
                this.setState({
                    initLoading: false,
                    data: response.data,
                    list: response.data,
                });
                // this.setState({
                //     message: response.data.message,
                //     successful: true
                // });
            },
            error => {
                console.log("error")
            }
        );
    }



    renderOrderDetail = (e) =>{
        var orderID
        // PubSub.publish('orderID',{'orderID':e.target.id})
        localStorage.setItem(orderID, e.target.id);
        this.props.history.push("/details");
        // window.location.reload();
    }

    render() {
        const { initLoading, loading, list, orderList } = this.state;

        return (
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                dataSource={list}
                renderItem={order => (
                    <List.Item
                        actions={[<a id={order.id} onClick={this.renderOrderDetail}>Check</a>] }
                    >
                        <Skeleton avatar title={false} loading={order.loading} active>
                        {/*<Skeleton avatar title={false}  active>*/}
                            <List.Item.Meta
                                // avatar={<Avatar src={item.picture.large} />}
                                title={<a id={order.id} onClick={this.renderOrderDetail}>Appointment No. {order.id}</a>}
                                description={ <p >Receiver name: {order.receiver_name}  Receiver address: {order.receiver_address}</p>}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
        );
    }
}