import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";

import First from "./First";
import Second from "./Second";
import Third from "./Third";

import {Steps, Button, message, Row, Col, Form, Card} from "antd";

const Step = Steps.Step;

const steps = [
    {
        title: "First",
        content: <First/>
    },
    {
        title: "Second",
        content: <Second/>
    },
    {
        title: "Last",
        content: <Third/>
    }
];

class MainWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0
        };
    }

    next() {
        const current = this.state.current + 1;
        // console.log(current)
        this.setState({current});
    }

    prev() {
        const current = this.state.current - 1;
        // console.log(current)
        this.setState({current});
    }

    handleSubmit = () => {
        console.log("Hello");
        message.success("Processing complete!");
    }

    render() {
        const {current} = this.state;
        console.log(current);
        return (
            <Row bodyStyle={{padding: "12px"}}>

                <Col span={24}>
                    <Steps current={current}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title}/>
                        ))}
                    </Steps>
                </Col>
                <Form name={'main_form'} onSubmit={this.handleSubmit}>
                    <Col span={24}>
                        <div className="steps-cont">
                            {steps.map(({title, content}, i) => (
                                <div
                                    key={title}
                                    className={i === this.state.current ? "wizard-fields fade-in" : "wizard-fields"}
                                >
                                    {content}
                                </div>
                            ))}
                        </div>
                    </Col>
                </Form>
                <Col span={24}>
                    <div className="steps-action">
                        {this.state.current < steps.length - 1 && (
                            <Button type="primary" onClick={() => this.next()}>
                                Next
                            </Button>
                        )}
                        {this.state.current === steps.length - 1 && (
                            <Button
                                type="primary"
                                onClick={this.handleSubmit()}
                            >
                                Done
                            </Button>
                        )}
                        {this.state.current > 0 && (
                            <Button style={{marginLeft: 8}} onClick={() => this.prev()}>
                                Previous
                            </Button>
                        )}
                    </div>
                </Col>

            </Row>
        );
    }
}

const MainForm = Form.create({name: 'main_form'})(First);

export default MainForm;
