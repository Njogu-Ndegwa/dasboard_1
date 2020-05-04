import React from "react";
import { Descriptions, Avatar, Row, Col, PageHeader } from "antd";
import { Button, Radio, Icon } from 'antd';

export default class PatientCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: ""
    };
  }

  render() {
    let { patient_data } = this.props;
    return (
      <PageHeader
        onBack={() => window.history.back()}
        title="Patient Details"
        extra={[]}
      >
        <Row gutter={0}>
          <Col className="gutter-row" span={2}>
            <div className="gutter-box">

              <Avatar shape="circle" size={64} icon="user" />

            </div>
          </Col>
          <Col className="gutter-row" span={20}>
            <div className="gutter-box">
              <Descriptions column={3} bordered size="small">
                <Descriptions.Item label="Patient Number">{patient_data.patient_number}</Descriptions.Item>
                <Descriptions.Item label="Patient Name">{patient_data.full_name}</Descriptions.Item>
                <Descriptions.Item label="D.O.B">{patient_data.date_of_birth}</Descriptions.Item>
                <Descriptions.Item label="Gender">{patient_data.gender}</Descriptions.Item>
                <Descriptions.Item label="Age">{patient_data.age}</Descriptions.Item>
              </Descriptions>
            </div>
          </Col>
        </Row>
      </PageHeader>

    );
  }
}
