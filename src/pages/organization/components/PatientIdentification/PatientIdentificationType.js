import React from "react";
import {Table, Input, Button, Icon, Modal, Card, Row, Col, message, Form} from 'antd';
import Highlighter from 'react-highlight-words';
import IdTypeAction from './IdTypeActions';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class PatientIdentificationType extends React.Component {

    state = {
        searchText: '',
        identificationType: []
    };

    componentDidMount() {
        IdTypeAction.fetchIdType().then(response => {
            console.log(response);
            if (response.error) {
                message.error(response.error);
            } else {
                this.setState({identificationType: response});
            }
        });
        this.props.form.validateFields();

    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({searchText: selectedKeys[0]});
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ''});
    };


    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);
                IdTypeAction.createIdType(values).then(response => {
                    console.log("response ", response);
                    if (response.success) {
                        message.info(response.message);
                        IdTypeAction.fetchIdType().then(response => {
                            console.log(response);
                            if (response.error) {
                                message.error(response.error);
                            } else {
                                this.setState({identificationType: response});
                            }
                        });
                        this.props.form.resetFields();

                    }
                });
            }
        });
    };


    render() {
        const columns = [
            {
                title: 'Identification Type',
                dataIndex: 'identification_name',
                key: 'identification_name',
                width: '20%',
                ...this.getColumnSearchProps('identification_name'),
            }
        ];

        const data = this.state.identificationType;
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        // Only show error after a field is touched.
        const identification_nameError = isFieldTouched('identification_name') && getFieldError('identification_name');
        return (
            <div id="content">

                <Card title="Identification Type">

                    <Row type="flex">
                        <Col span={11}>
                            <Card type="inner" title="Identification Details" /*extra={<a href="#">More</a>}*/>

                                <Form layout="inline" onSubmit={this.handleSubmit} className="identification-type-form">
                                    <Form.Item validateStatus={identification_nameError ? 'error' : ''}
                                               help={identification_nameError || ''}>
                                        {getFieldDecorator('identification_name', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input identification type name!'
                                            }],
                                        })(
                                            <Input
                                                /*prefix={<Icon type="pencil" style={{ color: 'rgba(0,0,0,.25)' }} />}*/
                                                placeholder="identity type name"
                                            />,
                                        )}
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>
                        <Col span={11} offset={2}>

                            <Table
                                columns={columns}
                                dataSource={data}
                                size="small"
                            />
                        </Col>

                    </Row>


                </Card>


            </div>
        );
    }
}

export default Form.create({name: 'identification-type-form'})(PatientIdentificationType);


