import React from 'react'
import { Checkbox, Button, Form, Icon, Input, message } from 'antd';
import { connect } from 'react-redux';
import { actions as loginActions } from './index';
import logo from '../../../assets/images/logo.png';
import styles from './auth.module.css';
import Helmet from 'react-helmet';

const FormItem = Form.Item;

class LoginPage extends React.Component {
    handleSubmit = e => {
        
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                //proceed to login
                const username = 'mrescue';
                const password = 'ccUyb6vS4S8nxfbKPCrN';
                const encrptedPass = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
                const url = `http://3.9.84.199:18080/oauth/token?grant_type=password&username=${values.username}&password=${values.password}`;
                    try {
                    fetch (url, {
                        method: 'POST',
                        headers: {'Authorization': `Basic ${encrptedPass}`}
                    })
                    .then(res => res.json()).then(res => {
                        if(res.access_token){
                            console.log("tokennnnnnnnnnnnnnnnnnn",res.access_token)
                            localStorage.setItem('access_token', res.access_token);
                            message.success('You have logged in succesfully')
                            this.props.history.push("/");
                        } else {
                            message.error('You have entered a wrong email or password')
                        }
                       
                    
                        
                    });

                } catch(ex) {
                    if(ex.response && ex.response.status===400 ) {
                            const errors = {...this.state.errors}
                            errors.username = ex.response.data;
                            this.setState({errors})

                            console.log('aaaaa', errors)
                        alert("Sorry Your username or password is incorrect")
                    } else { console.log("You have an unexpected error") }
                }
                   
            }
        });
            
       
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Helmet titleTemplate="%s | Login" />
                <div className={styles.header}>
                    <div className={styles['header-wrapper']}>
                        <header>
                            <a href="/">
                                <img src={logo} alt="MRescue" />
                            </a>
                            <div className={styles['nav-wrapper']}>
                                <nav>
                                    <ul>
                                        <li>
                                            <a href="#" target="_blank" rel="noopener noreferrer">Help</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </header>
                    </div>
                </div>
                <div className={styles['login-container']}>
                    <div className={styles['login-content']}>
                        <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
                            <h3>Login</h3>
                            <FormItem hasFeedback>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Username is required!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />,
                                )}

                            </FormItem>
                            <FormItem hasFeedback>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Password is required!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />,
                                )}

                            </FormItem>
                            <FormItem>
                                <Checkbox>Remember me</Checkbox>
                                <a className={styles['login-form-forgot']} href="/">Forgot password</a>
                                <Button type="primary" htmlType="submit" className={styles['login-form-button']}>
                                    Login
                                </Button>
                                <a  href="/signup">Sign up</a>
                            </FormItem>
                        </Form>
                    </div>
                </div>
                <div className={styles['footer']}>
                    All rights reserved © M-Rescue
                </div>
            </div>
        );
    }
}

const mapDispachToProps = (dispatch, props) => ({
    login: (formValue) => {
        dispatch(loginActions.login(formValue, props.history));
    }
});

const WrappedLoginForm = Form.create()(LoginPage);
export default connect(null, mapDispachToProps)(WrappedLoginForm);