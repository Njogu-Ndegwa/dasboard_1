import React, {Component} from "react";
import {
    Card,
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd';

const AutoCompleteOption = AutoComplete.Option;
const {Option} = Select;

class First extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Card>

                <Row>
                    <Col span={4}>

                        <Form.Item>
                            {getFieldDecorator("title", {
                                initialValue: "Select",
                                rules: [
                                    {required: true, message: "Select the title"},
                                    {
                                        validator: (rule, value, callback) => {
                                            console.log("value", value);
                                            if (value === "Select") {
                                                callback("Select the title");
                                            }
                                            callback();
                                        }
                                    }
                                ]
                            })(
                                <Select>
                                    <option value="">Select</option>
                                    <option value="Mr">Mr.</option>
                                    <option value="Mrs">Mrs.</option>
                                    <option value="Miss">Miss</option>
                                </Select>
                            )}
                        </Form.Item>

                    </Col>
                </Row>

            </Card>
        );
    }
}

//const FirstForm = Form.create({name: 'first'})(First);

export default First;
