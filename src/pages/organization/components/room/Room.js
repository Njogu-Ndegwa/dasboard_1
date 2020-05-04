import React from "react";
import "antd/dist/antd.css";

import {
    BigBreadcrumbs,
    JarvisWidget
} from "../../../../common";

import BootstrapValidator from "../../../../common/forms/validation/BootstrapValidator";
import {Table, Input, Button, Icon, Dropdown, Menu, Row, Col, Modal} from 'antd';
import Highlighter from 'react-highlight-words';
import AddRoomForm from './AddRoomForm'

const data = [
    {
        key: '1',
        ward_id: '1',
        room_name: 'Room number one',
        room_type: 'Normal',
    },
    {
        key: '2',
        ward_id: '2',
        room_name: 'Room number two',
        room_type: 'Normal',
    },
    {
        key: '3',
        ward_id: '3',
        room_name: 'Room number three',
        room_type: 'Normal',
    },
    {
        key: '4',
        ward_id: '4',
        room_name: 'Room number four',
        room_type: 'Normal',
    },
    {
        key: '5',
        ward_id: '5',
        room_name: 'Room number five',
        room_type: 'Normal',
    },
];

export default class BootstrapValidation extends React.Component {

    state = {
        searchText: '',
        visible: false
    };

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


    render() {
        const columns = [
            {
                title: 'Ward ID',
                dataIndex: 'ward_id',
                key: 'ward_id',
                width: '20%',
                ...this.getColumnSearchProps('ward_id'),
            },
            {
                title: 'Room Name',
                dataIndex: 'room_name',
                key: 'room_name',
                ...this.getColumnSearchProps('room_name'),
            },
            {
                title: 'Room Type',
                dataIndex: 'room_type',
                key: 'room_type',
                ...this.getColumnSearchProps('room_type'),
            },
            {
                title: "More",
                dataIndex: "",
                key: "delete",
                render: (text, record) => (
                    <Dropdown
                        overlay={
                            <Menu onClick={e => this.handleMenuClick(record, e)}>
                                <Menu.Item key="2">
                                    <Icon type="edit"/>
                                    Edit
                                </Menu.Item>
                                <Menu.Divider/>

                                <Menu.Item key="3">
                                    <Icon type="delete"/>
                                    Delete
                                </Menu.Item>
                            </Menu>
                        }
                    >
                        <Button size="small" color="blue">
                            Action <Icon type="down"/>
                        </Button>
                    </Dropdown>
                )
            }
        ];

        const {visible, loading} = this.state;
        return (
            <div id="content">

                <div className="row">

                    <div className="col-sm-12">

                        <JarvisWidget
                            id="wid-id-0"
                            colorbutton={false}
                            editbutton={false}
                            deletebutton={false}
                            sortable={false}
                        >
                            <header>
                                <h2>Rooms List</h2>
                            </header>


                            <div>

                                <Row style={{marginBottom: 10, textAlign: 'right', fontSize: 13}}>
                                    <Col>
                                        <Button type="primary" onClick={this.showModal}>
                                            Add Room
                                        </Button>
                                    </Col>
                                </Row>

                                <div className="widget-body">

                                    <BootstrapValidator>
                                        <Table
                                            columns={columns}
                                            dataSource={data}
                                            size="small"
                                        />
                                    </BootstrapValidator>


                                </div>

                            </div>

                        </JarvisWidget>

                    </div>

                    <Modal
                        visible={visible}
                        title="Add Room"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                                Return
                            </Button>,
                            // <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            //   Submit
                            // </Button>,
                        ]}
                    >
                        <AddRoomForm/>
                    </Modal>

                </div>


            </div>
        );
    }
}


