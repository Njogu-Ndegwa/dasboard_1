import React from "react";
import styles from '../../../accounting/accounts/components/List.css';

import {Table, Input, Button, Icon, Dropdown, Menu, Row, Col, Modal, Card, Divider} from 'antd';
import Highlighter from 'react-highlight-words';
import AddRoomTypeForm from './AddRoomTypeForm'
import RoomAction from "./RoomAction"
import DropOption from '../../../../common/DropOption/DropOption';

/*
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
];*/

export default class RoomType extends React.Component {

    state = {
        searchText: '',
        visible: false,
        roomTypes: []
    };


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
        this.setState({
            visible: false,
        });
        //refresh table...this function should be implemented in a separate action point, but, due to the pressure around (::), I choose to implement it here!
        this.loadTable();
    };

    componentDidMount() {
        this.loadTable();
    }

    loadTable=()=>{
        RoomAction.fetchRoomTypes().then(response => {
            console.log("Response to refresh ", response);
            this.setState({roomTypes: response})
        });
    }


    handleMenuClick=(record, e)=>{

    }

    render() {
        const columns = [

            {
                title: 'Code',
                dataIndex: 'type_code',
                key: 'type_code',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Room Charges/Night',
                dataIndex: 'charges_per_night',
                key: 'charges_per_night',
            },
            {
                title: 'Comments',
                dataIndex: 'special_comments',
                key: 'special_comments',
            },
            {
                title: "More",
                dataIndex: "",
                key: "delete",
                render: (text, record) => {
                    return (
                        <DropOption
                            onMenuClick={e => this.handleMenuClick(record, e)}
                            menuOptions={[
                                {key: '1', name: "Update"},
                                {key: '2', name: "Delete"},
                            ]}
                        />
                    )
                },
            }
        ];

        const data = this.state.roomTypes;


        const {visible, loading} = this.state;
        return (
            <div id="content">

                <div className="row">

                    <div className="col-sm-12">

                        <Card type={'inner'} title={'Room Types'}>


                            <div>

                                <Row style={{marginBottom: 10, textAlign: 'right', fontSize: 13}}>
                                    <Col>
                                        <Button type="primary" onClick={this.showModal}>
                                            Add New
                                        </Button>
                                    </Col>
                                </Row>


                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    size="small"
                                    simple
                                />


                            </div>

                        </Card>

                    </div>

                    <Modal
                        visible={visible}
                        title="Room Type Details"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                                Cancel
                            </Button>
                        ]}
                    >
                        <AddRoomTypeForm
                            onCancel={this.handleCancel}

                        />
                    </Modal>

                </div>


            </div>
        );
    }
}


