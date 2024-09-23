import { FC } from "react";
import { Form as AntdForm, Button, Checkbox, Col, DatePicker, Input, Radio, Row, Select, Space, Switch, TimePicker } from "antd";

import "./styles.scss"
import TextArea from "antd/es/input/TextArea";

const Form:FC = () => {
  return (
    <div className="app-container">
      <AntdForm
        name="form"
        size="large"
        labelCol={{span: 2}}
      >
        <AntdForm.Item name="name" label="Activity name">
          <Input />
        </AntdForm.Item>
        <AntdForm.Item name="region" label="Activity zone">
          <Select
            placeholder="please select your zone"
            options={[
              {value: "shanghai", label: "Zone one"},
              {value: "beijing", label: "Zone two"}
            ]}
          />
        </AntdForm.Item>
        <AntdForm.Item name="time" label="Activity time"
        >
          <Row gutter={24}>
            <Col span={11}><DatePicker placeholder="Pick a date" /></Col>
            <Col span={2}>-</Col>
            <Col span={11}><TimePicker placeholder="Pick a time" /></Col>
          </Row>
        </AntdForm.Item>
        <AntdForm.Item name="delivery" label="Instant delivery">
          <Switch />
        </AntdForm.Item>
        <AntdForm.Item name="type" label="Activity type">
          <Checkbox.Group options={[
            {label: "Online activities", value:"online"},
            {label: "Promotion activities", value: "promotion"},
            {label: "Offline activities", value: "offline"},
            {label: "Simple brand exposure", value: "exposure"}
          ]} />
        </AntdForm.Item>
        <AntdForm.Item name="resource" label="Resources">
          <Radio.Group>
            <Radio value="sponsor">Sponsor</Radio>
            <Radio value="venue">Venue</Radio>
          </Radio.Group>
        </AntdForm.Item>
        <AntdForm.Item name="other" label="Activity form">
          <TextArea />
        </AntdForm.Item>
        <AntdForm.Item wrapperCol={{
          offset: 2,
        }}>
          <Space>
            <Button type="primary">Create</Button>
            <Button>Cancel</Button>
          </Space>
        </AntdForm.Item>
      </AntdForm>
    </div>
  )
}

export default Form;