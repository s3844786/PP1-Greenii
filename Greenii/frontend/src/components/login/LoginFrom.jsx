import React from 'react'
import classnames from 'classnames'
import { withRouter } from 'react-router-dom'
import validataInput from '../../utils/validations/login'

class LoginFrom extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            errors: [],
            idloading: false,
        }
    }

    isValid = (e) => {

        const { errors, isValid } = validataInput(this.state)

        if (!isValid) {
            this.setState({ errors,idloading:false })
        }
       
        return isValid;

    }


    onSubmit = (e) => {
        e.preventDefault();

        this.setState({ errors: {}, idloading: true })

        if (this.isValid()) {
            this.props.loginAction.userloginAction(this.state).then(
                // success
                (res) => {
                    this.props.history.push('/')
                },
                // failure
                (err) => {
                    this.setState({ errors:err.response.data.errors, idloading: false })  
                }
            )
        }

    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {

        const { username, password, idloading, errors } = this.state

        return (
            <form onSubmit={this.onSubmit}>
                <h2>Login </h2>
                {errors.massage && <div className="alert alert-danger">{errors.massage}</div>}
                <div className="form-group">
                    <label className="control-label">Username </label>
                    <input
                        className={classnames('form-control', { 'is-invalid': errors.username })}
                        type="text"
                        name="username"
                        value={username}
                        onChange={this.onChange}
                    />
                    {errors.username && <span className="from-text text-muted">{errors.username}</span>}
                </div>
                <div className="form-group">
                    <label className="control-label">Password </label>
                    <input
                        className={classnames('form-control', { 'is-invalid': errors.password })}
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.onChange}
                    />
                    {errors.password && <span className="from-text text-muted">{errors.password}</span>}

                </div>
                <div className="form-group">
                    <button type="submit" disabled={idloading} className="btn btn-primary btn-md">Login</button>
                </div>
            </form>
        )
    }
}


export default withRouter(LoginFrom)
