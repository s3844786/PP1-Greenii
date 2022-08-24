import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import Order from "./components/order.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Details from "./components/details.component";
import Request from "./components/request.component";
import Track from "./components/track.compoent";
import History from "./components/history.component";
import Process from "./components/process.component";
import ReturnForm from "./components/return-order-form";


// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import RequestDetail from "./components/requestDetail.component";

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            currentDriver:undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        const driver = AuthService.getCurrentDriver();
        console.log(user)
        console.log(driver)

        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }else if (driver){
            this.setState({
                currentDriver: driver
            })
        }

        EventBus.on("logout", () => {
            this.logOut();
        });
    }

    componentWillUnmount() {
        EventBus.remove("logout");
    }

    logOut() {
        AuthService.logout();
        this.setState({
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            currentDriver: undefined,
        });
    }

    render() {
        const { currentUser, currentDriver, showModeratorBoard, showAdminBoard } = this.state;

        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        Greenii Inc
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/returnOrder"} className="nav-link">
                                Return Order
                            </Link>
                        </li>

                        {showModeratorBoard && (
                            <li className="nav-item">
                                <Link to={"/mod"} className="nav-link">
                                    Moderator Board
                                </Link>
                            </li>
                        )}

                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                    Admin Board
                                </Link>
                            </li>
                        )}

                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                    User
                                </Link>
                            </li>
                        )}

                        {currentDriver && (
                            <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                    Driver
                                </Link>
                            </li>
                        )}
                    </div>

                    {currentUser? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a href="/order" className="nav-link">
                                    Order
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link to={"/track"} className="nav-link">
                                    Track
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div></div>
                        // <div className="navbar-nav ml-auto">
                        //     <li className="nav-item">
                        //         <Link to={"/login"} className="nav-link">
                        //             Login
                        //         </Link>
                        //     </li>

                            // <li className="nav-item">
                            //     <Link to={"/register"} className="nav-link">
                            //         Sign Up
                            //     </Link>
                            // </li>
                            //
                            // <li className="nav-item">
                            //     <Link to={"/order"} className="nav-link">
                            //         Order now
                            //     </Link>
                            // </li>
                            //
                            // <li className="nav-item">
                            //     <Link to={"/details"} className="nav-link">
                            //         Details
                            //     </Link>
                            // </li>
                            //
                            // <li className="nav-item">
                            //     <Link to={"/track"} className="nav-link">
                            //         Track
                            //     </Link>
                            // </li>
                        // </div>
                        )}

                    {currentDriver ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a href="/request" className="nav-link">
                                    Requests
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/process" className="nav-link">
                                    Process
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/history" className="nav-link">
                                    History
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentDriver.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div>

                        </div>
                    )}

                    {currentDriver || currentUser ? (
                        <div></div>
                                ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>
                        </div>

                    )}

                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/returnOrder" component={ReturnForm} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/order" component={Order} />
                        <Route exact path="/details" component={Details} />
                        <Route exact path="/track" component={Track} />
                        <Route exact path="/request" component={Request} />
                        <Route exact path="/requestDetail" component={RequestDetail} />
                        <Route exact path="/history" component={History} />
                        <Route exact path="/process" component={Process} />

                        <Route path="/user" component={BoardUser} />
                        <Route path="/mod" component={BoardModerator} />
                        <Route path="/admin" component={BoardAdmin} />

                    </Switch>
                </div>

                { /*<AuthVerify logOut={this.logOut}/> */ }
            </div>
        );
    }
}

export default App;
