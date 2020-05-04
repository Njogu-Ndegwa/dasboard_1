import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import {
    Table,
    Input,
    Button,
    Card,
    message,
    Menu,
    Dropdown,
    Popconfirm,
    PageHeader,
} from "antd";
import Highlighter from "react-highlight-words";
import Icon from '@ant-design/icons'
import { AuditLogsService } from '../../../../../../config/security';
// import VisitAction from "../../Visit/VisitAction";

class AuditLogs extends Component {
    state = {
        searchText: "",
        isLoading: false,
        dataSource: []
    };

    componentDidMount() {
        AuditLogsService.fetchAuditLogs().then(res => {
            console.log('server response', res)
            if (res.data) {
                this.setState({ dataSource: res.data })
            }
        })


    }

    


    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters
        }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        ref={node => {
                            this.searchInput = node;
                        }}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e =>
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                        }
                        onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                        style={{ width: 188, marginBottom: 8, display: "block" }}
                    />
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm)}
                        icon="search"
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Search
        </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
        </Button>
                </div>
            ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
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
        // render: text => (
        //   <Highlighter
        //     highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        //     searchWords={[this.state.searchText]}
        //     autoEscape
        //     textToHighlight={text.toString()}
        //   />
        // )
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: "" });
    };

    // select the row
    onClickRow = record => {
        return {
            onClick: () => { }
        };
    };
    setRowClassName = record => {
        return "clickRowStyl";
    };


    render() {
        const columns = [

            {
                title: ' Date/Time',
                dataIndex: 'date',
                key: 'date',
                
               
            },

            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                ...this.getColumnSearchProps("name"),
                
            },

            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                

            },

            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
               

            },

            {
                title: 'Old Values',
                dataIndex: 'old_values',
                key: 'old_values',
             

            },

            {
                title: 'New Values',
                dataIndex: 'new_values',
                key: 'new_values',

            },

            
        ];
        const { dataSource, isLoading } = this.state;
        return (
            <Card>
                <PageHeader

                    title="Audit Logs"

                    style={{ marginTop: 2, marginBottom: 2 }}
                 
                />
                <Table
                    loading={isLoading}
                    onRow={this.onClickRow}
                    rowClassName={this.setRowClassName}
                    columns={columns}
                    dataSource={dataSource}
                    size="small"
                    rowKey={record => record.distance_identifier_code}
                    pagination={{ pageSizeOptions: ['20', '30'], showSizeChanger: true }}
                    scroll={{ y: 360 }}
                />
            </Card>
        );
    }
}

export default withRouter(AuditLogs);