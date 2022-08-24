import React from 'react'
import LoginFrom from './LoginFrom'
import * as userloginAction from '../../actions/LoginAction'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class LoginPage extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="col-sm-3"></div>

                <div className="col-sm-6">
                    <LoginFrom loginAction={ this.props.loginAction } />
                </div>

                <div className="col-sm-3"></div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    loginAction:bindActionCreators(userloginAction, dispatch),
})

export default connect(null, mapDispatchToProps)(LoginPage);