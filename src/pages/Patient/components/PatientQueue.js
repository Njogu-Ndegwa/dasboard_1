import React from "react";
import "antd/dist/antd.css";
import {Table, Input, Button, Icon, Row, Card, Dropdown} from "antd";
import Highlighter from "react-highlight-words";
import PatientQueueActions from "../PatientQueueActions";
import {Menu} from "antd/lib/menu";

export default class PatientQueue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patientQueue: [],
        };
    }

    componentDidMount() {
        PatientQueueActions.fetchAllPatientQue().then(response => {
            this.setState({patientQueue: response});
        });
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({
                             setSelectedKeys,
                             selectedKeys,
                             confirm,
                             clearFilters
                         }) => (
            <div style={{padding: 8}}>
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
                    style={{width: 188, marginBottom: 8, display: "block"}}
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
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{width: 90}}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? "#1890ff" : undefined}}/>
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
                highlightStyle={{backgroundColor: "#ffc069", padding: 0}}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        )
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({searchText: selectedKeys[0]});
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ""});
    };

    // select the row
    onClickRow = record => {
        return {
            onClick: () => {

            }
        };
    };
    setRowClassName = record => {
        return "clickRowStyl";
    };

    render() {
        const columns = [

            {
                title: "Visit No.",
                dataIndex: "visit_number",
                key: "visit_number",
                width: "5%",
                ...this.getColumnSearchProps("visit_number")
            },
            {
                title: "Patient No.",
                dataIndex: "patient_number",
                key: "patient_number",
                width: "10%",
                ...this.getColumnSearchProps("patient_number")
            },
            {
                title: "Patient Name",
                dataIndex: "patient_data.full_name",
                key: "patient_data.full_name",
                width: "20%"
            },
            {
                title: "Department",
                dataIndex: "department_data.name",
                key: "department_data.name",
                width: "15%"
            },
            {
                title: "Status",
                dataIndex: "",
                key: "status",
                render: (text, record) => (
                    <p>Awaiting</p>
                ),
                width: "5%"
            }

        ];
        const data = this.state.patientQueue;

        return (
            <div id="content">
                <Card title="Patient Queue" type={"inner"}>
                    <Row>
                        <Table
                            onRow={this.onClickRow}
                            rowClassName={this.setRowClassName}
                            columns={columns}
                            dataSource={data}
                            size="small"
                        />
                    </Row>
                </Card>
            </div>
        );
    }
}
