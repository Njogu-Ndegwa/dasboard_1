import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Input, Checkbox, Button } from 'antd'
import logo from '../../../assets/images/logo.png';
import styles from './auth.module.css';

class Signup extends Component {

    render() {
        if (this.props.authenticated) {
            return <Redirect
                to={{
                    pathname: "/",
                    state: { from: this.props.location }
                }} />;
        }
        return (
            <div>
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
                <div className={styles[`signup-container`]}>
                    <div className={styles[`signup-content`]}>
                        <h1 className={styles[`signup-title`]}>M-Rescue New Account</h1>
                        <WrappedSignupForm {...this.props} />
                        <span className={styles[`login-link`]}>"Already have an account? <Link to="/login">Login!</Link> </span>
                    </div>
                </div>
                <div className={styles['footer']}>
                    All rights reserved © M-Rescue
                </div>
            </div>
        );
    }
}

class SignupForm extends Component {
    state = {
        confirmDirty: false,
    };
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="Name">
                    {getFieldDecorator('full_name', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your Name',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="E-mail">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>
                            I have read the <a href="">agreement</a>
                        </Checkbox>,
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
            </Button>
                </Form.Item>
            </Form>
        );
    }
}
const WrappedSignupForm = Form.create({ name: 'register' })(SignupForm);
export default Signup;