import React, { Component } from 'react';
import {  Card, Button, Menu,  Divider, Table,  PageHeader } from 'antd';
import { ServicePointColumns } from './Columns'
import Icon from '@ant-design/icons'

export default class ServicePointDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            dataSource: [],
            columns: ServicePointColumns,

        }
    }
    componentDidMount() {
    }

   

    render() {
        function handleMenuClick(e) {
            console.log('click', e);
        }

        const menu = (
            <Menu onClick={handleMenuClick}>
                <Menu.Item key="1">
                    <Icon type="download" />
                    Import Items
              </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="upload" />
                    Export Items
              </Menu.Item>
                <Divider style={{ margin: 0 }} />
                <Menu.Item key="3">
                    <Icon type="sync" />
                    Refresh
              </Menu.Item>
            </Menu>
        );
        const { dataSource, isLoading, columns } = this.state;
        return (
            <div id="content">
                <Card>
                    <PageHeader
                        onBack={() => { this.props.history.push('/settings/system') }}
                        title="Service Points"

                        style={{ marginTop: 2, marginBottom: 2 }}
                        extra={[
                            <Button type="primary" key="1"
                                onClick={() => this.props.history.push("/settings/servicepoint/adds")}

                            >
                                New Service Point
                            </Button>
                        ]}
                    />

                    <Table
                        style={{ marginTop: 2 }}
                        loading={isLoading}
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                        size="small"
                        loading={isLoading}
                        rowKey={record => console.log(record)}
                    />
                </Card>
            </div>
        )
    }
}
