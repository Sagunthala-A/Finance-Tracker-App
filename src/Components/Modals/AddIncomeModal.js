import React from 'react';
import './Modals.css';
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';

function AddIncomeModal({isIncomeModalVisible,handleIncomeCancel}) {
  const [form] = Form.useForm();
  return (
    <div>
      <Modal
        title="Add Income"
        visible={isIncomeModalVisible}
        onCancel={handleIncomeCancel}
        footer={null}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            style={{ fontWeight: 600 }}
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input the name of the transaction!",
              },
            ]}
          >
            <Input type="text" className="custom-input" />
          </Form.Item>

          <Form.Item
            style={{ fontWeight: 600 }}
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input the expense amount!",
              },
            ]}
          >
            <Input type="text" className="custom-input" />
          </Form.Item>

          <Form.Item
            style={{ fontWeight: 600 }}
            label="Date"
            name="date"
            rules={[
              { required: true, message: "Please select the expense date!" },
            ]}
          >
            <DatePicker className="custom-input" format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item
            label="Tag"
            name="tag"
            style={{ fontWeight: 600 }}
            rules={[{ required: true, message: "Please select a tag!" }]}
          >
            <Select className="select-input-2">
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="freelance">Freelance</Select.Option>
              <Select.Option value="investment">Investment</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Button
            className="signup__btn blue"
            style={{ margin: "1rem auto", width: "90%", padding: "1.2rem 0" }}
          >
            Add Expense
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default AddIncomeModal;